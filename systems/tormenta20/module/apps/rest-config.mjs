export default class RestConfigDialog extends Dialog {
	constructor(actors, dialogData={}, options={}) {
		super(dialogData, options);
		this.options.classes = ["tormenta20", "rest-dialog"];

		/**
		 * Store a reference to the Actors document being used
		 * @type {Array} @type {ActorsT20}
		 */
		this.actors = actors;
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);
	}

	static async create(actors) {
		if (!actors.length) {
			ui.notifications.warn("Nenhum personagem selecionado!");
			return;
		}

		async function descanso(actors, modificador, modPV, modPM, curaCP=0, curaAC=0){
			let msg = [];
			for (let actor of actors) {
				if( actor.actor ) {
					let m = await actor.actor.descanso(modificador, modPV, modPM, curaCP, curaAC, false);
					msg.push(m);
				} else if ( actor.documentName == "Actor" ) {
					let m = await actor.descanso(modificador, modPV, modPM, curaCP, curaAC, false);;
					msg.push(m);
				}
			}
			let descricao = '';
			const condicao = ["Ruim", "Normal", "Confortável", "Luxuoso"];
			let c = condicao[Math.floor(modificador)];
			descricao += `<span>Condição ${c}: ${modificador}/nivel</span><br>`;
			if(modPV){
					descricao += `<span>Extra PV: ${modPV}/nivel</span><br>`;
			}
			if(modPM){
					descricao += `<span>Extra PM: ${modPM}/nivel</span><br>`;
			}
			if(curaCP){
					descricao += `<span>Cuidados Rolongados (+1 PV/Nível)</span><br>`;
			}
			if(curaAC){
					descricao += `<span>Acompanhamento Médico (+1 PV/Nível)</span><br>`;
			}
			descricao += "<p>" + msg.join('<br>') + "</p>";
			let content = {
				item: {
					name: "Descanso",
					img: "icons/svg/regen.svg"
				},
				system: {
					description: {
						value: descricao
					}
				}
			}
			let template = "systems/tormenta20/templates/chat/chat-card.html";
			const html = await renderTemplate(template, content);
			const chatData = {
				user: game.user.id,
				type: CONST.CHAT_MESSAGE_TYPES.OTHER,
				content: html
			};
			ChatMessage.create(chatData);
		}

		let content = `<form>
		<div class="form-group">
				<label>Qualidade</label> <select name='qualidade'>
						<option value=0.5>Ruim</option>
						<option value=1 selected>Normal</option>
						<option value=2 >Confortável</option>
						<option value=3>Luxuoso</option>
				</select>
		</div>
		<div class="form-group">
				<label>PV Extra / Por Nível</label>
				<input type='number' name='modPV' value='0'>
		</div>
		<div class="form-group">
				<label>PM Extra / Por Nível</label>
				<input type='number' name='modPM' value='0'>
		</div>
		<div class="form-group">
				<label>Cuidados Prolongados</label>
				<input type='checkbox' name='curaCP' value=1>
		</div>
	<div class="form-group">
				<label>Acompanhamento Médico</label>
				<input type='checkbox' name='curaAC' value=1>
		</div>
		</form>`;

		return await new Promise((resolve) => {
			const dlg = new this(actors, {
				title: `Descanso`,
				content,
				buttons: {
					ok: {
						label: `OK`,
						callback: (html) => {
							const modQ = parseFloat(html.find("[name=qualidade]")[0].value);
							const modPV = parseInt(html.find("[name=modPV]")[0].value);
							const modPM = parseInt(html.find("[name=modPM]")[0].value);
							const curaCP = html.find("[name=curaCP]")[0].checked;
							const curaAC = html.find("[name=curaAC]")[0].checked;
							descanso(actors, modQ, modPV, modPM, curaCP, curaAC);
							
						}
					}
				},
				default: "",
				close: () => {},
			});
			dlg.options.width = 600;
			dlg.position.width = 600;
			dlg.render(true);
		});
	}
}
