export const NAMESPACE = "bsa-sfrpg";
export const CUSTOM_SKILLS = "custom_skills";
export class SfrpgSettings {
	constructor() {
		if (!(game instanceof Game)) {
			throw new Error("Settings called before game has been initialized");
		}
		game.settings.register(NAMESPACE, CUSTOM_SKILLS, {
			name: "Skill Profession",
			hint: "Here you can define which Skills are globally available. Separate Skills by comma",
			scope: "world",
			config: true,
			default: "",
			type: String
		});
	}
	get(key) {
		return game["settings"].get(NAMESPACE, key);
	}
	set(key, value) {
		game["settings"].set(NAMESPACE, key, value);
	}
}
