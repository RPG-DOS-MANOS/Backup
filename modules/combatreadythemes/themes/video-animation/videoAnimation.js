import { getGame, gsap } from "../../combatreadythemes.js";
export function registerVideoAnimation(CombatReadyAnimation) {
    class VideoAnimation extends CombatReadyAnimation {
        constructor() {
            super(...arguments);
            this.name = "VideoAnimation";
        }
        initialize() {
            let body = document.getElementsByTagName("body")[0];
            this.LOOPING_COUNT = 0;
            // Build HTML to Inject
            let cover = document.createElement("div");
            $(cover).addClass("combatready-theme-va-cover");
            let videoContainer = document.createElement("div");
            videoContainer.style.zIndex = "100";
            videoContainer.appendChild(cover);
            this.VIDEOS = {
                YOUR_TURN: {
                    VIDEO: HTMLVideoElement.prototype,
                    VIDEO_SOURCE: HTMLSourceElement.prototype,
                    SETTINGS: {
                        VIDEO_FILE: this.getSetting("yourTurn.videoFileToPlay"),
                        LOOP: this.getSetting("yourTurn.loopVideo"),
                        REMOVE_AFTER_TIME: this.getSetting("yourTurn.removeAfterTime"),
                        REMOVE_AFTER_CLICK: this.getSetting("yourTurn.removeAfterClick"),
                        VIDEO_OPACITY: this.getSetting("yourTurn.videoOpacity"),
                        ADD_COVER: this.getSetting("yourTurn.addCover"),
                        COVER_COLOR: this.getSetting("yourTurn.coverColor"),
                        COVER_OPACITY: this.getSetting("yourTurn.coverOpacity")
                    }
                },
                NEXT_UP: {
                    VIDEO: HTMLVideoElement.prototype,
                    VIDEO_SOURCE: HTMLSourceElement.prototype,
                    SETTINGS: {
                        VIDEO_FILE: this.getSetting("nextUp.videoFileToPlay"),
                        LOOP: this.getSetting("nextUp.loopVideo"),
                        REMOVE_AFTER_TIME: this.getSetting("nextUp.removeAfterTime"),
                        REMOVE_AFTER_CLICK: this.getSetting("nextUp.removeAfterClick"),
                        VIDEO_OPACITY: this.getSetting("nextUp.videoOpacity"),
                        ADD_COVER: this.getSetting("nextUp.addCover"),
                        COVER_COLOR: this.getSetting("nextUp.coverColor"),
                        COVER_OPACITY: this.getSetting("nextUp.coverOpacity")
                    }
                },
                NEXT_ROUND: {
                    VIDEO: HTMLVideoElement.prototype,
                    VIDEO_SOURCE: HTMLSourceElement.prototype,
                    SETTINGS: {
                        VIDEO_FILE: this.getSetting("nextRound.videoFileToPlay"),
                        LOOP: this.getSetting("nextRound.loopVideo"),
                        REMOVE_AFTER_TIME: this.getSetting("nextRound.removeAfterTime"),
                        REMOVE_AFTER_CLICK: this.getSetting("nextRound.removeAfterClick"),
                        VIDEO_OPACITY: this.getSetting("nextRound.videoOpacity"),
                        ADD_COVER: this.getSetting("nextRound.addCover"),
                        COVER_COLOR: this.getSetting("nextRound.coverColor"),
                        COVER_OPACITY: this.getSetting("nextRound.coverOpacity")
                    }
                }
            };
            for (const animation in this.VIDEOS) {
                let video = document.createElement("video");
                $(video).addClass("combatready-theme-va-container");
                video.muted = true;
                video.preload = "auto";
                let videoSource = document.createElement("source");
                video.appendChild(videoSource);
                videoContainer.appendChild(video);
                this.VIDEOS[animation].VIDEO = video;
                this.VIDEOS[animation].VIDEO_SOURCE = videoSource;
                this.VIDEOS[animation].VIDEO_SOURCE.src = this.VIDEOS[animation].SETTINGS.VIDEO_FILE;
                this.VIDEOS[animation].VIDEO.load();
            }
            // Inject into DOM Body
            body.appendChild(videoContainer);
            this.VIDEOS_CONTAINER = videoContainer;
            this.COVER = cover;
            this.ready = true;
        }
        destroy() {
            this.VIDEOS_CONTAINER?.remove();
            this.ready = false;
        }
        removeVideo() {
            $(this.VIDEOS_CONTAINER).off("click", "**");
            this.cleanAnimations();
        }
        cleanAnimations() {
            if (!this.ready)
                return;
            this.LOOPING_COUNT = 0;
            let anims = gsap.getTweensOf(this.COVER);
            for (let tween of anims) {
                tween.kill();
            }
            const x = () => {
                this.COVER.style.display = "none";
            };
            $(this.VIDEOS_CONTAINER).off("click", "**");
            for (const animation in this.VIDEOS) {
                this.VIDEOS[animation].VIDEO.style.display = "none";
                this.VIDEOS[animation].VIDEO.pause();
                this.VIDEOS[animation].VIDEO.currentTime = 0;
                $(this.VIDEOS[animation].VIDEO).off("ended", "**");
            }
            gsap.to(this.COVER, 0.2, {
                opacity: 0,
                onComplete: x.bind(this),
            });
        }
        async runAnimation(animation) {
            if (!this.ready)
                return;
            this.prepare();
            if (this.VIDEOS[animation].SETTINGS.ADD_COVER) {
                this.COVER.style.backgroundColor = this.VIDEOS[animation].SETTINGS.COVER_COLOR;
                await gsap.to(this.COVER, 0.3, {
                    opacity: this.VIDEOS[animation].SETTINGS.COVER_OPACITY
                });
                this.COVER.style.display = "block";
            }
            this.VIDEOS[animation].VIDEO.style.display = "block";
            this.VIDEOS[animation].VIDEO.style.opacity = this.VIDEOS[animation].SETTINGS.VIDEO_OPACITY.toString();
            const x = () => {
                if (this.VIDEOS[animation].SETTINGS.LOOP >= 0) {
                    this.LOOPING_COUNT++;
                    if (this.LOOPING_COUNT > this.VIDEOS[animation].SETTINGS.LOOP) {
                        if (this.VIDEOS[animation].SETTINGS.REMOVE_AFTER_TIME >= 0) {
                            this.VIDEOS[animation].VIDEO.pause();
                            this.VIDEOS[animation].VIDEO.currentTime = 0;
                            this.cleanAnimations();
                            $(this.VIDEOS[animation].VIDEO).off("ended", "**");
                        }
                    }
                    else {
                        this.VIDEOS[animation].VIDEO.play();
                    }
                }
                else {
                    this.VIDEOS[animation].VIDEO.play();
                }
            };
            $(this.VIDEOS[animation].VIDEO).off("ended", "**");
            this.VIDEOS[animation].VIDEO.addEventListener("ended", x.bind(this));
            const y = () => {
                this.VIDEOS[animation].VIDEO.pause();
                this.VIDEOS[animation].VIDEO.currentTime = 0;
                this.cleanAnimations();
            };
            if (this.VIDEOS[animation].SETTINGS.REMOVE_AFTER_TIME > 0) {
                setTimeout(y.bind(this), this.VIDEOS[animation].SETTINGS.REMOVE_AFTER_TIME * 1000);
            }
            $(this.VIDEOS_CONTAINER).off("click", "**");
            this.VIDEOS_CONTAINER.addEventListener("click", this.removeVideo.bind(this));
            this.VIDEOS[animation].VIDEO.play();
        }
        nextUpAnimation() {
            this.runAnimation("NEXT_UP");
        }
        yourTurnAnimation() {
            this.runAnimation("YOUR_TURN");
        }
        nextRoundAnimation() {
            this.runAnimation("NEXT_ROUND");
        }
        adjustWidth() {
        }
        get settings() {
            return [
                {
                    id: "#separator",
                    setting: {
                        name: "combatReady.animations.videoAnimation.texts.yourTurnSettings.name",
                        hint: "combatReady.animations.videoAnimation.texts.yourTurnSettings.hint",
                        scope: "world",
                        config: true,
                        type: "Separator"
                    }
                },
                {
                    id: "yourTurn.videoFileToPlay",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.videoFileToPlay.name",
                        hint: "combatReady.animations.videoAnimation.settings.videoFileToPlay.hint",
                        scope: "world",
                        config: true,
                        default: "modules/combatreadythemes/themes/video-animation/sampleYourTurn.webm",
                        filePicker: 'video'
                    }
                },
                {
                    id: "yourTurn.loopVideo",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.loopVideo.name",
                        hint: "combatReady.animations.videoAnimation.settings.loopVideo.hint",
                        scope: "world",
                        config: true,
                        default: 0,
                        type: Number
                    }
                },
                {
                    id: "yourTurn.removeAfterTime",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.removeAfterTime.name",
                        hint: "combatReady.animations.videoAnimation.settings.removeAfterTime.hint",
                        scope: "world",
                        config: true,
                        default: 0,
                        type: Number
                    }
                },
                {
                    id: "yourTurn.removeAfterClick",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.removeAfterClick.name",
                        hint: "combatReady.animations.videoAnimation.settings.removeAfterClick.hint",
                        scope: "world",
                        config: true,
                        default: true,
                        type: Boolean
                    }
                },
                {
                    id: "yourTurn.videoOpacity",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.videoOpacity.name",
                        hint: "combatReady.animations.videoAnimation.settings.videoOpacity.hint",
                        scope: "world",
                        config: true,
                        default: 1,
                        type: Number
                    }
                },
                {
                    id: "yourTurn.addCover",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.addCover.name",
                        hint: "combatReady.animations.videoAnimation.settings.addCover.hint",
                        scope: "world",
                        config: true,
                        default: true,
                        type: Boolean
                    }
                },
                {
                    id: "yourTurn.coverColor",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.coverColor.name",
                        hint: "combatReady.animations.videoAnimation.settings.coverColor.hint",
                        label: "Color Picker",
                        default: "#000000",
                        scope: "world",
                        type: "Color"
                    }
                },
                {
                    id: "yourTurn.coverOpacity",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.coverOpacity.name",
                        hint: "combatReady.animations.videoAnimation.settings.coverOpacity.hint",
                        scope: "world",
                        config: true,
                        default: 0.75,
                        type: Number
                    }
                },
                {
                    id: "#separator",
                    setting: {
                        name: "combatReady.animations.videoAnimation.texts.nextUpSettings.name",
                        hint: "combatReady.animations.videoAnimation.texts.nextUpSettings.hint",
                        scope: "world",
                        config: true,
                        type: "Separator"
                    }
                },
                {
                    id: "nextUp.videoFileToPlay",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.videoFileToPlay.name",
                        hint: "combatReady.animations.videoAnimation.settings.videoFileToPlay.hint",
                        scope: "world",
                        config: true,
                        default: "modules/combatreadythemes/themes/video-animation/sampleNextUp.webm",
                        filePicker: 'video'
                    }
                },
                {
                    id: "nextUp.loopVideo",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.loopVideo.name",
                        hint: "combatReady.animations.videoAnimation.settings.loopVideo.hint",
                        scope: "world",
                        config: true,
                        default: 0,
                        type: Number
                    }
                },
                {
                    id: "nextUp.removeAfterTime",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.removeAfterTime.name",
                        hint: "combatReady.animations.videoAnimation.settings.removeAfterTime.hint",
                        scope: "world",
                        config: true,
                        default: 0,
                        type: Number
                    }
                },
                {
                    id: "nextUp.removeAfterClick",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.removeAfterClick.name",
                        hint: "combatReady.animations.videoAnimation.settings.removeAfterClick.hint",
                        scope: "world",
                        config: true,
                        default: true,
                        type: Boolean
                    }
                },
                {
                    id: "nextUp.videoOpacity",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.videoOpacity.name",
                        hint: "combatReady.animations.videoAnimation.settings.videoOpacity.hint",
                        scope: "world",
                        config: true,
                        default: 1,
                        type: Number
                    }
                },
                {
                    id: "nextUp.addCover",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.addCover.name",
                        hint: "combatReady.animations.videoAnimation.settings.addCover.hint",
                        scope: "world",
                        config: true,
                        default: true,
                        type: Boolean
                    }
                },
                {
                    id: "nextUp.coverColor",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.coverColor.name",
                        hint: "combatReady.animations.videoAnimation.settings.coverColor.hint",
                        label: "Color Picker",
                        default: "#000000",
                        scope: "world",
                        type: "Color"
                    }
                },
                {
                    id: "nextUp.coverOpacity",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.coverOpacity.name",
                        hint: "combatReady.animations.videoAnimation.settings.coverOpacity.hint",
                        scope: "world",
                        config: true,
                        default: 0.75,
                        type: Number
                    }
                },
                {
                    id: "#separator",
                    setting: {
                        name: "combatReady.animations.videoAnimation.texts.nextRoundSettings.name",
                        hint: "combatReady.animations.videoAnimation.texts.nextRoundSettings.hint",
                        scope: "world",
                        config: true,
                        type: "Separator"
                    }
                },
                {
                    id: "nextRound.videoFileToPlay",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.videoFileToPlay.name",
                        hint: "combatReady.animations.videoAnimation.settings.videoFileToPlay.hint",
                        scope: "world",
                        config: true,
                        default: "modules/combatreadythemes/themes/video-animation/sampleNextRound.webm",
                        filePicker: 'video'
                    }
                },
                {
                    id: "nextRound.loopVideo",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.loopVideo.name",
                        hint: "combatReady.animations.videoAnimation.settings.loopVideo.hint",
                        scope: "world",
                        config: true,
                        default: 0,
                        type: Number
                    }
                },
                {
                    id: "nextRound.removeAfterTime",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.removeAfterTime.name",
                        hint: "combatReady.animations.videoAnimation.settings.removeAfterTime.hint",
                        scope: "world",
                        config: true,
                        default: 0,
                        type: Number
                    }
                },
                {
                    id: "nextRound.removeAfterClick",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.removeAfterClick.name",
                        hint: "combatReady.animations.videoAnimation.settings.removeAfterClick.hint",
                        scope: "world",
                        config: true,
                        default: true,
                        type: Boolean
                    }
                },
                {
                    id: "nextRound.videoOpacity",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.videoOpacity.name",
                        hint: "combatReady.animations.videoAnimation.settings.videoOpacity.hint",
                        scope: "world",
                        config: true,
                        default: 1,
                        type: Number
                    }
                },
                {
                    id: "nextRound.addCover",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.addCover.name",
                        hint: "combatReady.animations.videoAnimation.settings.addCover.hint",
                        scope: "world",
                        config: true,
                        default: true,
                        type: Boolean
                    }
                },
                {
                    id: "nextRound.coverColor",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.coverColor.name",
                        hint: "combatReady.animations.videoAnimation.settings.coverColor.hint",
                        label: "Color Picker",
                        default: "#000000",
                        scope: "world",
                        type: "Color"
                    }
                },
                {
                    id: "nextRound.coverOpacity",
                    setting: {
                        name: "combatReady.animations.videoAnimation.settings.coverOpacity.name",
                        hint: "combatReady.animations.videoAnimation.settings.coverOpacity.hint",
                        scope: "world",
                        config: true,
                        default: 0.75,
                        type: Number
                    }
                }
            ];
        }
    }
    //@ts-ignore
    getGame().modules.get("combatready")?.api?.setupAnimation(new VideoAnimation("CombatReadyVideoAnimation"));
}
