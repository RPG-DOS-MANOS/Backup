var w=Object.defineProperty;var c=(n,e)=>w(n,"name",{value:e,configurable:!0});var m={id:"mkah-compendium-importer"};async function I(n,e,{keepId:o=!0}={}){let i={pack:n.collection,keepId:o},t=e.items.map(s=>{let r=s.document.toObject();return r.folder=s.json.folder,r.folder||delete r.folder,r._id||delete r._id,r});if(t.length){let s=game.settings.get(m.id,"chunking");s<=0&&(s=1/0);let r=[[]];for(let l of t){let d=r.at(-1);d.length<s?d.push(l):r.push([l])}let a=1;for(let l of r)console.log("Creating chunk",a++,"of",r.length),await n.documentClass.create(l,foundry.utils.deepClone(i))}ui.notifications.info(game.i18n.format("CompendiumImporter.FinishImport",{pack:n.collection}))}c(I,"fillCompendium");async function S(n,e,{keepId:o=!0}={}){if(!(game.release.generation<11||(e.folders??[]).length==0))return Folder.create(e.folders,{pack:n.collection,keepId:!0})}c(S,"setupFolders");async function h(n,e,{keepId:o=!0}={}){let i={label:n.label,type:e.type},t=await CompendiumCollection.createCompendium(i);e.folder&&(game.folders.get(e.folder)?await t.setFolder(e.folder):console.warn(`Folder "${e.folder}" not found.`));let s=await S(t,e,{keepId:o});await I(t,e,{keepId:o})}c(h,"createCompendium");var f=class{static{c(this,"DocumentWrapper")}document;json;documentName;constructor(e,o){this.documentName=o;let i=CONFIG[o].documentClass;this.document=new i.implementation(e),this.json=e}get id(){return this.document.id}get name(){return this.json.name}get img(){return this.json.img}get type(){return this.json.type}get folder(){return this.json.folder}},p=class n extends FormApplication{static{c(this,"ImportDialog")}data=null;pack=null;conflict=!1;importOptions={keepId:!0};wrongSystem=!1;wrongSystemIgnore=!1;items=new Collection;folders=new Collection;tree=null;constructor(e,o,i){super(void 0,i),this.data=e,this.pack=o;for(let t of e.items??[])this.items.set(t.id,t);for(let t of e.folders??[])this.folders.set(t._id,{...t,json:t,get id(){return this._id},items:[],folders:[]});this.updateSlug(),this.wrongSystem=this.data.source.system!==game.system.id,this.tree=this.buildTree()}updateSlug(){this.pack.slug=this.pack.label.slugify();let e=`world.${this.pack.slug}`,o=game.packs.get(e);return o&&console.warn("Pack name causes conflict with existing pack:",e),this.conflict=!!o,this.conflict}get template(){return`modules/${m.id}/template/import-dialog.hbs`}static get defaultOptions(){let e=super.defaultOptions;return{...e,title:game.i18n.localize("CompendiumImporter.Import"),classes:[...e.classes,"mkah-compendium-importer"],dragDrop:[{dragSelector:".tree .items .document"}],closeOnSubmit:!1,submitOnChange:!0,submitOnClose:!1,height:"auto",width:540}}buildTree(){let e={items:[],folders:[],lost:[]};e.folders=this.folders.filter(i=>!i.folder);for(let i of this.items){let t=i.folder,s;t&&(s=this.folders.get(t))?s.items.push(i):e.items.push(i)}let o=this.folders.filter(i=>!!i.folder);for(let i of o){let t=i.folder,s;t&&(s=this.folders.get(t))?s.folders.push(i):(i.lost=!0,e.lost.push(i))}return e}getData(){let e=super.getData();return e.metadata=this.data?.metadata,e.data=this.data,e.ready=!0,e.pack=this.pack,e.items=this.items,e.folder=this.data?.folder,e.folders=this.folders,e.tree=this.tree,e.keepId=this.importOptions.keepId,e.nameConflict=this.conflict,e.wrongSystem=this.wrongSystem,e.ignoreSystem=this.wrongSystemIgnore,e.disableSubmit=this.conflict||this.wrongSystem&&!this.wrongSystemIgnore,e}_canDragStart(e){return!0}_onDragStart(e){let o=e.currentTarget,{documentId:i,documentKind:t,documentType:s}=o.dataset,r=this.data.items.find(l=>l.id===i),a={data:deepClone(r.json),type:t};game.release.generation<11&&delete a.data._id,e.dataTransfer.setData("text/plain",JSON.stringify(a))}_updateObject(e,o){this.pack.label=o.label,this.importOptions.keepId=o.keepId,this.wrongSystemIgnore=o.ignoreSystem,this.updateSlug(),this.render()}activateListeners(e){super.activateListeners(e),e[0].querySelector("button.submit").addEventListener("click",this._createCompendium.bind(this))}async _createCompendium(e){e.preventDefault(),e.stopPropagation(),e.target.disabled=!0,h(this.pack,this.data,this.importOptions),this.close()}static async fromJSON(e,o){let i=!0,t=null;try{t=JSON.parse(e)}catch(a){ui.notifications.error(a.message,{console:!1}),console.error(a),i=!1;return}if(Array.isArray(t.items)||(i=!1),t.metadata||(i=!1),CONFIG[t.type].documentClass||(ui.notifications.error(`${t.type} is invalid document class`),i=!1),!i)return void ui.notifications.error(game.i18n.localize("CompendiumImporter.BadDataImport"));t.items=t.items.map(a=>{try{return new f(a,t.type)}catch(l){console.error(l)}return null}).filter(a=>!!a);let r={label:t.metadata.label,id:t.metadata.name,type:t.metadata.entity??t.metadata.type};new n(t,r,o).render(!0,{focus:!0})}};Hooks.once("init",()=>{game.settings.register(m.id,"chunking",{name:"CompendiumImporter.Settings.Chunking",hint:"CompendiumImporter.Settings.ChunkingHint",type:Number,default:0,range:{min:0,step:100,max:1e3},config:!0,scope:"client"})});function y(n){let e=n.toCompendium();return e._id=n.id,e}c(y,"exportDocument");async function k(n){let e=n.get(0).dataset.pack,o=game.packs.get(e);if(!o)return void ui.notifications.warn(game.i18n.format("CompendiumImporter.PackNotFound",{pack:e}));ui.notifications.info(game.i18n.format("CompendiumImporter.StartExport",{pack:e,count:o.index.contents.length}));let i={package:o.collection,metadata:duplicate(o.metadata),type:o.documentName,items:[],source:{world:game.world.id,system:game.system.id,version:{core:game.version,system:game.system.version}}},t=await o.getDocuments();i.items.push(...t.map(y)),game.release.generation>=11&&(i.folders=o.folders.map(y),o.folder&&(i.folder={id:o.folder.id,name:o.folder.name}));let s=`fvtt-${i.type}-pack-${game.system.id}-${o.metadata.name}.json`;ui.notifications.info(game.i18n.format("CompendiumImporter.FinishExport",{pack:e})),saveDataToFile(JSON.stringify(i,null,2),"text/json",s)}c(k,"exportCompendium");function b(n,e){let o={name:"CompendiumImporter.Export",icon:'<i class="fas fa-file-export"></i>',callback:k};e.push(o)}c(b,"insertExportMenuItem");function x([n],e){let o={name:"CompendiumImporter.Export",icon:'<i class="fas fa-file-export"></i>',callback:k};e.push(o)}c(x,"insertExportMenuItemV11");function F(n,[e],o){if(!game.user.isGM)return;let i=e.querySelector("header .action-buttons"),t=document.createElement("button");game.release.generation>=11&&t.classList.add("ic-wide"),t.classList.add("import-compendium"),t.type="button",t.innerHTML=`<i class="fa-solid fa-upload"></i> ${game.i18n.localize("CompendiumImporter.ImportShort")}`,i.append(t),t.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();let r={left:window.innerWidth-620,top:this.offsetTop+20},a=document.createElement("input");a.type="file",a.accept="application/json",a.enctype="multipart/form-data",a.addEventListener("change",c(function(d){let C=d.target.files,g=new FileReader;g.onload=u=>{r.left=window.innerWidth-860,p.fromJSON(u.target?.result,r)};for(let u of C)g.readAsText(u)},"readFile"),{passive:!0,once:!0}),a.click()})}c(F,"insertImportButton");Hooks.once("init",()=>{game.release.generation>=12?Hooks.on("getCompendiumDirectoryEntryContext",b):Hooks.on("getCompendiumDirectoryEntryContext",x)});Hooks.on("renderCompendiumDirectory",F);
//# sourceMappingURL=compendium-importer.mjs.map
