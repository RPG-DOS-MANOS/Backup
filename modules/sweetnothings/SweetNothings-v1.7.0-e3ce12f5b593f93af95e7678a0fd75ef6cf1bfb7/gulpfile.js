import gulp from 'gulp';
import fs from "fs-extra";
import path from "path";
import { deleteSync } from "del";
import merge2 from "merge2";
import { info } from 'console';
import stringify from "json-stringify-pretty-compact";
import git from "gulp-git";
import less from "gulp-less";
import concat from "gulp-concat";
import cleanCSS from "gulp-clean-css";

function getManifest() {
  const json = { root: "./src/" };

  const modulePath = `${json.root}module.json`;
  const systemPath = `${json.root}system.json`;

  if (fs.existsSync(modulePath)) {
    json.file = fs.readJSONSync(modulePath);
    json.name = "module.json";
    json.path = modulePath;
  } else if (fs.existsSync(systemPath)) {
    json.file = fs.readJSONSync(systemPath);
    json.name = "system.json";
    json.path = systemPath;
  } else {
    return;
  }

  return json;
}

function getDataPaths() {
  const config = fs.readJSONSync('./env/foundryconfig.json');
  const packageJson = fs.readJSONSync("package.json");
  const dataPath = config?.dataPath;

  if (dataPath) {
    const dataPaths = Array.isArray(dataPath) ? dataPath : [dataPath];

    return dataPaths.map((dataPath) => {
      if (typeof dataPath !== 'string') {
        throw new Error(
          `Property dataPath in foundryconfig.json is expected to be a string or an array of strings, but found ${dataPath}`,
        );
      }
      if (!fs.existsSync(path.resolve(dataPath))) {
        throw new Error(`The dataPath ${dataPath} does not exist on the file system`);
      }
      return path.resolve(`${dataPath}\\modules\\${packageJson.name}`);
    });
  } else {
    throw new Error('No dataPath defined in foundryconfig.json');
  }
}

function buildLess() {
  const packageJson = fs.readJSONSync("package.json");

  return gulp
    .src("./src/styles/*.less")
    .pipe(concat(packageJson.displayName + ".css"))
    .pipe(less())
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(gulp.dest("./src/styles"));
}

function cleanDist(done) {
  deleteSync(["./dist/**", "./src/styles/*.css", "!dist"], { force: true });
  done();
}

function cleanDev(done) {
  let path = getDataPaths()[0];
  deleteSync(path, { force: true });
  done();
}

function createDist() {
  return merge2(
    gulp.src(['./src/**', 'LICENSE', '*.md', '!./src/*.lock', '!./src/styles/*.less']).pipe(gulp.dest('./dist')),
    gulp.src('node_modules/geekdialog/module/**').pipe(gulp.dest('./dist/module/geekdialog'))
  );
}

function deployToDev() {
  const path = getDataPaths()[0];
  return gulp.src(['./dist/**', './src/*.lock']).pipe(gulp.dest(path));
}

function gitAdd() {
  return gulp.src(".").pipe(git.add());
}

function gitCommit() {
  return gulp.src("./*").pipe(
    git.commit(`v${getManifest().file.version}`, {
      args: "-a",
      disableAppendPaths: true,
    })
  );
}

function gitTag() {
  const manifest = getManifest();
  return git.tag(
    `v${manifest.file.version}`,
    `Updated to ${manifest.file.version}`,
    (err) => {
      if (err) throw err;
    }
  );
}

function gitPush(cb) {
  git.push('origin', 'main', function (err) {
      if (err) { cb(Error(err)); }
    else { cb(); }
  });
}

function gitPushTags(cb) {
  return git.push('origin', 'main', {args: "--tags"}, function (err) {
    if (err) { cb(Error(err)); }
    else { cb(); }
  });
}

function updateManifest(cb) {
  const packageJson = fs.readJSONSync("package.json");
  const config = {
    repository: packageJson.homepage,
    manifest: getManifest(),
    version: packageJson.version
  };

  if (!config.manifest) cb(Error("Manifest JSON not found"));
  if (!config.manifest.file.manifest || !config.manifest.file.download)
    cb(
      Error("Repository URLs not configured in foundryconfig.json")
    );

  try {
    const version = packageJson.version;

    const versionMatch = /^(\d{1,}).(\d{1,}).(\d{1,})(.*)$/;
    const currentVersion = config.manifest.file.version;
    let targetVersion = "";

    if (!version) {
      cb(Error("Missing version number"));
    }

    if (versionMatch.test(version)) {
      targetVersion = version;
    } else {
      targetVersion = currentVersion.replace(
        versionMatch,
        (substring, major, minor, patch) => {
          console.log(
            substring,
            Number(major) + 1,
            Number(minor) + 1,
            Number(patch) + 1
          );
          if (version === "major") {
            return `${Number(major) + 1}.0.0`;
          } else if (version === "minor") {
            return `${major}.${Number(minor) + 1}.0`;
          } else if (version === "patch") {
            return `${major}.${minor}.${Number(patch) + 1}`;
          } else {
            return "";
          }
        }
      );
    }

    if (targetVersion === "") {
      return cb(Error("Error: Incorrect version arguments."));
    }

    if (targetVersion === currentVersion) {
      return cb(
        info(
          "Note: Target version is identical to current version."
        )
      );
    }
    console.log(`Updating version number to '${targetVersion}'`);

    config.manifest.file.version = targetVersion;

    /* Update URLs */
    const downloadUrl = `${config.repository}/-/archive/v${config.manifest.file.version}/${config.manifest.file.name}-v${config.manifest.file.version}.zip`;
    const changeLogURL = `${config.repository}/-/raw/${config.manifest.file.version}/CHANGELOG.md`;

    config.manifest.file.download = downloadUrl;
    config.manifest.file.changelog = changeLogURL;

    const prettyProjectJson = stringify(config.manifest.file, {
      maxLength: 35,
      indent: "\t",
    });

    fs.writeFileSync(
      config.manifest.path,
      prettyProjectJson,
      "utf8"
    );

    return cb();
  } catch (err) {
    cb(err);
  }
}

async function publishToFoundry(cb) {
  const config = fs.readJSONSync('./env/foundryconfig.json');
  const manifest = getManifest();

  let response = await fetch("https://api.foundryvtt.com/_api/packages/release_version/", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${config.packageKey}`
    },
    method: "POST",
    body: JSON.stringify({
      "id": manifest.file.id,
      "dry-run": false,
      "release": {
        "version": manifest.file.version,
        "manifest": manifest.file.manifest,
        "notes": manifest.file.changelog,
        "compatibility": {
          "minimum": manifest.file.compatibility.minimum,
          "verified": manifest.file.compatibility.verified,
          "maximum": manifest.file.compatibility.maximum
        }
      }
    })
  });
  try {
    let response_data = await response.json();
    cb(response_data.status + ': ' + response_data.message);
  } catch (err) {
    cb(err);
  }
}

const publishGit = gulp.series(gitAdd, gitCommit, gitTag, gitPush, gitPushTags);
const build = gulp.series(buildLess, createDist);

gulp.task('clean', gulp.parallel(cleanDist, cleanDev));
gulp.task('default', gulp.series(cleanDist, updateManifest, build));
gulp.task('deploy', gulp.series('clean', updateManifest, build, deployToDev));
gulp.task('publish', gulp.series(publishGit));
gulp.task('foundry', gulp.series(publishToFoundry));