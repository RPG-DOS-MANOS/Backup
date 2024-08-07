var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TokenMovement_1;
/* class decorator */
function staticImplements() {
	return (constructor) => { constructor; };
}
let TokenMovement = TokenMovement_1 = class TokenMovement {
	static defaultConfig = {
		binding: {
			axes: {
				"Move-horizontal": {
					index: "0",
					reversed: false
				},
				"Move-vertical": {
					index: "1",
					reversed: false
				},
			},
			buttons: {}
		},
		name: "Beaver's Token Movement",
		id: "beavers-token-movement",
		desc: "beaversSystemInterface.TokenMovement.desc"
	};
	X_AXES = "Move-horizontal";
	Y_AXES = "Move-vertical";
	UPDATE_TOKEN_HOOK = "updateToken";
	config;
	actorId;
	isMoving = false;
	token;
	position;
	userData;
	hook;
	consecutiveTicks = 0;
	initialize(actorId) {
		this.actorId = actorId;
		if (this.hook) {
			Hooks.off(this.UPDATE_TOKEN_HOOK, this.hook);
		}
		this.hook = Hooks.on(this.UPDATE_TOKEN_HOOK, this._tokenGotUpdated.bind(this));
	}
	getConfig() {
		return this.config;
	}
	updateGamepadConfig(gamepadConfig) {
		this.config = TokenMovement_1.defaultConfig;
		this.config.binding = gamepadConfig.modules[this.config.id].binding;
		const user = game.users?.find(u => u.id === gamepadConfig.userId);
		this.userData = game["beavers-gamepad"].Settings.getUserData(gamepadConfig.userId);
		if (user?.character?.id) {
			this.initialize(user.character.uuid);
		}
	}
	tick(event) {
		if (!event.hasAnyAxesTicked) {
			this._reduceConsecutiveTicks();
			return true;
		}
		if (this.actorId !== "") {
			let x = 0;
			let y = 0;
			for (const [i, value] of Object.entries(event.axes)) {
				x = x || this._get(this.X_AXES, i, value);
				y = y || this._get(this.Y_AXES, i, value);
			}
			if (this.userData.userPosition === "right" || this.userData.userPosition === "left") {
				const y2 = y;
				y = x;
				x = y2 * -1;
			}
			if (x == 0 && y == 0) {
				this._reduceConsecutiveTicks();
			}
			else {
				this.consecutiveTicks++;
				if (this.consecutiveTicks > 4 || this.consecutiveTicks == 1) {
					this.move(x, y);
				}
			}
		}
		return true;
	}
	destroy() {
		if (this.hook) {
			Hooks.off(this.UPDATE_TOKEN_HOOK, this.hook);
		}
	}
	move(x, y) {
		if (this.isMoving) {
			return;
		}
		if (!(canvas instanceof Canvas)) {
			throw new Error("TokenMovement called before canvas has been initialized");
		}
		if (!(game instanceof Game) || game.paused) {
			return;
		}
		const token = this._getToken();
		const position = this._getPosition();
		if (position) {
			const movePoint = { ...position.point };
			movePoint.x = movePoint.x + x * position.size;
			movePoint.y = movePoint.y + y * position.size;
			const collisionPoint = { ...position.collision };
			collisionPoint.x = collisionPoint.x + x * position.size;
			collisionPoint.y = collisionPoint.y + y * position.size;
			if (!token.checkCollision(collisionPoint) && this._checkSceneCollision(collisionPoint)) {
				this.isMoving = true;
				token.document.update({
					...movePoint,
					flags: { beaversTokenMovement: true }
				}, { diff: false }).finally(() => {
					this.isMoving = false;
					if (this.position) {
						this.position.point = movePoint;
						this.position.collision = collisionPoint;
					}
				});
			}
		}
	}
	_reduceConsecutiveTicks() {
		if (this.consecutiveTicks > 5) {
			this.consecutiveTicks = 5;
		}
		else {
			this.consecutiveTicks = 0;
		}
	}
	_tokenGotUpdated(token, options) {
		if (options.flags?.beaversTokenMovement == undefined && token.id === this.token?.id) {
			if (options.x != undefined || options.y != undefined) {
				this.token = undefined;
			}
		}
	}
	_get(type, i, value) {
		let result = 0;
		const { index, reversed } = this.config.binding.axes[type];
		if (i === index.toString()) {
			if (reversed) {
				result = value * -1;
			}
			else {
				result = value;
			}
		}
		if (this.userData.userPosition === "top" || this.userData.userPosition === "right") {
			result = result * -1;
		}
		return result;
	}
	_getToken() {
		// @ts-ignore
		const token = canvas.tokens?.objects?.children.find(token => this.actorId.endsWith(token?.actor?.uuid));
		if (token.id !== this.token?.id) {
			this.position = undefined;
		}
		this.token = token;
		return token;
	}
	_getPosition() {
		if (!this.position && this.token) {
			const token = this.token;
			// @ts-ignore
			const size = canvas?.scene?.dimensions.size;
			const x = Math.round(token.x / size) * size;
			const y = Math.round(token.y / size) * size;
			const center = token.getCenter(x, y);
			this.position = {
				// @ts-ignore
				collision: token.getMovementAdjustedPoint(center),
				point: {
					x: x,
					y: y
				},
				size: size
			};
		}
		return this.position;
	}
	_checkSceneCollision(collisionPoint) {
		if (!(canvas instanceof Canvas)) {
			throw new Error("TokenMovement called before canvas has been initialized");
		}
		// @ts-ignore
		return !(collisionPoint.x < canvas.dimensions?.sceneX
			&& collisionPoint.x > 0
			// @ts-ignore
			&& collisionPoint.y < canvas.dimensions?.sceneY
			&& collisionPoint.y > 0);
	}
};
TokenMovement = TokenMovement_1 = __decorate([
	staticImplements()
], TokenMovement);
export { TokenMovement };
