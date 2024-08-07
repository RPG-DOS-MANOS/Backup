const HOOK_DND5E_TRANSFORMED = "dnd5e.transformActor";
const HOOK_DND5E_REVERTFORM = "dnd5e.revertOriginalForm";
export class DND5e {
	constructor() {
		Hooks.on(HOOK_DND5E_TRANSFORMED, this._transformActor.bind(this));
		Hooks.on(HOOK_DND5E_REVERTFORM, this._revertForm.bind(this));
	}
	async _transformActor(original, transformed, p) {
		if (!(game instanceof Game)) {
			throw new Error("Called before game has been initialized");
		}
		const closure = {
			hook: 0,
		};
		closure.hook = Hooks.on("createActor", async function (n) {
			const transformedID = game.actors?.find(a => a.name === p.name)?.id;
			const users = game.users?.contents;
			if (transformedID) {
				if (users) {
					for (const user of users) {
						if (user.character?.id === original.id) {
							await user.update({ character: transformedID });
						}
					}
				}
				Hooks.off("createActor", closure.hook);
			}
		});
	}
	async _revertForm(transformed) {
		const originalId = transformed["flags"].dnd5e.originalActor;
		const users = game.users?.contents;
		if (users) {
			for (const user of users) {
				if (user.character?.id === transformed.id) {
					await user.update({ character: originalId });
				}
			}
		}
	}
}
