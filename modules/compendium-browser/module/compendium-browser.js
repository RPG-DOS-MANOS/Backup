// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

async function preloadTemplates() {
	const templatePaths = [
		"modules/compendium-browser/templates/spell-browser.html",
		"modules/compendium-browser/templates/spell-browser-list.html",
		"modules/compendium-browser/templates/npc-browser.html",
		"modules/compendium-browser/templates/npc-browser-list.html",
		"modules/compendium-browser/templates/feat-browser.html",
		"modules/compendium-browser/templates/feat-browser-list.html",
		"modules/compendium-browser/templates/item-browser.html",
		"modules/compendium-browser/templates/item-browser-list.html",
		"modules/compendium-browser/templates/filter-container.html",
		"modules/compendium-browser/templates/settings.html",
		"modules/compendium-browser/templates/loading.html",
	];

	return loadTemplates(templatePaths);
}

class dnd5eProvider {
	classes = {};

	async getFilters() {
		await this.getClasses();
	}

	async getClasses() {
		const subclasses = {};
		for (let pack of game.packs) {
			if (pack.documentName === "Item") {
				const indexes = await pack.getIndex({ fields: ["system.identifier", "system.classIdentifier"] });
				const classes = indexes.filter((entry) => entry.type === "class" && entry.system.identifier);
				if (classes.length) {
					classes.map((entry) => {
						return {
							label: entry.name,
							identifier: entry.system.identifier
						};
					})
					.forEach((c) => {
						this.classes[c.identifier] = {
							label: c.label,
							subclasses: {}
						};
					});
				}
				const _subclasses = indexes.filter((entry) => entry.type === "subclass" && entry.system.classIdentifier);
				if (_subclasses.length) {
					_subclasses.map((entry) => {
							return {
								name: entry.name,
								identifier: entry.system.identifier,
								classId: entry.system.classIdentifier
							};
						})
						.forEach((subclass) => {
							if (subclasses[subclass.classId]) {
								subclasses[subclass.classId].subclasses[subclass.identifier] = subclass.name;
							} else {
								subclasses[subclass.classId] = {
									subclasses: {
										[subclass.identifier]: subclass.name
									}
								};
							}
						});
				}
			}
		}
		this.classes = foundry.utils.mergeObject(this.classes, subclasses);
		this.classes = Object.fromEntries(
			Object.entries(this.classes).filter(([classId, classData]) => classData.label)
		);
	}

	static get classList() {
		let list = {
			abidalzimshorridwilting: "sorcerer,wizard",
			absorbelements: "artificer,druid,ranger,sorcerer,wizard",
			arcaneweapon: "artificerrevisited",
			acidsplash: "artificer,sorcerer,wizard,artificerrevisited",
			aganazzarsscorcher: "sorcerer,wizard",
			aid: "artificer,bard,cleric,paladin,artificer,artificerrevisited",
			alarm: "artificer,ranger,wizard,artificer,artificerrevisited",
			alterself: "artificer,sorcerer,wizard,artificer,artificerrevisited",
			animalfriendship: "bard,druid,ranger",
			animalmessenger: "bard,druid,ranger",
			animalshapes: "druid",
			animatedead: "cleric,wizard",
			animateobjects: "artificer,bard,sorcerer,wizard,artificerrevisited",
			antilifeshell: "druid",
			antimagicfield: "cleric,wizard",
			antipathysympathy: "bard,druid,wizard",
			arcaneeye: "artificer,wizard,artificer,artificerrevisited",
			arcanegate: "sorcerer,warlock,wizard",
			arcanelock: "artificer,wizard,artificer,artificerrevisited",
			armorofagathys: "warlock",
			armsofhadar: "warlock",
			astralprojection: "cleric,warlock,wizard",
			augury: "cleric",
			auraoflife: "paladin",
			auraofpurity: "paladin",
			auraofvitality: "paladin",
			awaken: "bard,druid",
			bane: "bard,cleric",
			banishingsmite: "paladin",
			banishment: "cleric,paladin,sorcerer,warlock,wizard",
			barkskin: "druid,ranger",
			beaconofhope: "cleric",
			beastbond: "druid,ranger",
			beastsense: "druid,ranger",
			bestowcurse: "bard,cleric,wizard",
			bigbyshand: "artificer,wizard,artificerrevisited",
			arcanehand: "wizard,artificerrevisited",
			bladebarrier: "cleric",
			bladeward: "bard,sorcerer,warlock,wizard",
			bless: "cleric,paladin",
			bladeofdisaster: "sorcerer,warlock,wizard",
			blight: "druid,sorcerer,warlock,wizard",
			blindingsmite: "paladin",
			blindnessdeafness: "bard,cleric,sorcerer,wizard",
			blink: "artificer,sorcerer,wizard,artificer,artificerrevisited",
			blur: "artificer,sorcerer,wizard,artificer,artificerrevisited",
			bonesoftheearth: "druid",
			boomingblade: "artificer,sorcerer,warlock,wizard",
			brandingsmite: "paladin",
			burninghands: "sorcerer,wizard",
			calllightning: "druid",
			calmemotions: "bard,cleric",
			catapult: "artificer,sorcerer,wizard",
			catnap: "artificer,bard,sorcerer,wizard",
			causefear: "warlock,wizard",
			ceremony: "cleric,paladin",
			chainlightning: "sorcerer,wizard",
			chaosbolt: "sorcerer",
			charmmonster: "bard,druid,sorcerer,warlock,wizard",
			charmperson: "bard,druid,sorcerer,warlock,wizard",
			chilltouch: "sorcerer,warlock,wizard",
			chromaticorb: "sorcerer,wizard",
			circleofdeath: "sorcerer,warlock,wizard",
			circleofpower: "paladin",
			clairvoyance: "bard,cleric,sorcerer,wizard",
			clone: "wizard",
			cloudofdaggers: "bard,sorcerer,warlock,wizard",
			cloudkill: "sorcerer,wizard",
			colorspray: "bard,sorcerer,wizard",
			command: "bard,cleric,paladin",
			commune: "cleric",
			communewithnature: "druid,ranger",
			compelledduel: "paladin",
			comprehendlanguages: "bard,sorcerer,warlock,wizard",
			compulsion: "bard",
			coneofcold: "sorcerer,wizard",
			confusion: "bard,druid,sorcerer,wizard",
			conjureanimals: "druid,ranger",
			conjurebarrage: "ranger",
			conjurecelestial: "cleric",
			conjureelemental: "druid,wizard",
			conjurefey: "druid,warlock",
			conjureminorelementals: "druid,wizard",
			conjurevolley: "ranger",
			conjurewoodlandbeings: "druid,ranger",
			contactotherplane: "warlock,wizard",
			contagion: "cleric,druid",
			contingency: "wizard",
			continualflame: "artificer,cleric,wizard,artificer,artificerrevisited",
			controlflames: "druid,sorcerer,wizard",
			controlwater: "cleric,druid,wizard",
			controlweather: "cleric,druid,wizard",
			controlwinds: "druid,sorcerer,wizard",
			cordonofarrows: "ranger",
			counterspell: "sorcerer,warlock,wizard",
			createbonfire: "artificer,druid,sorcerer,warlock,wizard",
			createfoodandwater: "artificer,cleric,paladin",
			createhomunculus: "wizard",
			createmagen: "wizard",
			createundead: "cleric,warlock,wizard",
			createordestroywater: "cleric,druid",
			creation: "artificer,sorcerer,wizard,artificerrevisited",
			crownofmadness: "bard,sorcerer,warlock,wizard",
			crownofstars: "sorcerer,warlock,wizard",
			crusadersmantle: "paladin",
			curewounds: "artificer,bard,cleric,druid,paladin,ranger,artificer,artificerrevisited",
			dancinglights: "artificer,bard,sorcerer,wizard,artificerrevisited",
			dansemacabre: "warlock,wizard",
			darkness: "sorcerer,warlock,wizard",
			darkvision: "artificer,druid,ranger,sorcerer,wizard,artificer,artificerrevisited",
			dawn: "cleric,wizard",
			daylight: "cleric,druid,paladin,ranger,sorcerer",
			deathward: "cleric,paladin,artificer",
			delayedblastfireball: "sorcerer,wizard",
			demiplane: "warlock,wizard",
			destructivewave: "paladin",
			detectevilandgood: "cleric,paladin",
			detectmagic: "artificer,bard,cleric,druid,paladin,ranger,sorcerer,wizard,artificerrevisited",
			detectpoisonanddisease: "cleric,druid,paladin,ranger",
			detectthoughts: "bard,sorcerer,wizard",
			dimensiondoor: "bard,sorcerer,warlock,wizard",
			disguiseself: "artificer,bard,sorcerer,wizard,artificer,artificerrevisited",
			disintegrate: "sorcerer,wizard",
			dispelevilandgood: "cleric,paladin",
			dispelmagic: "artificer,bard,cleric,druid,paladin,sorcerer,warlock,wizard,artificerrevisited",
			dissonantwhispers: "bard",
			distortvalue: "bard,sorcerer,warlock,wizard",
			divination: "cleric",
			divinefavor: "paladin",
			divineword: "cleric",
			dominatebeast: "druid,sorcerer",
			dominatemonster: "bard,sorcerer,warlock,wizard",
			dominateperson: "bard,sorcerer,wizard",
			dragonsbreath: "sorcerer,wizard",
			drawmijsinstantsummons: "wizard",
			dreamoftheblueveil: "bard,sorcerer,warlock,wizard",
			dream: "bard,warlock,wizard",
			druidgrove: "druid",
			druidcraft: "druid",
			dustdevil: "druid,sorcerer,wizard",
			earthtremor: "bard,druid,sorcerer,wizard",
			earthbind: "druid,sorcerer,warlock,wizard",
			earthquake: "cleric,druid,sorcerer",
			eldritchblast: "warlock",
			elementalbane: "artificer,druid,warlock,wizard",
			elementalweapon: "artificer,paladin,artificerrevisited",
			enemiesabound: "bard,sorcerer,warlock,wizard",
			enervation: "sorcerer,warlock,wizard",
			enhanceability: "artificer,bard,cleric,druid,sorcerer,artificer,artificerrevisited",
			enlargereduce: "artificer,bard,sorcerer,wizard,artificer,artificerrevisited",
			ensnaringstrike: "ranger",
			entangle: "druid",
			enthrall: "bard,warlock",
			eruptingearth: "druid,sorcerer,wizard",
			etherealness: "bard,cleric,sorcerer,warlock,wizard",
			evardsblacktentacles: "wizard",
			blacktentacles: "wizard",
			expeditiousretreat: "artificer,sorcerer,warlock,wizard,artificer,artificerrevisited",
			eyebite: "bard,sorcerer,warlock,wizard",
			fabricate: "artificer,wizard,artificer,artificerrevisited",
			faeriefire: "artificer,bard,druid",
			falselife: "artificer,sorcerer,wizard,artificer,artificerrevisited",
			farstep: "sorcerer,warlock,wizard",
			fastfriends: "bard,cleric,wizard",
			fear: "bard,sorcerer,warlock,wizard",
			featherfall: "artificer,bard,sorcerer,wizard",
			feeblemind: "bard,druid,warlock,wizard",
			feigndeath: "bard,cleric,druid,wizard",
			findfamiliar: "wizard",
			findgreatersteed: "paladin",
			findsteed: "paladin",
			findtraps: "cleric,druid,ranger",
			findthepath: "bard,cleric,druid",
			fingerofdeath: "sorcerer,warlock,wizard",
			firebolt: "artificer,sorcerer,wizard,artificerrevisited",
			fireshield: "wizard",
			firestorm: "cleric,druid,sorcerer",
			fireball: "sorcerer,wizard",
			flamearrows: "artificer,druid,ranger,sorcerer,wizard",
			flameblade: "druid",
			flamestrike: "cleric",
			flamingsphere: "druid,wizard",
			fleshtostone: "warlock,wizard",
			fly: "artificer,sorcerer,warlock,wizard,artificer,artificerrevisited",
			fogcloud: "druid,ranger,sorcerer,wizard",
			forbiddance: "cleric",
			forcecage: "bard,warlock,wizard",
			foresight: "bard,druid,warlock,wizard",
			freedomofmovement: "artificer,bard,cleric,druid,ranger,artificer,artificerrevisited",
			friends: "bard,sorcerer,warlock,wizard",
			frostbite: "artificer,druid,sorcerer,warlock,wizard",
			frostfingers: "wizard",
			gaseousform: "sorcerer,warlock,wizard,artificer,artificerrevisited",
			gate: "cleric,sorcerer,wizard",
			geas: "bard,cleric,druid,paladin,wizard",
			gentlerepose: "cleric,wizard",
			giantinsect: "druid",
			giftofgab: "bard,wizard",
			glibness: "bard,warlock",
			globeofinvulnerability: "sorcerer,wizard",
			glyphofwarding: "artificer,bard,cleric,wizard,artificer,artificerrevisited",
			goodberry: "druid,ranger",
			graspingvine: "druid,ranger",
			grease: "artificer,wizard,artificerrevisited",
			greaterinvisibility: "bard,sorcerer,wizard",
			greaterrestoration: "artificer,bard,cleric,druid,artificerrevisited",
			greenflameblade: "artificer,sorcerer,warlock,wizard",
			guardianoffaith: "cleric",
			guardianofnature: "druid,ranger",
			guardsandwards: "bard,wizard",
			guidance: "artificer,cleric,druid,artificerrevisited",
			guidingbolt: "cleric",
			gust: "druid,sorcerer,wizard",
			gustofwind: "druid,sorcerer,wizard",
			hailofthorns: "ranger",
			hallow: "cleric",
			hallucinatoryterrain: "bard,druid,warlock,wizard",
			harm: "cleric",
			haste: "artificer,sorcerer,wizard,artificer,artificerrevisited",
			heal: "cleric,druid",
			healingspirit: "druid,ranger",
			healingword: "bard,cleric,druid",
			heatmetal: "artificer,bard,druid,artificerrevisited",
			hellishrebuke: "warlock",
			heroesfeast: "bard,cleric,druid",
			heroism: "bard,paladin",
			hex: "warlock",
			holdmonster: "bard,sorcerer,warlock,wizard",
			holdperson: "bard,cleric,druid,sorcerer,warlock,wizard",
			holyaura: "cleric",
			holyweapon: "cleric,paladin",
			hungerofhadar: "warlock",
			huntersmark: "ranger",
			hypnoticpattern: "bard,sorcerer,warlock,wizard",
			iceknife: "druid,sorcerer,wizard",
			icestorm: "druid,sorcerer,wizard",
			identify: "artificer,bard,wizard,artificerrevisited",
			illusorydragon: "wizard",
			illusoryscript: "bard,warlock,wizard",
			immolation: "sorcerer,wizard",
			imprisonment: "warlock,wizard",
			incendiarycloud: "sorcerer,wizard",
			incitegreed: "cleric,warlock,wizard",
			infernalcalling: "warlock,wizard",
			infestation: "druid,sorcerer,warlock,wizard",
			inflictwounds: "cleric",
			insectplague: "cleric,druid,sorcerer",
			instantsummons: "wizard",
			intellectfortress: "artificer,bard,sorcerer,warlock,wizard",
			investitureofflame: "druid,sorcerer,warlock,wizard",
			investitureofice: "druid,sorcerer,warlock,wizard",
			investitureofstone: "druid,sorcerer,warlock,wizard",
			investitureofwind: "druid,sorcerer,warlock,wizard",
			invisibility: "artificer,bard,sorcerer,warlock,wizard,artificer,artificerrevisited",
			invulnerability: "wizard",
			jimsglowingcoin: "wizard",
			jimsmagicmissile: "wizard",
			jump: "artificer,druid,ranger,sorcerer,wizard,artificer,artificerrevisited",
			knock: "bard,sorcerer,wizard",
			legendlore: "bard,cleric,wizard",
			leomundssecretchest: "artificer,wizard,artificer,artificerrevisited",
			leomundstinyhut: "bard,wizard",
			lesserrestoration: "artificer,bard,cleric,druid,paladin,ranger,artificer,artificerrevisited",
			levitate: "artificer,sorcerer,wizard,artificerrevisited",
			lifetransference: "cleric,wizard",
			light: "artificer,bard,cleric,sorcerer,wizard,artificerrevisited",
			lightningarrow: "ranger",
			lightningbolt: "sorcerer,wizard",
			lightninglure: "artificer,sorcerer,warlock,wizard",
			locateanimalsorplants: "bard,druid,ranger",
			locatecreature: "bard,cleric,druid,paladin,ranger,wizard",
			locateobject: "bard,cleric,druid,paladin,ranger,wizard",
			longstrider: "artificer,bard,druid,ranger,wizard,artificer,artificerrevisited",
			maddeningdarkness: "warlock,wizard",
			maelstrom: "druid",
			magearmor: "sorcerer,wizard",
			magehand: "artificer,bard,sorcerer,warlock,wizard,artificerrevisited",
			magiccircle: "cleric,paladin,warlock,wizard",
			magicjar: "wizard",
			magicmissile: "sorcerer,wizard",
			magicmouth: "artificer,bard,wizard,artificerrevisited",
			magicstone: "artificer,druid,warlock",
			magicweapon: "artificer,paladin,wizard,artificer,artificerrevisited",
			majorimage: "bard,sorcerer,warlock,wizard",
			masscurewounds: "bard,cleric,druid",
			massheal: "cleric",
			masshealingword: "bard,cleric",
			masspolymorph: "bard,sorcerer,wizard",
			masssuggestion: "bard,sorcerer,warlock,wizard",
			maximiliansearthengrasp: "sorcerer,wizard",
			maze: "wizard",
			meldintostone: "cleric,druid",
			melfsacidarrow: "wizard",
			melfsminutemeteors: "sorcerer,wizard",
			acidarrow: "wizard",
			mending: "artificer,bard,cleric,druid,sorcerer,wizard,artificerrevisited",
			mentalprison: "sorcerer,warlock,wizard",
			message: "artificer,bard,sorcerer,wizard,artificerrevisited",
			meteorswarm: "sorcerer,wizard",
			mightyfortress: "wizard",
			mindblank: "bard,wizard",
			mindsliver: "sorcerer,warlock,wizard",
			mindspike: "sorcerer,warlock,wizard",
			minorillusion: "bard,sorcerer,warlock,wizard",
			miragearcane: "bard,druid,wizard",
			mirrorimage: "bard,sorcerer,warlock,wizard",
			mislead: "bard,wizard",
			mistystep: "sorcerer,warlock,wizard",
			modifymemory: "bard,wizard",
			moldearth: "druid,sorcerer,wizard",
			moonbeam: "druid",
			mordenkainensfaithfulhound: "artificer,wizard,artificer,artificerrevisited",
			motivationalspeech: "bard,cleric",
			faithfulhound: "wizard,artificer,artificerrevisited",
			mordenkainensmagnificentmansion: "bard,wizard",
			magnificentmansion: "bard,wizard",
			mordenkainensprivatesanctum: "artificer,wizard,artificer,artificerrevisited",
			mordenkainenssword: "bard,wizard",
			arcanesword: "bard,wizard",
			moveearth: "druid,sorcerer,wizard",
			negativeenergyflood: "warlock,wizard",
			nondetection: "bard,ranger,wizard",
			nystulsmagicaura: "wizard",
			arcanistsmagicaura: "wizard",
			otilukesfreezingsphere: "wizard",
			otilukesresilientsphere: "artificer,wizard,artificer,artificerrevisited",
			ottosirresistibledance: "bard,wizard",
			passwithouttrace: "druid,ranger",
			passwall: "wizard",
			phantasmalforce: "bard,sorcerer,wizard",
			phantasmalkiller: "bard,wizard",
			phantomsteed: "wizard",
			planarally: "cleric",
			planarbinding: "bard,cleric,druid,wizard",
			planeshift: "cleric,druid,sorcerer,warlock,wizard",
			plantgrowth: "bard,druid,ranger",
			poisonspray: "artificer,druid,sorcerer,warlock,wizard,artificerrevisited",
			polymorph: "bard,druid,sorcerer,wizard",
			powerwordheal: "bard",
			powerwordkill: "bard,sorcerer,warlock,wizard",
			powerwordpain: "sorcerer,warlock,wizard",
			powerwordstun: "bard,sorcerer,warlock,wizard",
			prayerofhealing: "cleric",
			prestidigitation: "artificer,bard,sorcerer,warlock,wizard,artificerrevisited",
			primalsavagery: "druid",
			primordialward: "druid",
			prismaticspray: "bard,sorcerer,wizard",
			prismaticwall: "bard,wizard",
			produceflame: "druid",
			programmedillusion: "bard,wizard",
			projectimage: "bard,wizard",
			protectionfromenergy: "artificer,cleric,druid,ranger,sorcerer,wizard,artificer,artificerrevisited",
			protectionfromevilandgood: "cleric,paladin,warlock,wizard",
			protectionfrompoison: "artificer,cleric,druid,paladin,ranger,artificer,artificerrevisited",
			psychicscream: "bard,sorcerer,warlock,wizard",
			purifyfoodanddrink: "artificer,cleric,druid,paladin",
			pyrotechnics: "artificer,bard,sorcerer,wizard",
			raisedead: "bard,cleric,paladin",
			rarystelepathicbond: "bard,wizard",
			rayofenfeeblement: "warlock,wizard",
			rayoffrost: "artificer,sorcerer,wizard,artificerrevisited",
			rayofsickness: "sorcerer,wizard",
			regenerate: "bard,cleric,druid",
			reincarnate: "druid",
			removecurse: "cleric,paladin,warlock,wizard",
			resistance: "artificer,cleric,druid,artificerrevisited",
			resurrection: "bard,cleric",
			reversegravity: "druid,sorcerer,wizard",
			revivify: "artificer,cleric,paladin,artificer,artificerrevisited",
			ropetrick: "artificer,wizard,artificer,artificerrevisited",
			sacredflame: "cleric",
			sanctuary: "artificer,cleric,artificer,artificerrevisited",
			scatter: "sorcerer,warlock,wizard",
			scorchingray: "sorcerer,wizard",
			scrying: "bard,cleric,druid,warlock,wizard",
			searingsmite: "paladin",
			seeinvisibility: "artificer,bard,sorcerer,wizard,artificerrevisited",
			seeming: "bard,sorcerer,wizard",
			sending: "bard,cleric,wizard",
			sequester: "wizard",
			shadowblade: "sorcerer,warlock,wizard",
			shadowofmoil: "warlock",
			shapewater: "druid,sorcerer,wizard",
			shapechange: "druid,wizard",
			shatter: "bard,sorcerer,warlock,wizard",
			shield: "sorcerer,wizard",
			shieldoffaith: "cleric,paladin,artificer,artificerrevisited",
			shillelagh: "druid",
			shockinggrasp: "artificer,sorcerer,wizard,artificerrevisited",
			sickeningradiance: "sorcerer,warlock,wizard",
			silence: "bard,cleric,ranger",
			silentimage: "bard,sorcerer,wizard",
			simulacrum: "wizard",
			skillempowerment: "artificer,bard,sorcerer,wizard",
			skywrite: "artificer,bard,druid,wizard",
			sleep: "bard,sorcerer,wizard",
			sleetstorm: "druid,sorcerer,wizard",
			slow: "bard,sorcerer,wizard",
			snare: "artificer,druid,ranger,wizard",
			snillocssnowballswarm: "sorcerer,wizard",
			soulcage: "warlock,wizard",
			sparethedying: "artificer,cleric,artificerrevisited",
			speakwithanimals: "bard,druid,ranger",
			speakwithdead: "bard,cleric",
			speakwithplants: "bard,druid,ranger",
			spiderclimb: "artificer,sorcerer,warlock,wizard,artificer,artificerrevisited",
			spikegrowth: "druid,ranger",
			spiritguardians: "cleric",
			spiritualweapon: "cleric",
			spiritshroud: "cleric,paladin,warlock,wizard",
			staggeringsmite: "paladin",
			steelwindstrike: "ranger,wizard",
			stinkingcloud: "bard,sorcerer,wizard",
			stoneshape: "artificer,cleric,druid,wizard,artificer,artificerrevisited",
			stoneskin: "artificer,druid,ranger,sorcerer,wizard,artificer,artificerrevisited",
			stormofvengeance: "druid",
			stormsphere: "sorcerer,wizard",
			suggestion: "bard,sorcerer,warlock,wizard",
			summonaberration: "warlock,wizard",
			summonbeast: "druid,ranger",
			summoncelestial: "cleric,paladin",
			summonconstruct: "artificer,wizard",
			summonelemental: "druid,ranger,wizard",
			summonfey: "druid,ranger,warlock,wizard",
			summonfiend: "warlock,wizard",
			summongreaterdemon: "warlock,wizard",
			summonlesserdemons: "warlock,wizard",
			summonshadowspawn: "warlock,wizard",
			summonundead: "warlock,wizard",
			sunbeam: "druid,sorcerer,wizard",
			sunburst: "druid,sorcerer,wizard",
			swiftquiver: "ranger",
			swordburst: "artificer,sorcerer,warlock,wizard",
			synapticstatic: "bard,sorcerer,warlock,wizard",
			symbol: "bard,cleric,wizard",
			tashascausticbrew: "artificer,sorcerer,wizard",
			tashashideouslaughter: "bard,wizard",
			hideouslaughter: "bard,wizard",
			tashasmindwhip: "sorcerer,wizard",
			tashasotherworldlyguise: "sorcerer,warlock,wizard",
			telekinesis: "sorcerer,wizard",
			telepathy: "wizard",
			teleport: "bard,sorcerer,wizard",
			teleportationcircle: "bard,sorcerer,wizard",
			templeofthegods: "cleric",
			tensersfloatingdisk: "wizard",
			tensersfloatingdisc: "wizard",
			tenserstransformation: "wizard",
			floatingdisc: "wizard",
			thaumaturgy: "cleric",
			thornwhip: "artificer,druid,artificerrevisited",
			thunderstep: "sorcerer,warlock,wizard",
			thunderclap: "artificer,bard,druid,sorcerer,warlock,wizard",
			thunderoussmite: "paladin",
			thunderwave: "bard,druid,sorcerer,wizard",
			tidalwave: "druid,sorcerer,wizard",
			timestop: "sorcerer,wizard",
			tinyservant: "artificer,wizard",
			tollthedead: "cleric,warlock,wizard",
			tongues: "bard,cleric,sorcerer,warlock,wizard",
			transmuterock: "artificer,druid,wizard",
			transportviaplants: "druid",
			treestride: "druid,ranger",
			truepolymorph: "bard,warlock,wizard",
			trueresurrection: "cleric,druid",
			trueseeing: "bard,cleric,sorcerer,warlock,wizard",
			truestrike: "bard,sorcerer,warlock,wizard",
			tsunami: "druid",
			unseenservant: "bard,warlock,wizard",
			vampirictouch: "warlock,wizard",
			viciousmockery: "bard",
			vitriolicsphere: "sorcerer,wizard",
			walloffire: "druid,sorcerer,wizard",
			wallofforce: "wizard",
			wallofice: "wizard",
			walloflight: "sorcerer,warlock,wizard",
			wallofsand: "wizard",
			wallofstone: "artificer,druid,sorcerer,wizard,artificerrevisited",
			wallofthorns: "druid",
			wallofwater: "druid,sorcerer,wizard",
			wardingbond: "cleric",
			wardingwind: "bard,druid,sorcerer,wizard",
			waterbreathing: "artificer,druid,ranger,sorcerer,wizard,artificer,artificerrevisited",
			waterwalk: "artificer,cleric,druid,ranger,sorcerer,artificer,artificerrevisited",
			waterysphere: "druid,sorcerer,wizard",
			web: "artificer,sorcerer,wizard",
			weird: "wizard",
			whirlwind: "druid,sorcerer,wizard",
			windwalk: "druid",
			windwall: "druid,ranger",
			wish: "sorcerer,wizard",
			witchbolt: "sorcerer,warlock,wizard",
			wordofradiance: "cleric",
			wordofrecall: "cleric",
			wrathofnature: "druid,ranger",
			wrathfulsmite: "paladin",
			zephyrstrike: "ranger",
			zoneoftruth: "bard,cleric,paladin"
		};
		if (game.settings.get("core", "language") === "ja") {
			list = {
				アストラルプロジェクション: "cleric,warlock,wizard",
				アニマルシェイプス: "druid",
				レジスタンス: "cleric,druid,artificer",
				マジックマウス: "bard,wizard,artificer",
				ブーミングブレード: "sorcerer,warlock,wizard,artificer",
				グリーンフレイムブレード: "warlock,wizard,artificer",
				ライトニングルアー: "sorcerer,warlock,wizard,artificer",
				ソードバースト: "sorcerer,warlock,wizard,artificer",
				アシッドスプラッシュ: "sorcerer,wizard,artificer",
				エイド: "cleric,paladin,artificer,ranger,bard",
				アラーム: "ranger,wizard,artificer",
				オルターセルフ: "sorcerer,wizard,artificer",
				アニマルフレンドシップ: "bard,druid,ranger",
				アニマルメッセンジャー: "bard,druid,ranger",
				アニメイトデッド: "cleric,wizard",
				アニメイトオブジェクツ: "bard,sorcerer,wizard,artificer",
				アンティライフシェル: "druid",
				アンティマジックフィールド: "cleric,wizard",
				アーケインアイ: "wizard,artificer",
				アーケインゲート: "sorcerer,warlock,wizard",
				アーケインロック: "wizard,artificer",
				アーマーオヴアガテュス: "warlock",
				アームズオヴハダル: "warlock",
				オーギュリイ: "wizard,druid,cleric",
				オーラオヴライフ: "cleric,paladin",
				オーラオヴピュアリティ: "cleric,paladin",
				オーラオヴヴァイタリティ: "druid,cleric,paladin",
				アウェイクン: "bard,druid",
				ベイン: "bard,cleric",
				バニッシングスマイト: "paladin",
				バニッシュメント: "cleric,paladin,sorcerer,warlock,wizard",
				バークスキン: "druid,ranger",
				ビーコンオヴホープ: "cleric",
				ビーストセンス: "druid,ranger",
				ビストウカース: "bard,cleric,wizard",
				ビグビーズハンド: "wizard,sorcerer,artificer",
				ブレードバリアー: "cleric",
				ブレードウォード: "bard,sorcerer,warlock,wizard",
				ブレス: "cleric,paladin",
				ブライト: "druid,sorcerer,warlock,wizard",
				ブランディングスマイト: "paladin",
				ブラインドネスデフネス: "bard,cleric,sorcerer,wizard",
				ブリンク: "sorcerer,wizard,artificer",
				ブラー: "sorcerer,wizard,artificer",
				ブラインディングスマイト: "paladin",
				バーニングハンズ: "sorcerer,wizard",
				コールライトニング: "druid",
				カームエモーションズ: "bard,cleric",
				チェインライトニング: "sorcerer,wizard",
				チャームパースン: "bard,druid,sorcerer,warlock,wizard",
				チルタッチ: "sorcerer,warlock,wizard",
				クロマティックオーブ: "sorcerer,wizard",
				サークルオヴデス: "sorcerer,warlock,wizard",
				サークルオヴパワー: "paladin",
				クレアヴォイアンス: "bard,cleric,sorcerer,wizard",
				クローン: "wizard",
				クラウドオヴダガーズ: "bard,sorcerer,warlock,wizard",
				クラウドキル: "sorcerer,wizard",
				カラースプレー: "sorcerer,wizard,bard",
				コマンド: "bard,cleric,paladin",
				コミューン: "cleric",
				コミューンウィズネイチャー: "druid,ranger",
				コンペルドデュエル: "paladin",
				コンプリヘンドランゲージズ: "bard,sorcerer,warlock,wizard",
				コンパルジョン: "bard",
				コーンオヴコールド: "sorcerer,wizard,druid",
				コンフュージョン: "bard,druid,sorcerer,wizard",
				カンジャーアニマルズ: "druid,ranger",
				カンジャーバラージ: "ranger",
				カンジャーセレスチャル: "cleric",
				カンジャーエレメンタル: "druid,wizard",
				カンジャーフェイ: "druid,warlock",
				カンジャーマイナーエレメンタルズ: "druid,wizard",
				カンジャーヴォレー: "ranger",
				カンジャーウッドランドビーイングズ: "druid,ranger",
				コンタクトアザープレイン: "warlock,wizard",
				コンテイジョン: "cleric,druid",
				コンティンジェンシィ: "wizard",
				コンティニュアルフレイム: "cleric,wizard,druid,artificer",
				コントロールウォーター: "cleric,druid,wizard",
				コントロールウェザー: "cleric,druid,wizard",
				コードンオヴアローズ: "ranger",
				カウンタースペル: "sorcerer,warlock,wizard",
				クリエイトフードアンドウォーター: "cleric,paladin,artificer",
				クリエイトアンデッド: "cleric,warlock,wizard",
				クリエイトオアデストロイウォーター: "cleric,druid",
				クリエイション: "sorcerer,wizard,artificer",
				クラウンオヴマッドネス: "bard,sorcerer,warlock,wizard",
				クルセイダーズマントル: "paladin",
				キュアウーンズ: "bard,cleric,druid,paladin,ranger,artificer",
				ダンシングライツ: "bard,sorcerer,wizard,artificer",
				ダークネス: "sorcerer,warlock,wizard",
				ダークヴィジョン: "druid,ranger,sorcerer,wizard,artificer",
				デイライト: "cleric,druid,paladin,ranger,sorcerer",
				デスウォード: "cleric,paladin",
				ディレイドブラストファイアーボール: "sorcerer,wizard",
				デミプレイン: "warlock,wizard,sorcerer",
				デストラクティヴウェイヴ: "paladin",
				ディスペルマジック: "bard,cleric,druid,paladin,sorcerer,warlock,wizard,artificer",
				ディテクトマジック: "bard,cleric,druid,paladin,ranger,sorcerer,wizard,artificer",
				ディテクトポイズンアンドディジーズ: "cleric,druid,paladin,ranger",
				ディテクトソウツ: "bard,sorcerer,wizard",
				ディメンジョンドア: "bard,sorcerer,warlock,wizard",
				ディスガイズセルフ: "bard,sorcerer,wizard,artificer",
				ディスインテグレイト: "sorcerer,wizard",
				ディスペルイーヴルアンドグッド: "cleric,paladin",
				ディヴィネーション: "wizard,druid,cleric",
				ディヴァインフェイヴァー: "paladin",
				ディヴァインワード: "cleric",
				ドミネイトビースト: "ranger,druid,sorcerer",
				ドミネイトモンスター: "bard,sorcerer,warlock,wizard",
				ドミネイトパースン: "bard,sorcerer,wizard",
				ドローミジズインスタントサモンズ: "wizard",
				ドリーム: "bard,warlock,wizard",
				ドルイドクラフト: "druid",
				アースクウェイク: "cleric,druid,sorcerer",
				エルドリッチブラスト: "warlock",
				エレメンタルウェポン: "paladin,ranger,druid,artificer",
				エンハンスアビリティ: "wizard,bard,cleric,ranger,druid,sorcerer,artificer",
				エンラージリデュース: "sorcerer,wizard,druid,bard,artificer",
				エンスネアリングストライク: "ranger",
				エンタングル: "druid,ranger",
				エンスロール: "bard,warlock",
				イセリアルネス: "bard,cleric,sorcerer,warlock,wizard",
				エヴァーズブラックテンタクルズ: "wizard",
				エクスペディシャスリトリート: "sorcerer,warlock,wizard,artificer",
				アイバイト: "bard,sorcerer,warlock,wizard",
				ファブリケイト: "wizard,artificer",
				フェアリーファイアー: "bard,druid,artificer",
				フォールスライフ: "sorcerer,wizard",
				フィアー: "bard,sorcerer,warlock,wizard",
				フェザーフォール: "bard,sorcerer,wizard,artificer",
				フィーブルマインド: "bard,druid,warlock,wizard",
				フェインデス: "bard,cleric,druid,wizard",
				ファインドファミリアー: "wizard",
				ファインドスティード: "paladin",
				ファインドトラップス: "cleric,druid,ranger",
				ファインドザパス: "bard,cleric,druid",
				フィンガーオヴデス: "sorcerer,warlock,wizard",
				ファイアーボルト: "sorcerer,wizard,artificer",
				ファイアーシールド: "wizard,sorcerer,druid",
				ファイアーストーム: "cleric,druid,sorcerer",
				ファイアーボール: "sorcerer,wizard",
				フレイムブレード: "druid,sorcerer",
				フレイムストライク: "cleric",
				フレイミングスフィアー: "druid,wizard,sorcerer",
				フレッシュトゥストーン: "warlock,wizard,sorcerer,druid",
				フライ: "sorcerer,warlock,wizard,artificer",
				フォッグクラウド: "druid,ranger,sorcerer,wizard",
				フォービダンス: "cleric",
				フォースケイジ: "bard,warlock,wizard",
				フォアサイト: "bard,druid,warlock,wizard",
				フリーダムオヴムーヴメント: "bard,cleric,druid,ranger,artificer",
				フレンズ: "bard,sorcerer,warlock,wizard",
				ガシアスフォーム: "sorcerer,warlock,wizard",
				ゲート: "cleric,sorcerer,wizard,warlock",
				ギアス: "bard,cleric,druid,paladin,wizard",
				ジェントルリポウズ: "cleric,paladin,wizard",
				ジャイアントインセクト: "druid",
				グリブネス: "bard,warlock",
				グローブオヴインヴァルナラビリティ: "sorcerer,wizard",
				グリフオヴウォーディング: "bard,cleric,wizard,artificer",
				グッドベリー: "druid,ranger",
				グラスピングヴァイン: "druid,ranger",
				グリース: "wizard,sorcerer,artificer",
				グレーターインヴィジビリティ: "bard,sorcerer,wizard",
				グレーターレストレーション: "ranger,bard,cleric,druid,artificer",
				ガーディアンオヴフェイス: "cleric",
				ガーズアンドウォーズ: "bard,wizard",
				ガイダンス: "cleric,druid,artificer",
				ガイディングボルト: "cleric",
				ガストオヴウィンド: "ranger,druid,sorcerer,wizard",
				ヘイルオヴソーンズ: "ranger",
				ハロウ: "cleric",
				ハリューサナトリテレイン: "bard,druid,warlock,wizard",
				ハーム: "cleric",
				ヘイスト: "sorcerer,wizard,artificer",
				ヒール: "cleric,druid",
				ヒーリングワード: "bard,cleric,druid",
				ヒートメタル: "bard,druid,artificer",
				ヘリッシュリビューク: "warlock",
				ヒーローズフィースト: "bard,cleric,druid",
				ヒロイズム: "bard,paladin",
				ヘクス: "warlock",
				ホールドモンスター: "bard,sorcerer,warlock,wizard",
				ホールドパースン: "bard,cleric,druid,sorcerer,warlock,wizard",
				ホーリィオーラ: "cleric",
				ハンガーオヴハダル: "warlock",
				ハンターズマーク: "ranger",
				ヒプノティックパターン: "bard,sorcerer,warlock,wizard",
				アイスストーム: "druid,sorcerer,wizard",
				アイデンティファイ: "bard,wizard,artificer",
				イリューソリィスクリプト: "bard,warlock,wizard",
				インプリズンメント: "warlock,wizard",
				インセンディエリクラウド: "sorcerer,wizard,druid",
				インフリクトウーンズ: "cleric",
				インセクトプレイグ: "cleric,druid,sorcerer",
				インヴィジビリティ: "bard,sorcerer,warlock,wizard,artificer",
				ジャンプ: "druid,ranger,sorcerer,wizard,artificer",
				ノック: "bard,sorcerer,wizard",
				レジェンドローア: "bard,cleric,wizard",
				レオムンズシークレットチェスト: "wizard,artificer",
				レオムンズタイニイハット: "bard,wizard",
				レッサーレストレーション: "bard,cleric,druid,paladin,ranger,artificer",
				レヴィテート: "sorcerer,wizard,artificer",
				ライト: "bard,cleric,sorcerer,wizard,artificer",
				ライトニングアロー: "ranger",
				ライトニングボルト: "sorcerer,wizard",
				ロケートアニマルズオアプランツ: "bard,druid,ranger",
				ロケートクリーチャー: "bard,cleric,druid,paladin,ranger,wizard",
				ロケートオブジェクト: "bard,cleric,druid,paladin,ranger,wizard",
				ロングストライダー: "bard,druid,ranger,wizard,artificer",
				メイジアーマー: "sorcerer,wizard",
				メイジハンド: "bard,sorcerer,warlock,wizard,artificer",
				マジックジャー: "wizard",
				マジックミサイル: "sorcerer,wizard",
				マジックサークル: "wizard,warlock,cleric,paladin",
				マジックウェポン: "paladin,wizard,sorcerer,ranger,artificer",
				メジャーイメージ: "bard,sorcerer,warlock,wizard",
				マスキュアウーンズ: "bard,cleric,druid",
				マスヒール: "cleric",
				マスヒーリングワード: "cleric,bard",
				マスサジェスチョン: "bard,sorcerer,warlock,wizard",
				メイズ: "wizard",
				メルドイントゥストーン: "cleric,ranger,druid",
				メルフスアシッドアロー: "wizard",
				メンディング: "bard,cleric,druid,sorcerer,wizard,artificer",
				メッセージ: "bard,sorcerer,wizard,artificer",
				ミーティアスウォーム: "sorcerer,wizard",
				マインドブランク: "bard,wizard",
				マイナーイリュージョン: "bard,sorcerer,warlock,wizard",
				ミラージュアーケイン: "bard,druid,wizard",
				ミラーイメージ: "sorcerer,warlock,wizard,bard",
				ミスリード: "bard,wizard,warlock",
				ミスティステップ: "sorcerer,warlock,wizard",
				モディファイメモリー: "bard,wizard",
				ムーンビーム: "druid",
				モルデンカイネンズフェイスフルハウンド: "wizard,artificer",
				モルデンカイネンズマグニフィセントマンション: "bard,wizard",
				モルデンカイネンズプライヴェートサンクトゥム: "wizard,artificer",
				モルデンカイネンズソード: "bard,wizard",
				ムーヴアース: "druid,sorcerer,wizard",
				ノンディテクション: "bard,ranger,wizard",
				ニストゥルズマジックオーラ: "wizard",
				オティルークスフリージングスフィアー: "wizard,sorcerer",
				オティルークスリジリアントスフィアー: "wizard,artificer",
				オットーズイレジスティブルダンス: "bard,wizard",
				パスウィズアウトトレイス: "druid,ranger",
				パスウォール: "wizard",
				ファンタズマルフォース: "bard,sorcerer,wizard",
				ファンタズマルキラー: "wizard",
				ファントムスティード: "wizard",
				プレイナーアライ: "cleric",
				プレイナーバインディング: "bard,cleric,druid,wizard,warlock",
				プレインシフト: "cleric,druid,sorcerer,warlock,wizard",
				プラントグロウス: "bard,druid,ranger",
				ポイズンスプレー: "druid,sorcerer,warlock,wizard,artificer",
				ポリモーフ: "bard,druid,sorcerer,wizard",
				パワーワードヒール: "bard,cleric",
				パワーワードキル: "bard,sorcerer,warlock,wizard",
				パワーワードスタン: "bard,sorcerer,warlock,wizard",
				プレイヤーオヴヒーリング: "cleric,paladin",
				プレスティディジテイション: "bard,sorcerer,warlock,wizard,artificer",
				プリズマティックスプレー: "sorcerer,wizard,bard",
				プリズマティックウォール: "wizard,bard",
				プロデュースフレイム: "druid",
				プログラムドイリュージョン: "bard,wizard",
				プロジェクトイメージ: "bard,wizard",
				プロテクションフロムエナジー: "cleric,druid,ranger,sorcerer,wizard,artificer",
				ディテクトイーヴルアンドグッド: "cleric,paladin",
				プロテクションフロムイーヴルアンドグッド: "cleric,paladin,ranger,wizard,druid,artificer",
				ピュアリファイフードアンドドリンク: "cleric,druid,paladin,artificer",
				レイズデッド: "bard,cleric,paladin",
				レアリーズテレパシックボンド: "wizard,bard",
				プロテクションフロムポイズン: "cleric,druid,paladin,ranger,artificer",
				レイオヴフロスト: "sorcerer,wizard,artificer",
				レイオヴシックネス: "sorcerer,wizard",
				リジェネレイト: "bard,cleric,druid",
				リインカーネイト: "druid",
				リムーヴカース: "cleric,paladin,warlock,wizard",
				リザレクション: "bard,cleric",
				リヴァースグラヴィティ: "druid,sorcerer,wizard",
				リヴィヴィファイ: "cleric,paladin,ranger,druid,artificer",
				ロープトリック: "wizard,artificer",
				セイクリッドフレイム: "cleric",
				サンクチュアリ: "cleric,artificer",
				レイオヴエンフィーブルメント: "warlock,wizard",
				スコーチングレイ: "sorcerer,wizard",
				スクライング: "bard,cleric,druid,warlock,wizard",
				シアリングスマイト: "paladin,ranger",
				シーインヴィジビリティ: "bard,sorcerer,wizard,artificer",
				シーミング: "bard,sorcerer,wizard",
				センディング: "bard,cleric,wizard",
				シクウェスター: "wizard",
				シェイプチェンジ: "druid,wizard",
				シャター: "bard,sorcerer,warlock,wizard",
				シールド: "sorcerer,wizard",
				シールドオヴフェイス: "cleric,paladin",
				シャレイリ: "druid",
				ショッキンググラスプ: "sorcerer,wizard,artificer",
				サイレンス: "bard,cleric,ranger",
				サイレントイメージ: "bard,sorcerer,wizard",
				シミュレイクラム: "wizard",
				スリープ: "bard,sorcerer,wizard",
				スリートストーム: "druid,sorcerer,wizard",
				スロー: "sorcerer,wizard,bard",
				スペアザダイイング: "cleric,artificer",
				スピークウィズアニマルズ: "bard,druid,ranger",
				スピークウィズデッド: "wizard,bard,cleric",
				スピークウィズプランツ: "bard,druid,ranger",
				スパイダークライム: "sorcerer,warlock,wizard,artificer",
				スパイクグロウス: "druid,ranger",
				スピリットガーディアンズ: "cleric",
				スピリチュアルウェポン: "cleric",
				スタガリングスマイト: "paladin",
				スティンキングクラウド: "bard,sorcerer,wizard",
				ストーンシェイプ: "cleric,druid,wizard,artificer",
				ストーンスキン: "druid,ranger,sorcerer,wizard,artificer",
				ストームオヴヴェンジャンス: "druid",
				サジェスチョン: "bard,sorcerer,warlock,wizard",
				サンビーム: "druid,sorcerer,wizard,cleric",
				サンバースト: "druid,sorcerer,wizard,cleric",
				スウィフトクウィヴァー: "ranger",
				シンボル: "bard,cleric,wizard,druid",
				ターシャーズヒディアスラフター: "bard,wizard",
				テレキネシス: "sorcerer,wizard",
				テレパシー: "wizard",
				テレポート: "bard,sorcerer,wizard",
				テレポーテーションサークル: "bard,sorcerer,wizard,warlock",
				テンサーズフローティングディスク: "wizard",
				ソーマタージー: "cleric",
				ソーンウィップ: "druid,artificer",
				サンダラススマイト: "paladin",
				サンダーウェイヴ: "bard,druid,sorcerer,wizard",
				タイムストップ: "sorcerer,wizard",
				タンズ: "bard,cleric,sorcerer,warlock,wizard",
				トランスポートヴァイアプランツ: "druid",
				ツリーストライド: "druid,ranger",
				トゥルーポリモーフ: "bard,warlock,wizard",
				トゥルーリザレクション: "cleric,druid",
				トゥルーシーイング: "bard,cleric,sorcerer,warlock,wizard",
				トゥルーストライク: "bard,sorcerer,warlock,wizard",
				ツナミ: "druid",
				アンシーンサーヴァント: "bard,warlock,wizard",
				ヴァンピリックタッチ: "warlock,wizard,sorcerer",
				ヴィシャスモッカリィ: "bard",
				ウォールオヴファイアー: "druid,sorcerer,wizard",
				ウォールオヴフォース: "wizard",
				ウォールオヴアイス: "wizard",
				ウォールオヴストーン: "druid,sorcerer,wizard,artificer",
				ウォールオヴソーンズ: "druid",
				ウォーディングボンド: "cleric,paladin",
				ウォーターブリージング: "druid,ranger,sorcerer,wizard,artificer",
				ウォーターウォーク: "cleric,druid,ranger,sorcerer,artificer",
				ウェブ: "sorcerer,wizard,artificer",
				ウィアード: "wizard,warlock",
				ウィンドウォーク: "druid",
				ウィンドウォール: "druid,ranger",
				ウィッシュ: "sorcerer,wizard",
				ウィッチボルト: "sorcerer,warlock,wizard",
				ワードオヴリコール: "cleric",
				ラスフルスマイト: "paladin",
				ゾーンオヴトゥルース: "bard,cleric,paladin",
				インヴェスティチャーオヴストーン: "wizard,warlock,sorcerer,druid",
				フロストバイト: "wizard,warlock,sorcerer,druid,artificer",
				アガナザーズスコーチャー: "wizard,sorcerer",
				エネミーズアバウンド: "wizard,warlock,sorcerer,bard",
				ボーンズオヴジアース: "druid",
				アーストレマー: "wizard,sorcerer,druid,bard",
				スキルエンパワーメント: "wizard,sorcerer,bard,artificer",
				メルフスマイニュートミーティアズ: "wizard,sorcerer",
				テンサーズトランスフォーメーション: "wizard",
				タイニーサーヴァント: "wizard,artificer",
				コントロールフレイムズ: "wizard,sorcerer,druid",
				コーズフィアー: "wizard,warlock",
				プライモーディアルウォード: "druid",
				インヴァルナラビリティ: "wizard",
				サモングレーターデーモン: "wizard,warlock",
				スキャター: "wizard,warlock,sorcerer",
				アビーダルジムズホリッドウィルティング: "wizard,sorcerer",
				ウォールオヴサンド: "wizard",
				ダストデヴィル: "wizard,sorcerer,druid",
				パイロテクニクス: "wizard,sorcerer,bard,artificer",
				シェイプウォーター: "wizard,sorcerer,druid",
				マインドスパイク: "wizard,warlock,sorcerer",
				ファインドグレータースティード: "paladin",
				テンプルオヴザゴッズ: "cleric",
				スカイライト: "wizard,druid,bard,artificer",
				ガーディアンオヴネイチャー: "ranger,druid",
				ウォータリースフィアー: "wizard,sorcerer,druid",
				マスポリモーフ: "wizard,sorcerer,bard",
				シャドウオヴモイル: "warlock",
				ネガティヴエナジーフラッド: "wizard,warlock",
				トウルザデッド: "wizard,warlock,cleric",
				クラウンオヴスターズ: "wizard,warlock,sorcerer",
				インヴェスティチャーオヴウィンド: "wizard,warlock,sorcerer,druid",
				ガスト: "wizard,sorcerer,druid",
				ワードオヴレイディアンス: "cleric",
				インフェステイション: "wizard,warlock,sorcerer,druid",
				サンダークラップ: "wizard,warlock,sorcerer,druid,bard,artificer",
				エナヴェイション: "wizard,warlock,sorcerer",
				ヒーリングスピリット: "ranger,druid",
				タイダルウェイヴ: "wizard,sorcerer,druid",
				キャットナップ: "wizard,sorcerer,bard,artificer",
				スネア: "wizard,ranger,druid,artificer",
				ビーストボンド: "ranger,druid",
				サイキックスクリーム: "wizard,warlock,sorcerer,bard",
				シャドウブレード: "wizard,warlock,sorcerer",
				コントロールウィンズ: "wizard,sorcerer,druid",
				イモレーション: "wizard,sorcerer",
				アースバインド: "wizard,warlock,sorcerer,druid",
				マッドニングダークネス: "wizard,warlock",
				ウォールオヴライト: "wizard,warlock,sorcerer",
				ダンスマカブル: "wizard,warlock",
				ゼファーストライク: "ranger",
				イリューソリィドラゴン: "wizard",
				エラプティングアース: "wizard,sorcerer,druid",
				フレイムアローズ: "wizard,sorcerer,ranger,druid,artificer",
				シナプティックスタティック: "wizard,warlock,sorcerer,bard",
				マクシミリアンズアースングラスプ: "wizard,sorcerer",
				ケイオスボルト: "sorcerer",
				マイティフォートレス: "wizard",
				マジックストーン: "warlock,druid,artificer",
				ドルイドグローヴ: "druid",
				ファーステップ: "wizard,warlock,sorcerer",
				ホーリィウェポン: "paladin,cleric",
				インファーナルコーリング: "wizard,warlock",
				クリエイトホムンクルス: "wizard",
				ウォールオヴウォーター: "wizard,sorcerer,druid",
				セレモニー: "paladin,cleric",
				ソウルケイジ: "wizard,warlock",
				スチールウィンドストライク: "wizard,ranger",
				エレメンタルベイン: "wizard,warlock,druid,artificer",
				メイルストロム: "druid",
				ライフトランスファランス: "wizard,cleric",
				チャームモンスター: "wizard,warlock,sorcerer,druid,bard",
				インヴェスティチャーオヴフレイム: "wizard,warlock,sorcerer,druid",
				カタパルト: "wizard,sorcerer,artificer",
				パワーワードペイン: "wizard,warlock,sorcerer",
				サモンレッサーデーモンズ: "wizard,warlock",
				サンダーステップ: "wizard,warlock,sorcerer",
				ワールウィンド: "wizard,sorcerer,druid",
				モールドアース: "wizard,sorcerer,druid",
				シックニングレイディアンス: "wizard,warlock,sorcerer",
				ストームスフィアー: "wizard,sorcerer",
				アイスナイフ: "wizard,sorcerer,druid",
				インヴェスティチャーオヴアイス: "wizard,warlock,sorcerer,druid",
				アブソーブエレメンツ: "wizard,sorcerer,ranger,druid,artificer",
				ヴィトリオリックスフィアー: "wizard,sorcerer",
				ドラゴンズブレス: "wizard,sorcerer",
				スニロックススノーボールスウォーム: "wizard,sorcerer",
				プライマルサヴェジリィ: "druid",
				メンタルプリズン: "wizard,warlock,sorcerer",
				ウォーディングウィンド: "wizard,sorcerer,druid,bard",
				トランスミュートロック: "wizard,druid,artificer",
				クリエイトボンファイアー: "wizard,warlock,sorcerer,druid,artificer",
				ラスオヴネイチャー: "ranger,druid",
				ドーン: "wizard,cleric",
				ディソナントウィスパーズ: "bard",
				ターシャズヒディアスラフター: "bard,wizard",
				アンティパシーシンパシー: "wizard,bard,druid",
				マインドスリヴァー: "wizard,warlock,sorcerer",
				ターシャズコースティックブリュー: "wizard,sorcerer,artificer",
				サモンビースト: "ranger,druid",
				ターシャズマインドウィップ: "wizard,sorcerer",
				インテレクトフォートレス: "wizard,warlock,sorcerer,bard,artificer",
				サモンアンデッド: "wizard,warlock",
				サモンシャドウスポーン: "wizard,warlock",
				サモンフェイ: "wizard,warlock,ranger,druid",
				スピリットシュラウド: "wizard,warlock,cleric,paladin",
				サモンアベレイション: "wizard,warlock",
				サモンエレメンタル: "wizard,ranger,druid",
				サモンコンストラクト: "wizard,artificer",
				サモンセレスチャル: "cleric,paladin",
				サモンフィーンド: "wizard,warlock",
				ターシャスアザーワールドリィガイズ: "wizard,warlock,sorcerer",
				ドリームオヴザブルーヴェイル: "wizard,warlock,sorcerer,bard",
				ブレードオヴディザスター: "wizard,warlock,sorcerer"
			};
		}
		return list;
	}

	static packList = {
		burglar: [
			"Burglar's Pack",
			"Backpack",
			"Ball Bearings",
			"String",
			"Bell",
			"Candle",
			"Crowbar",
			"Hammer",
			"Piton",
			"Hooded Lantern",
			"Oil Flask",
			"Rations",
			"Tinderbox",
			"Waterskin",
			"Hempen Rope (50 ft.)"
		],
		diplomat: [
			"Diplomat's Pack",
			"Chest",
			"Map or Scroll Case",
			"Fine Clothes",
			"Ink Bottle",
			"Ink Pen",
			"Lamp",
			"Oil Flask",
			"Paper",
			"Perfume",
			"Sealing Wax",
			"Soap"
		],
		dungeoneer: [
			"Dungeoneer's Pack",
			"Backpack",
			"Crowbar",
			"Hammer",
			"Piton",
			"Torch",
			"Tinderbox",
			"Rations",
			"Waterskin",
			"Hempen Rope (50 ft.)"
		],
		entertainer: [
			"Entertainer's Pack",
			"Backpack",
			"Bedroll",
			"Costume Clothes",
			"Candle",
			"Rations",
			"Waterskin",
			"Disguise Kit"
		],
		explorer: [
			"Explorer's Pack",
			"Backpack",
			"Bedroll",
			"Mess Kit",
			"Tinderbox",
			"Torch",
			"Rations",
			"Waterskin",
			"Hempen Rope (50 ft.)"
		],
		monsterhunter: [
			"Monster Hunter's Pack",
			"Chest",
			"Crowbar",
			"Hammer",
			"Wooden Stake",
			"Holy Symbol",
			"Flask of Holy Water",
			"Manacles",
			"Steel Mirror",
			"Oil Flask",
			"Tinderbox",
			"Torch"
		],
		priest: [
			"Priest's Pack",
			"Backpack",
			"Blanket",
			"Candle",
			"Tinderbox",
			"Alms Box",
			"Block of Incense",
			"Censor",
			"Vestments",
			"Rations",
			"Waterskin"
		],
		scholar: [
			"Scholar's Pack",
			"Backpack",
			"Book of Lore",
			"Ink Bottle",
			"Ink Pen",
			"Parchment",
			"Bag of Sand",
			"Small Knife"
		]
	};

	static subClasses = {
		artificer: ["Alchemist", "Gunsmith"],
		barbarian: [
			"Ancesstrial Guardian",
			"Battlerager",
			"Berserker",
			"Storm Herald",
			"Totem Warriro",
			"Zealot"
		],
		bard: ["Eloquence", "Glamour", "Lore", "Swords", "Valor", "Whispers"],
		cleric: [
			"Arcana",
			"Death",
			"Forge",
			"Grave",
			"Knowledge",
			"Life",
			"Light",
			"Nature",
			"Order",
			"Tempest",
			"Trickery",
			"War Domain"
		],
		druid: ["Dreams", "Land", "Moon", "Shepherd", "Spores"],
		fighter: [
			"Arcane Archer",
			"Battle Master",
			"Cavalier",
			"Champion",
			"Echo Knight",
			"Eldritch Knight",
			"Samurai"
		],
		monk: [
			"Drunken Master",
			"Four Elements",
			"Kensei",
			"Long Death",
			"Open Hand",
			"Shadow",
			"Sun Soul"
		],
		paladin: [
			"Ancients",
			"Conquest",
			"Crown",
			"Devotion",
			"Glory",
			"Oathbreaker",
			"Redemption",
			"Vengeance"
		],
		ranger: [
			"Beast Master",
			"Gloom Stalker",
			"Horizon Walker",
			"Hunter",
			"Monster Slayer"
		],
		rogue: [
			"Arcane Trickster",
			"Assassin",
			"Inquisitive",
			"Mastermind",
			"Scout",
			"Swashbuckler",
			"Thief"
		],
		sorcerer: ["Divine Soul", "Draconic", "Shadow", "Storm", "Wild"],
		warlock: [
			"Archfey",
			"Celestial",
			"Fiend",
			"Great Old One",
			"Hexblade",
			"Undying"
		],
		wizard: [
			"Abjuration",
			"Bladesinging",
			"Chronurgy",
			"Conjuration",
			"Divination",
			"Énchantment",
			"Evocation",
			"Graviturgy",
			"Illusion",
			"Necromancy",
			"Transmutation",
			"War Magic"
		]
	};
}

function registerSettings() {
	game.compendiumBrowser.readCompendiums = {
		loadedSpellCompendium: {},
		loadedNpcCompendium: {},
	};
	for (const compendium of game.packs) {
		if (compendium.documentName === "Item") {
			game.compendiumBrowser.readCompendiums.loadedSpellCompendium[compendium.collection] = {
				load: true,
				name: `${compendium.metadata.label} (${compendium.collection})`,
			};
		}
		if (compendium.documentName === "Actor") {
			game.compendiumBrowser.readCompendiums.loadedNpcCompendium[compendium.collection] = {
				load: true,
				name: `${compendium.metadata.label} (${compendium.collection})`,
			};
		}
	}
	// creating game setting container
	game.settings.register("compendium-browser", "settings", {
		name: "Compendium Browser Settings",
		hint: "Settings to exclude packs from loading and visibility of the browser",
		default: game.compendiumBrowser.readCompendiums,
		type: Object,
		scope: "world"
	});
	game.settings.register("compendium-browser", "maxload", {
		name: game.i18n.localize("CMPBrowser.SETTING.Maxload.NAME"),
		hint: game.i18n.localize("CMPBrowser.SETTING.Maxload.HINT"),
		scope: "world",
		config: true,
		default: 600,
		type: Number,
		range: {
			// If range is specified, the resulting setting will be a range slider
			min: 200,
			max: 2000,
			step: 100,
		},
	});
	game.settings.register("compendium-browser", "extraButtonsGlobal", {
		name: game.i18n.localize("CMPBrowser.SETTING.extraButtonsGlobal.NAME"),
		hint: game.i18n.localize("CMPBrowser.SETTING.extraButtonsGlobal.HINT"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register("compendium-browser", "extraSheetButtons", {
		name: game.i18n.localize("CMPBrowser.SETTING.extraSheetButtons.NAME"),
		hint: game.i18n.localize("CMPBrowser.SETTING.extraSheetButtons.HINT"),
		scope: "client",
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register("compendium-browser", "extraAdvancementButtons", {
		name: game.i18n.localize("CMPBrowser.SETTING.extraAdvancementButtons.NAME"),
		hint: game.i18n.localize("CMPBrowser.SETTING.extraAdvancementButtons.HINT"),
		scope: "client",
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register("compendium-browser", "bannersGlobal", {
		name: game.i18n.localize("CMPBrowser.SETTING.bannersGlobal.NAME"),
		hint: game.i18n.localize("CMPBrowser.SETTING.bannersGlobal.HINT"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});
	game.settings.register("compendium-browser", "bannersLocal", {
		name: game.i18n.localize("CMPBrowser.SETTING.bannersLocal.NAME"),
		hint: game.i18n.localize("CMPBrowser.SETTING.bannersLocal.HINT"),
		scope: "client",
		config: true,
		default: true,
		type: Boolean,
	});
}

const STOP_SEARCH = "StopSearchException";
const COMPENDIUM_BROWSER = "compendium-browser";

class CompendiumBrowser extends Application {
	constructor(options={}) {
		super(options);

		this.provider = new dnd5eProvider();

		// Reset the filters used in the dialog
		this.spellFilters = {
			registeredFilterCategories: {},
			activeFilters: {},
		};
		this.npcFilters = {
			registeredFilterCategories: {},
			activeFilters: {},
		};
		this.featFilters = {
			registeredFilterCategories: {},
			activeFilters: {},
		};
		this.itemFilters = {
			registeredFilterCategories: {},
			activeFilters: {},
		};
		this.changeTabs = null;
	}

	async setup() {
		await this.provider.getFilters();
		this.addSpellFilters();
		this.addFeatFilters();
		this.addItemFilters();
		this.addNpcFilters();
	}

	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			title: "CMPBrowser.compendiumBrowser",
			tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "spell" }],
			classes: [COMPENDIUM_BROWSER],
			template: "modules/compendium-browser/templates/template.html",
			width: 800,
			height: 730,
			resizable: true,
		});
	}

	get maxLoad() {
		return game.settings.get(COMPENDIUM_BROWSER, "maxload");
	}

	get settings() {
		const settings = game.settings.get(COMPENDIUM_BROWSER, "settings");
		settings.loadedSpellCompendium = Object.fromEntries(
			Object.entries(settings.loadedSpellCompendium)
				.filter(([key, data]) => game.compendiumBrowser.readCompendiums.loadedSpellCompendium[key])
		);
		settings.loadedNpcCompendium = Object.fromEntries(
			Object.entries(settings.loadedNpcCompendium)
				.filter(([key, data]) => game.compendiumBrowser.readCompendiums.loadedNpcCompendium[key])
		);
		return foundry.utils.mergeObject(game.compendiumBrowser.readCompendiums, settings);
	}

	/** @override */
	_onChangeTab(event, tabs, active) {
		super._onChangeTab(event, tabs, active);
		const html = this.element;
		this.replaceList(html, active, { reload: false });
	}

	/** @override */
	async getData() {
		return {
			items: [],
			npcs: [],
			spellFilters: this.spellFilters,
			showSpellBrowser: game.user.isGM || this.settings.allowSpellBrowser,
			featFilters: this.featFilters,
			showFeatBrowser: game.user.isGM || this.settings.allowFeatBrowser,
			itemFilters: this.itemFilters,
			showItemBrowser: game.user.isGM || this.settings.allowItemBrowser,
			npcFilters: this.npcFilters,
			showNpcBrowser: game.user.isGM || this.settings.allowNpcBrowser,
			settings: this.settings,
			isGM: game.user.isGM,
		};
	}

	_activateCoreListeners(html) {
		super._activateCoreListeners(html);
		if (this.changeTabs !== null) {
			const tabName = this.changeTabs.toString();
			if (tabName !== this._tabs[0].active) this._tabs[0].activate(tabName);
			this.changeTabs = null;
		}
	}

	activateItemListListeners(html) {
		// show entity sheet
		html.find(".item-edit").click((ev) => {
			let itemId = $(ev.currentTarget).parents("li").attr("data-entry-id");
			let compendium = $(ev.currentTarget).parents("li").attr("data-entry-compendium");
			let pack = game.packs.find((p) => p.collection === compendium);
			pack.getDocument(itemId).then((entity) => {
				entity.sheet.render(true);
			});
		});

		// make draggable
		// 0.4.1: Avoid the game.packs lookup
		html.find(".draggable").each((i, li) => {
			li.setAttribute("draggable", true);
			li.addEventListener(
				"dragstart",
				(event) => {
					let packName = li.getAttribute("data-entry-compendium");
					let pack = game.packs.find((p) => p.collection === packName);
					if (!pack) {
						event.preventDefault();
						return false;
					}
					event.dataTransfer.setData(
						"text/plain",
						JSON.stringify({
							type: pack.documentName,
							uuid: `Compendium.${pack.collection}.${li.getAttribute("data-entry-id")}`,
						})
					);
				},
				false
			);
		});
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		this.observer = new IntersectionObserver((entries, observer) => {
			for (let e of entries) {
				if (!e.isIntersecting) continue;
				const img = e.target;
				// Avatar image
				// const img = li.querySelector("img");
				if (img && img.dataset.src) {
					img.src = img.dataset.src;
					delete img.dataset.src;
				}

				// No longer observe the target
				observer.unobserve(e.target);
			}
		});

		this.activateItemListListeners(html);

		// toggle visibility of filter containers
		html.find(".filtercontainer h3, .multiselect label").click(async (ev) => {
			await $(ev.target.nextElementSibling).toggle(100);
		});
		html.find(".multiselect label").trigger("click");

		// sort spell list
		html.find(".spell-browser select[name=sortorder]").on("change", (ev) => {
			let spellList = html.find(".spell-browser li");
			let byName = ev.target.value === "true";
			let sortedList = this.sortSpells(spellList, byName);
			let ol = $(html.find(".spell-browser ul"));
			ol[0].innerHTML = [];
			for (let element of sortedList) {
				ol[0].append(element);
			}
		});

		// sort feat list in place
		html.find(".feat-browser select[name=sortorder]").on("change", (ev) => {
			let featList = html.find(".feat-browser li");
			let byName = ev.target.value === "true";
			let sortedList = this.sortFeats(featList, byName);
			let ol = $(html.find(".feat-browser ul"));
			ol[0].innerHTML = [];
			for (let element of sortedList) {
				ol[0].append(element);
			}
		});

		// sort item list in place
		html.find(".item-browser select[name=sortorder]").on("change", (ev) => {
			let itemList = html.find(".item-browser li");
			let byName = ev.target.value === "true";
			let sortedList = this.sortItems(itemList, byName);
			let ol = $(html.find(".item-browser ul"));
			ol[0].innerHTML = [];
			for (let element of sortedList) {
				ol[0].append(element);
			}
		});

		// sort npc list in place
		html.find(".npc-browser select[name=sortorder]").on("change", (ev) => {
			let npcList = html.find(".npc-browser li");
			let orderBy = ev.target.value;
			let sortedList = this.sortNpcs(npcList, orderBy);
			let ol = $(html.find(".npc-browser ul"));
			ol[0].innerHTML = [];
			for (let element of sortedList) {
				ol[0].append(element);
			}
		});

		for (let tab of ["spell", "feat", "item", "npc"]) {
			this.triggerSort(html, tab);
			// reset filters and re-render
			// 0.4.3: Reset ALL filters because when we do a re-render it affects all tabs
			html.find(`#reset-${tab}-filter`).click((ev) => {
				this.resetFilters();
				// v0.4.3: Re-render so that we display the filters correctly
				this.refreshList = tab;
				this.render();
			});
		}

		// settings
		html.find(".settings input").on("change", async (ev) => {
			const setting = ev.target.dataset.setting;
			const value = ev.target.checked;
			if (setting === "spell-compendium-setting") {
				const key = ev.target.dataset.key;
				const settings = foundry.utils.mergeObject(this.settings, {
					loadedSpellCompendium: {
						[key]: {
							load: value
						}
					}
				});
				await game.settings.set("compendium-browser", "settings", settings);
				// this.settings.loadedSpellCompendium[key].load = value;
				this.render();
				ui.notifications.info("Settings Saved. Item Compendiums are being reloaded.");
			} else if (setting === "npc-compendium-setting") {
				const key = ev.target.dataset.key;
				const settings = foundry.utils.mergeObject(this.settings, {
					loadedNpcCompendium: {
						[key]: {
							load: value
						}
					}
				});
				await game.settings.set("compendium-browser", "settings", settings);
				this.render();
				ui.notifications.info("Settings Saved. NPC Compendiums are being reloaded.");
			} else if (setting === "allow-spell-browser") {
				this.settings.allowSpellBrowser = value;
			} else if (setting === "allow-feat-browser") {
				this.settings.allowFeatBrowser = value;
			} else if (setting === "allow-item-browser") {
				this.settings.allowItemBrowser = value;
			} else if (setting === "allow-npc-browser") {
				this.settings.allowNpcBrowser = value;
			}
			game.settings.set(COMPENDIUM_BROWSER, "settings", this.settings);
		});

		// activating or deactivating filters
		// 0.4.1: Now does a re-load and updates just the data side
		// text filters
		html.find(".filter[data-type=text] input, .filter[data-type=text] select").on("keyup change paste", (ev) => {
			const path = $(ev.target).parents(".filter").data("path");
			const key = stripDotCharacters(path);
			const value = ev.target.value;
			const browserTab = $(ev.target).parents(".tab").data("tab");

			const filterTarget = `${browserTab}Filters`;

			if (value === "" || value === undefined) {
				delete this[filterTarget].activeFilters[key];
			} else {
				this[filterTarget].activeFilters[key] = {
					path: path,
					type: "text",
					valIsArray: false,
					value: ev.target.value,
				};
			}

			this.replaceList(html, browserTab);
		});

		// select filters
		html.find(".filter[data-type=select] select, .filter[data-type=bool] select").on("change", (ev) => {
			const path = $(ev.target).parents(".filter").data("path");
			const key = stripDotCharacters(path);
			const filterType = $(ev.target).parents(".filter").data("type");
			const browserTab = $(ev.target).parents(".tab").data("tab");
			let valIsArray = $(ev.target).parents(".filter").data("valisarray");
			if (valIsArray === "true") valIsArray = true;
			let value = ev.target.value;
			if (value === "false") value = false;
			if (value === "true") value = true;

			const filterTarget = `${browserTab}Filters`;

			if (value === "null") {
				delete this[filterTarget].activeFilters[key];
			} else {
				this[filterTarget].activeFilters[key] = {
					path: path,
					type: filterType,
					valIsArray: valIsArray,
					value: value,
				};
			}

			this.replaceList(html, browserTab);
		});

		// multiselect filters
		html.find(".filter[data-type=multiSelect] input").on("change", (ev) => {
			const path = $(ev.target).parents(".filter").data("path");
			const key = stripDotCharacters(path);
			const filterType = "multiSelect";
			const browserTab = $(ev.target).parents(".tab").data("tab");
			let valIsArray = $(ev.target).parents(".filter").data("valisarray");
			if (valIsArray === "true") valIsArray = true;
			let value = $(ev.target).data("value");

			const filterTarget = `${browserTab}Filters`;
			const filter = this[filterTarget].activeFilters[key];

			if (ev.target.checked === true) {
				if (filter === undefined) {
					this[filterTarget].activeFilters[key] = {
						path: path,
						type: filterType,
						valIsArray: valIsArray,
						values: [value],
					};
				} else {
					this[filterTarget].activeFilters[key].values.push(value);
				}
			} else {
				delete this[filterTarget].activeFilters[key].values.splice(
					this[filterTarget].activeFilters[key].values.indexOf(value),
					1
				);
				if (this[filterTarget].activeFilters[key].values.length === 0) {
					delete this[filterTarget].activeFilters[key];
				}
			}

			this.replaceList(html, browserTab);
		});

		html.find(".filter[data-type=numberCompare] select, .filter[data-type=numberCompare] input").on(
			"change keyup paste",
			(ev) => {
				const path = $(ev.target).parents(".filter").data("path");
				const key = stripDotCharacters(path);
				const filterType = "numberCompare";
				const browserTab = $(ev.target).parents(".tab").data("tab");
				let valIsArray = false;

				const operator = $(ev.target).parents(".filter").find("select").val();
				const value = $(ev.target).parents(".filter").find("input").val();

				const filterTarget = `${browserTab}Filters`;

				if (value === "" || operator === "null") {
					delete this[filterTarget].activeFilters[key];
				} else {
					this[filterTarget].activeFilters[key] = {
						path: path,
						type: filterType,
						valIsArray: valIsArray,
						operator: operator,
						value: value,
					};
				}

				this.replaceList(html, browserTab);
			}
		);

		// Just for the loading image
		if (this.observer) {
			html.find("img").each((i, img) => this.observer.observe(img));
		}
	}

	async checkListsLoaded() {
		// Provides extra info not in the standard SRD, like which classes can learn a spell
		if (!this.classList) {
			this.classList = dnd5eProvider.classList;
		}

		if (!this.packList) {
			this.packList = dnd5eProvider.packList;
		}

		if (!this.subClasses) {
			this.subClasses = dnd5eProvider.subClasses;
		}
	}

	async loadAndFilterItems(browserTab = "spell", updateLoading = null) {
		await this.checkListsLoaded();

		const seachNumber = Date.now();

		this.CurrentSeachNumber = seachNumber;

		// 0.4.1: Load and filter just one of spells, feats, and items (specified by browserTab)
		let numItemsLoaded = 0;
		let compactItems = {};

		try {
			// Filter the full list, but only save the core compendium information + displayed info
			for (let pack of game.packs) {
				if (pack.documentName === "Item" && this.settings.loadedSpellCompendium[pack?.collection]?.load) {
					// can query just for spells since there is only 1 type
					let query = {};
					switch (browserTab) {
						case "spell":
							query = { type: "spell" };
							break;
						case "feat":
							query = { type__in: ["feat", "class", "subclass", "background", "race"] };
							break;
						case "item":
							query = { type__in: ["consumable", "backpack", "equipment", "loot", "tool", "weapon"] };
							break;
					}

					// FIXME: How much could we do with the loaded index rather than all content?
					// OR filter the content up front for the decoratedItem.type??
					await pack.getDocuments(query).then((content) => {
						if (browserTab === "spell") {
							content.reduce(
								function (itemsList, item5e) {
									if (this.CurrentSeachNumber !== seachNumber) throw STOP_SEARCH;

									numItemsLoaded = Object.keys(itemsList).length;

									if (this.maxLoad <= numItemsLoaded) {
										if (updateLoading) {
											updateLoading(numItemsLoaded, true);
										}
										throw STOP_SEARCH;
									}

									const decoratedItem = this.decorateItem(item5e);

									if (
										decoratedItem
										&& this.passesFilter(decoratedItem, this.spellFilters.activeFilters)
									) {
										itemsList[item5e.id] = {
											compendium: pack.collection,
											name: decoratedItem.name,
											img: decoratedItem.img,
											data: {
												level: decoratedItem.level,
												properties: [...decoratedItem.properties]
													.reduce((obj, prop) => ({ ...obj, [prop]: true }), {}),
											},
											id: item5e.id,
										};
									}

									return itemsList;
								}.bind(this),
								compactItems
							);
						} else if (browserTab === "feat") {
							content.reduce(
								function (itemsList, item5e) {
									if (this.CurrentSeachNumber !== seachNumber) throw STOP_SEARCH;

									numItemsLoaded = Object.keys(itemsList).length;

									if (this.maxLoad <= numItemsLoaded) {
										if (updateLoading) {
											updateLoading(numItemsLoaded, true);
										}
										throw STOP_SEARCH;
									}

									const decoratedItem = this.decorateItem(item5e);

									if (
										decoratedItem
										&& this.passesFilter(decoratedItem, this.featFilters.activeFilters)
									) {
										itemsList[item5e.id] = {
											compendium: pack.collection,
											name: decoratedItem.name,
											img: decoratedItem.img,
											classRequirementString: decoratedItem.classRequirementString,
										};
									}

									return itemsList;
								}.bind(this),
								compactItems
							);
						} else if (browserTab === "item") {
							content.reduce(
								function (itemsList, item5e) {
									if (this.CurrentSeachNumber !== seachNumber) throw STOP_SEARCH;

									numItemsLoaded = Object.keys(itemsList).length;

									if (this.maxLoad <= numItemsLoaded) {
										if (updateLoading) {
											updateLoading(numItemsLoaded, true);
										}
										throw STOP_SEARCH;
									}

									const decoratedItem = this.decorateItem(item5e);

									if (
										decoratedItem
										&& this.passesFilter(decoratedItem, this.itemFilters.activeFilters)
									) {
										itemsList[item5e.id] = {
											compendium: pack.collection,
											name: decoratedItem.name,
											img: decoratedItem.img,
											type: decoratedItem.type,
										};
									}

									return itemsList;
								}.bind(this),
								compactItems
							);
						}

						numItemsLoaded = Object.keys(compactItems).length;
						if (updateLoading) {
							updateLoading(numItemsLoaded, false);
						}
					});
				} // end if pack entity === Item
			} // for packs
		} catch(e) {
			if (e === STOP_SEARCH) ; else {
				throw e;
			}
		}

		this.itemsLoaded = true;
		updateLoading(numItemsLoaded, true);
		return compactItems;
	}

	async loadAndFilterNpcs(updateLoading = null) {
		const seachNumber = Date.now();
		this.CurrentSeachNumber = seachNumber;

		let npcs = {};

		let numNpcsLoaded = 0;
		this.npcsLoaded = false;

		const indexFields = [
			...new Set(
				["name", "img", "system.details.cr", "system.traits.size", "system.details.type.value"].concat(
					Object.values(this.npcFilters.activeFilters).map((f) => f.path)
				)
			),
		];
		try {
			for (let pack of game.packs) {
				if (pack.documentName === "Actor" && this.settings.loadedNpcCompendium[pack.collection].load) {
					await pack.getIndex({ fields: indexFields }).then(async (content) => {
						content.reduce(
							function (actorsList, npc5e) {
								if (this.CurrentSeachNumber !== seachNumber) {
									throw STOP_SEARCH;
								}

								if (!npc5e.img) {
									npc5e.img = game.dnd5e.moduleArt.map.get(npc5e.uuid.replace(".Actor", ""))?.actor;
								}

								numNpcsLoaded = Object.keys(npcs).length;

								if (this.maxLoad <= numNpcsLoaded) {
									if (updateLoading) {
										updateLoading(numNpcsLoaded, true);
									}
									throw STOP_SEARCH;
								}
								if (npc5e.name !== "#[CF_tempEntity]") {
									const decoratedNpc = this.decorateNpc(npc5e, indexFields);
									if (
										decoratedNpc
										&& this.passesFilter(decoratedNpc, this.npcFilters.activeFilters)
									) {
										actorsList[npc5e._id] = {
											compendium: pack.collection,
											name: decoratedNpc.name,
											img: decoratedNpc.img,
											displayCR: decoratedNpc.displayCR,
											displaySize: decoratedNpc.displaySize,
											displayType: decoratedNpc.displayType,
											orderCR: decoratedNpc.orderCR,
											orderSize: decoratedNpc.filterSize,
										};
									}
								}
								return actorsList;
							}.bind(this),
							npcs
						);

						numNpcsLoaded = Object.keys(npcs).length;
						if (updateLoading) {
							updateLoading(numNpcsLoaded, false);
						}
					});
				}
				// 0.4.1 Only preload a limited number and fill more in as needed
			}
		} catch(e) {
			if (e === STOP_SEARCH) ; else {
				throw e;
			}
		}

		this.npcsLoaded = true;
		updateLoading(numNpcsLoaded, true);
		return npcs;
	}

	hookCompendiumList(html, sidebarName) {
		if (!game.user.isGM) {
			if (!this.settings.allowNpcBrowser && sidebarName === "actors") return;
			if (!this.settings.allowItemBrowser && sidebarName === "items") return;
			if (!(this.settings.allowSpellBrowser
				|| this.settings.allowNpcBrowser
				|| this.settings.allowFeatBrowser
				|| this.settings.allowItemBrowser)) return;
		}
		const cbButton = $(
			`<button class="compendium-browser-btn"><i class="fas fa-fire"></i> ${game.i18n.localize(
				"CMPBrowser.compendiumBrowser"
			)}</button>`
		);
		html.find(".compendium-browser-btn").remove();

		// adding to directory-list since the footer doesn't exist if the user is not gm
		html.find(".directory-footer").append(cbButton);

		if (sidebarName === "compendium") sidebarName = null;

		// Handle button clicks
		cbButton.click((ev) => {
			ev.preventDefault();
			this.resetFilters();

			if (sidebarName === "actors") {
				this.refreshList = "npc";
				this.changeTabs = "npc";
			} else if (sidebarName === "items") {
				this.refreshList = "item";
				this.changeTabs = "item";
			} else if (!this.refreshList) {
				if (game.user.isGM || this.settings.allowSpellBrowser) {
					this.refreshList = "spell";
				} else if (this.settings.allowFeatBrowser) {
					this.refreshList = "feat";
				} else if (this.settings.allowItemBrowser) {
					this.refreshList = "item";
				} else if (this.settings.allowNPCBrowser) {
					this.refreshList = "npc";
				}
			}
			this.render(true);
		});
	}

	/* Hook to load the first data */
	static afterRender(cb, html) {
		if (!cb?.refreshList) return;

		cb.replaceList(html, cb.refreshList);

		if (CompendiumBrowser.postRender) {
			CompendiumBrowser.postRender();
		}
	}

	resetFilters() {
		this.spellFilters.activeFilters = {};
		this.featFilters.activeFilters = {};
		this.itemFilters.activeFilters = {};
		this.npcFilters.activeFilters = {};
	}

	async replaceList(html, browserTab, options = { reload: true }) {
		// After rendering the first time or re-rendering trigger the load/reload of visible data

		let elements = null;
		// 0.4.2 Display a Loading... message while the data is being loaded and filtered
		let loadingMessage = null;
		const tabElements = {
			spell: { elements: "ul#CBSpells", message: "#CBSpellsMessage" },
			npc: { elements: "ul#CBNPCs", message: "#CBNpcsMessage" },
			feat: { elements: "ul#CBFeats", message: "#CBFeatsMessage" },
			item: { elements: "ul#CBItems", message: "#CBItemsMessage" },
		};

		if (browserTab in tabElements) {
			const tabInfo = tabElements[browserTab];
			elements = html.find(tabInfo.elements);
			loadingMessage = html.find(tabInfo.message);
			this.refreshList = browserTab;
		}

		if (elements?.length) {
			// 0.4.2b: On a tab-switch, only reload if there isn't any data already
			if (options?.reload || !elements[0].children.length) {
				const updateLoading = async (numLoaded, doneLoading) => {
					if (loadingMessage.length) {
						this.renderLoading(
							loadingMessage[0],
							browserTab,
							numLoaded,
							numLoaded >= this.maxLoad,
							doneLoading
						);
					}
				};
				updateLoading(0, false);
				// Uses loadAndFilterItems to read compendia for items which pass the current filters and render on this tab
				const newItemsHTML = await this.renderItemData(browserTab, updateLoading);
				elements[0].innerHTML = newItemsHTML;
				// Re-sort before setting up lazy loading
				this.triggerSort(html, browserTab);

				// Lazy load images
				if (this.observer) {
					$(elements)
						.find("img")
						.each((i, img) => this.observer.observe(img));
				}

				// Reactivate listeners for clicking and dragging
				this.activateItemListListeners($(elements));
			}
		}
	}

	async renderLoading(messageElement, itemType, numLoaded, maxLoaded = false, doneLoading = false) {
		if (!messageElement) return;

		let loadingHTML = await renderTemplate("modules/compendium-browser/templates/loading.html", {
			numLoaded: numLoaded,
			itemType: itemType,
			maxLoaded: maxLoaded,
			doneLoading: doneLoading,
		});
		messageElement.innerHTML = loadingHTML;
	}

	async renderItemData(browserTab, updateLoading = null) {
		let listItems;
		if (browserTab === "npc") {
			listItems = await this.loadAndFilterNpcs(updateLoading);
		} else {
			listItems = await this.loadAndFilterItems(browserTab, updateLoading);
		}
		const html = await renderTemplate(`modules/compendium-browser/templates/${browserTab}-browser-list.html`, {
			listItems: listItems,
		});

		return html;
	}

	// SORTING
	triggerSort(html, browserTab) {
		html.find(`.${browserTab}-browser select[name=sortorder]`).trigger("change");
	}

	sortSpells(list, byName) {
		list.sort((a, b) => {
			const aName = $(a).find(".item-name a")[0].innerHTML;
			const bName = $(b).find(".item-name a")[0].innerHTML;

			if (!byName) {
				const aLevel = $(a).find("input[name=level]").val();
				const bLevel = $(b).find("input[name=level]").val();
				const levelComparison = aLevel.localeCompare(bLevel);

				if (levelComparison !== 0) {
					return levelComparison;
				}
			}
			return aName.localeCompare(bName);
		});
		return list;
	}

	sortFeats(list, byName) {
		list.sort((a, b) => {
			const aName = $(a).find(".item-name a")[0].innerHTML;
			const bName = $(b).find(".item-name a")[0].innerHTML;

			if (!byName) {
				const aLevel = $(a).find("input[name=class]").val();
				const bLevel = $(b).find("input[name=class]").val();
				const levelComparison = aLevel.localeCompare(bLevel);

				if (levelComparison !== 0) {
					return levelComparison;
				}
			}
			return aName.localeCompare(bName);
		});
		return list;
	}

	sortItems(list, byName) {
		list.sort((a, b) => {
			const aName = $(a).find(".item-name a")[0].innerHTML;
			const bName = $(b).find(".item-name a")[0].innerHTML;

			if (!byName) {
				const aLevel = $(a).find("input[name=type]").val();
				const bLevel = $(b).find("input[name=type]").val();
				const levelComparison = aLevel.localeCompare(bLevel);

				if (levelComparison !== 0) {
					return levelComparison;
				}
			}
			return aName.localeCompare(bName);
		});
		return list;
	}

	sortNpcs(list, orderBy) {
		list.sort((a, b) => {
			const aName = $(a).find(".npc-name a")[0].innerHTML;
			const bName = $(b).find(".npc-name a")[0].innerHTML;

			if (orderBy === "cr") {
				const aLevel = Number($(a).find('input[name="order.cr"]').val());
				const bLevel = Number($(b).find('input[name="order.cr"]').val());
				if (aLevel !== bLevel) {
					return aLevel - bLevel;
				}
			} else if (orderBy === "size") {
				const aLevel = Number($(a).find('input[name="order.size"]').val());
				const bLevel = Number($(b).find('input[name="order.size"]').val());
				if (aLevel !== bLevel) {
					return aLevel - bLevel;
				}
			}
			return aName.localeCompare(bName);
		});
		return list;
	}

	decorateItem(item5e) {
		if (!item5e) return null;
		// Decorate and then filter a compendium entry - returns null or the item

		const item = { ...item5e };

		item.level = item5e.system?.level;
		item.properties = item5e.system?.properties;
		item.damage = item5e.system?.damage;
		item.classes = item5e.system?.classes;
		item.requirements = item5e.system?.requirements;
		// getting damage types (common to all Items, although some won't have any)
		item.damageTypes = [];

		if (item.damage && item.damage.parts.length > 0) {
			for (let part of item.damage.parts) {
				let type = part[1];
				if (item.damageTypes.indexOf(type) === -1) {
					item.damageTypes.push(type);
				}
			}
		}

		if (item.type === "spell") {
			const cleanSpellName = (item.originalName ?? item.name).slugify({replacement: "", strict: true});
			if (this.classList[cleanSpellName]) {
				let classes = this.classList[cleanSpellName];
				item.classes = classes.split(",");
			}
		} else if (item.type === "feat" || item.type === "class") {
			// getting class
			const matchedClass = [];
			const reqString = item.requirements?.replace(/\d/g, "").trim();
			if (reqString) {
				for (const classData of Object.values(this.provider.classes)) {
					const isClassMatch = classData.label.includes(reqString);
					const isSubclassMatch = !isClassMatch && Object.values(classData.subclasses).some(
						(label) => reqString.includes(label)
					);

					if (isClassMatch || isSubclassMatch) {
						matchedClass.push(classData.label);
					}
				}
			}
			item.classRequirement = matchedClass;
			item.classRequirementString = matchedClass.join(", ");

			// getting uses/ressources status
			item.usesResources = item5e.hasLimitedUses;
		} else if (item.type === "subclass") {
			item.classRequirement = [item.system.classIdentifier];
			item.classRequirementString = item.system.classIdentifier;
		} else {
			// getting pack
			let matchedPacks = [];
			for (let pack of Object.keys(this.packList)) {
				for (let packItem of this.packList[pack]) {
					if (item.name.toLowerCase() === packItem.toLowerCase()) {
						matchedPacks.push(pack);
						break;
					}
				}
			}
			item.matchedPacks = matchedPacks;
			item.matchedPacksString = matchedPacks.join(", ");

			// getting uses/ressources status
			item.usesResources = item5e.hasLimitedUses;
		}
		return item;
	}

	decorateNpc(npc, indexFields) {
		const decoratedNpc = indexFields.reduce((npcDict, item) => {
			set(npcDict, item, getPropByString(npc, item));
			return npcDict;
		}, {});

		let npcData = npc.system;

		// cr display
		let cr = npcData.details?.cr;
		if (cr === undefined || cr === "") {
			cr = 0;
		} else {
			cr = Number(cr);
		}

		decoratedNpc.orderCR = cr;

		if (cr > 0 && cr < 1) cr = `1/${1 / cr}`;
		decoratedNpc.displayCR = cr;

		decoratedNpc.displaySize = "unset";
		decoratedNpc.filterSize = 2;
		if (npcData.details) {
			decoratedNpc.displayType = this.getNPCType(npcData.details.type);
		} else {
			decoratedNpc.displayType = game.i18n.localize("CMPBrowser.Unknown") ?? "Unknown";
		}

		if (CONFIG.DND5E.actorSizes[npcData.traits.size] !== undefined) {
			decoratedNpc.displaySize = CONFIG.DND5E.actorSizes[npcData.traits.size].label;
		}
		let npcSize = npc.system.traits.size;
		switch (npcSize) {
			case "grg":
				decoratedNpc.filterSize = 5;
				break;
			case "huge":
				decoratedNpc.filterSize = 4;
				break;
			case "lg":
				decoratedNpc.filterSize = 3;
				break;
			case "sm":
				decoratedNpc.filterSize = 1;
				break;
			case "tiny":
				decoratedNpc.filterSize = 0;
				break;
			case "med":
			default:
				decoratedNpc.filterSize = 2;
				break;
		}
		return decoratedNpc;
	}

	getNPCType(type) {
		if (type instanceof Object) {
			return CONFIG.DND5E.creatureTypes?.[type.value]?.label ?? game.i18n.localize(type.value);
		}

		return type;
	}

	passesFilter(subject, filters) {
		for (let filter of Object.values(filters)) {
			let prop = getProperty(subject, filter.path);
			if (filter.type === "numberCompare") {
				switch (filter.operator) {
					case "=":
						if (prop !== filter.value) {
							return false;
						}
						break;
					case "<":
						if (prop >= filter.value) {
							return false;
						}
						break;
					case ">":
						if (prop <= filter.value) {
							return false;
						}
						break;
				}

				continue;
			}
			if (filter.valIsArray === false) {
				if (filter.type === "text") {
					if (prop === undefined) return false;
					if (prop.toLowerCase().indexOf(filter.value.toLowerCase()) === -1) {
						return false;
					}
				} else {
					if (prop === undefined) return false;
					if (
						filter.value !== undefined
						&& prop !== undefined
						&& prop !== filter.value
						&& !(filter.value === true && prop)
					) {
						return false;
					}
					if (filter.values && filter.values.indexOf(prop) === -1) {
						return false;
					}
				}
			} else {
				if (prop === undefined) return false;
				if (typeof prop === "object") {
					if (filter.value) {
						if (prop.indexOf(filter.value) === -1) {
							return false;
						}
					} else if (filter.values) {
						for (let val of filter.values) {
							if (prop.indexOf(val) !== -1) {
								continue;
							}
							return false;
						}
					}
				} else {
					for (let val of filter.values) {
						if (prop === val) {
							continue;
						}
					}
					return false;
				}
			}
		}

		return true;
	}

	// FILTERS - Added on the Ready hook
	// 0.4.0 Make this async so filters can be added all at once
	async addFilter(entityType, category, label, path, type, possibleValues = null, valIsArray = false) {
		let target = `${entityType}Filters`;
		let filter = {};
		filter.path = path;
		filter.labelId = stripSpecialCharacters(label);
		filter.label = game.i18n.localize(label) ?? label;
		filter.type = "text";
		if (["text", "bool", "select", "multiSelect", "numberCompare"].indexOf(type) !== -1) {
			filter[`is${type}`] = true;
			filter.type = type;
		}

		if (possibleValues !== null) {
			filter.possibleValueIds = possibleValues;

			filter.possibleValues = Object.fromEntries(
				Object.entries(possibleValues).map(([key, data]) => {
					if (typeof data === "string") return [key, game.i18n.localize(data) ?? data];
					return [key, data.label];
				})
			);
		}
		filter.valIsArray = valIsArray;

		let catId = stripSpecialCharacters(category);
		if (this[target].registeredFilterCategories[catId] === undefined) {
			this[target].registeredFilterCategories[catId] = {
				label: game.i18n.localize(category) ?? category,
				labelId: catId,
				filters: [],
			};
		}
		this[target].registeredFilterCategories[catId].filters.push(filter);
	}

	async addSpellFilters() {
		this.addSpellFilter("CMPBrowser.general", "DND5E.Source", "system.source.book", "text");
		this.addSpellFilter("CMPBrowser.general", "DND5E.Level", "system.level", "multiSelect", {
			0: "DND5E.SpellCantrip",
			1: "1",
			2: "2",
			3: "3",
			4: "4",
			5: "5",
			6: "6",
			7: "7",
			8: "8",
			9: "9",
		});
		this.addSpellFilter(
			"CMPBrowser.general",
			"DND5E.SpellSchool",
			"system.school",
			"select",
			this._sortPackValues(CONFIG.DND5E.spellSchools)
		);
		this.addSpellFilter("CMPBrowser.general", "CMPBrowser.castingTime", "system.activation.type", "select", {
			action: "DND5E.Action",
			bonus: "DND5E.BonusAction",
			reaction: "DND5E.Reaction",
			minute: "DND5E.TimeMinute",
			hour: "DND5E.TimeHour",
			day: "DND5E.TimeDay",
		});
		this.addSpellFilter(
			"CMPBrowser.general",
			"CMPBrowser.spellType",
			"system.actionType",
			"select",
			CONFIG.DND5E.itemActionTypes
		);
		this.addSpellFilter(
			"CMPBrowser.general",
			"CMPBrowser.damageType",
			"damageTypes",
			"select",
			this._sortPackValues(CONFIG.DND5E.damageTypes)
		);
		const classes = Object.fromEntries(
			Object.entries(this.provider.classes).map(([k, v]) => {
				return [k, v.label];
			})
		);
		this.addSpellFilter(
			"CMPBrowser.general",
			"ITEM.TypeClass",
			"classes",
			"select",
			this._sortPackValues(classes),
			true
		);
		this.addSpellFilter("DND5E.SpellComponents", "DND5E.Ritual", "system.properties.ritual", "bool");
		this.addSpellFilter("DND5E.SpellComponents", "DND5E.Concentration", "system.properties.concentration", "bool");
		this.addSpellFilter("DND5E.SpellComponents", "DND5E.ComponentVerbal", "system.properties.vocal", "bool");
		this.addSpellFilter("DND5E.SpellComponents", "DND5E.ComponentSomatic", "system.properties.somatic", "bool");
		this.addSpellFilter("DND5E.SpellComponents", "DND5E.ComponentMaterial", "system.properties.material", "bool");
	}

	async addItemFilters() {
		this.addItemFilter("CMPBrowser.general", "DND5E.Source", "system.source.book", "text");

		this.addItemFilter(
			"CMPBrowser.general",
			"Item Type",
			"type",
			"select",
			this._sortPackValues({
				consumable: "ITEM.TypeConsumable",
				backpack: "ITEM.TypeContainer",
				equipment: "ITEM.TypeEquipment",
				loot: "ITEM.TypeLoot",
				tool: "ITEM.TypeTool",
				weapon: "ITEM.TypeWeapon",
			})
		);

		this.addItemFilter(
			"CMPBrowser.general",
			"CMPBrowser.ItemsPacks",
			"matchedPacks",
			"select",
			this._sortPackValues({
				burglar: "CMPBrowser.ItemsPacksBurglar",
				diplomat: "CMPBrowser.ItemsPacksDiplomat",
				dungeoneer: "CMPBrowser.ItemsPacksDungeoneer",
				entertainer: "CMPBrowser.ItemsPacksEntertainer",
				explorer: "CMPBrowser.ItemsPacksExplorer",
				monsterhunter: "CMPBrowser.ItemsPacksMonsterHunter",
				priest: "CMPBrowser.ItemsPacksPriest",
				scholar: "CMPBrowser.ItemsPacksScholar",
			}),
			true
		);
		this.addItemFilter(
			"CMPBrowser.GameMechanics",
			"DND5E.ItemActivationCost",
			"system.activation.type",
			"select",
			CONFIG.DND5E.abilityActivationTypes
		);

		this.addItemFilter(
			"CMPBrowser.GameMechanics",
			"CMPBrowser.damageType",
			"damageTypes",
			"select",
			this._sortPackValues(CONFIG.DND5E.damageTypes)
		);
		this.addItemFilter("CMPBrowser.GameMechanics", "CMPBrowser.UsesResources", "usesResources", "bool");

		this.addItemFilter(
			"CMPBrowser.ItemSubtype",
			"ITEM.TypeWeapon",
			"system.weaponType",
			"text",
			CONFIG.DND5E.weaponTypes
		);
		this.addItemFilter(
			"CMPBrowser.ItemSubtype",
			"ITEM.TypeEquipment",
			"system.armor.type",
			"text",
			this._sortPackValues(CONFIG.DND5E.equipmentTypes)
		);
		this.addItemFilter(
			"CMPBrowser.ItemSubtype",
			"ITEM.TypeConsumable",
			"system.consumableType",
			"text",
			this._sortPackValues(CONFIG.DND5E.consumableTypes)
		);

		const rarities = Object.fromEntries(
			Object.entries(CONFIG.DND5E.itemRarity).map(([key, value]) => [
				value,
				game.i18n.localize(`DND5E.ItemRarity${key.capitalize()}`).titleCase()
			])
		);
		this.addItemFilter("CMPBrowser.MagicItems", "DND5E.Rarity", "system.rarity", "select", rarities);
	}

	async addFeatFilters() {
		// Feature Filters
		this.addFeatFilter("CMPBrowser.general", "DND5E.Source", "system.source.book", "text");
		const classes = Object.fromEntries(
			Object.entries(this.provider.classes).map(([k, v]) => {
				return [k, v.label];
			})
		);
		this.addFeatFilter(
			"CMPBrowser.general",
			"ITEM.TypeClass",
			"classRequirement",
			"select",
			this._sortPackValues(classes),
			true
		);

		this.addFeatFilter(
			"CMPBrowser.general",
			"CMPBrowser.overall",
			"type",
			"select",
			this._sortPackValues({
				class: "ITEM.TypeClass",
				feat: "ITEM.TypeFeat",
				subclass: "ITEM.TypeSubclass",
				background: "DND5E.Background",
				race: "DND5E.Race",
			}),
			false
		);

		this.addFeatFilter(
			"CMPBrowser.general",
			"DND5E.ItemFeatureType",
			"system.type.value",
			"select",
			this._sortPackValues(
				Object.keys(dnd5e.config.featureTypes).reduce(function (acc, current) {
					acc[current] = dnd5e.config.featureTypes[current].label;
					return acc;
				}, {})
			),
			false
		);

		this.addFeatFilter(
			"CMPBrowser.general",
			"CMPBrowser.subfeature",
			"system.type.subtype",
			"select",
			this._sortPackValues(dnd5e.config.featureTypes.class.subtypes)
		);

		this.addFeatFilter(
			"CMPBrowser.GameMechanics",
			"DND5E.ItemActivationCost",
			"system.activation.type",
			"select",
			CONFIG.DND5E.abilityActivationTypes
		);
		this.addFeatFilter(
			"CMPBrowser.GameMechanics",
			"CMPBrowser.damageType",
			"damageTypes",
			"select",
			this._sortPackValues(CONFIG.DND5E.damageTypes)
		);
		this.addFeatFilter("CMPBrowser.GameMechanics", "CMPBrowser.UsesResources", "usesResources", "bool");
	}

	_sortPackValues(packValue) {
		const sortable = Object.entries(packValue)
			.filter(([key, data]) => key !== undefined && data !== undefined)
			.map(([key, data]) => {
				if (typeof data === "string") return [key, game.i18n.localize(data)];
				return [key, data.label];
			})
			.sort((a, b) => a[1].localeCompare(b[1]));

		return sortable.reduce((acc, item) => {
			acc[item[0]] = item[1];
			return acc;
		}, {});
	}

	async addNpcFilters() {
		// NPC Filters

		this.addNpcFilter("CMPBrowser.general", "DND5E.Source", "system.details.source.book", "text");
		this.addNpcFilter("CMPBrowser.general", "DND5E.Size", "system.traits.size", "select", CONFIG.DND5E.actorSizes);

		this.addNpcFilter("CMPBrowser.general", "CMPBrowser.hasLegAct", "system.resources.legact.max", "bool");
		this.addNpcFilter("CMPBrowser.general", "CMPBrowser.hasLegRes", "system.resources.legres.max", "bool");
		this.addNpcFilter("CMPBrowser.general", "DND5E.ChallengeRating", "system.details.cr", "numberCompare");

		let npcDetailsPath = "system.details.type.value";

		this.addNpcFilter(
			"CMPBrowser.general",
			"DND5E.CreatureType",
			npcDetailsPath,
			"select",
			this._sortPackValues(CONFIG.DND5E.creatureTypes)
		);
		this.addNpcFilter("DND5E.Abilities", "DND5E.AbilityStr", "system.abilities.str.value", "numberCompare");
		this.addNpcFilter("DND5E.Abilities", "DND5E.AbilityDex", "system.abilities.dex.value", "numberCompare");
		this.addNpcFilter("DND5E.Abilities", "DND5E.AbilityCon", "system.abilities.con.value", "numberCompare");
		this.addNpcFilter("DND5E.Abilities", "DND5E.AbilityInt", "system.abilities.int.value", "numberCompare");
		this.addNpcFilter("DND5E.Abilities", "DND5E.AbilityWis", "system.abilities.wis.value", "numberCompare");
		this.addNpcFilter("DND5E.Abilities", "DND5E.AbilityCha", "system.abilities.cha.value", "numberCompare");

		const damageTypes = this._sortPackValues(CONFIG.DND5E.damageTypes);
		this.addNpcFilter(
			"CMPBrowser.dmgInteraction",
			"DND5E.DamImm",
			"system.traits.di.value",
			"multiSelect",
			damageTypes,
			true
		);
		this.addNpcFilter(
			"CMPBrowser.dmgInteraction",
			"DND5E.DamRes",
			"system.traits.dr.value",
			"multiSelect",
			damageTypes,
			true
		);
		this.addNpcFilter(
			"CMPBrowser.dmgInteraction",
			"DND5E.DamVuln",
			"system.traits.dv.value",
			"multiSelect",
			damageTypes,
			true
		);
		this.addNpcFilter(
			"CMPBrowser.dmgInteraction",
			"DND5E.ConImm",
			"system.traits.ci.value",
			"multiSelect",
			this._sortPackValues(CONFIG.DND5E.conditionTypes),
			true
		);
	}

	/**
	 * Used to add custom filters to the Spell-Browser
	 * @param {String} category - Title of the category
	 * @param {String} label - Title of the filter
	 * @param {String} path - path to the data that the filter uses. uses dotnotation. example: data.abilities.dex.value
	 * @param {String} type - type of filter
	 *                      possible filter:
	 *                          text:           will give a textinput (or use a select if possibleValues has values) to compare with the data. will use objectData.indexOf(searchedText) to enable partial matching
	 *                          bool:           will see if the data at the path exists and not false.
	 *                          select:         exactly matches the data with the chosen selector from possibleValues
	 *                          multiSelect:    enables selecting multiple values from possibleValues, any of witch has to match the objects data
	 *                          numberCompare:  gives the option to compare numerical values, either with =, < or the > operator
	 * @param {Boolean} possibleValues - predetermined values to choose from. needed for select and multiSelect, can be used in text filters
	 * @param {Boolean} valIsArray - if the objects data is an object use this. the filter will check each property in the object (not recursive). if no match is found, the object will be hidden
	 */
	addSpellFilter(category, label, path, type, possibleValues = null, valIsArray = false) {
		this.addFilter("spell", category, label, path, type, possibleValues, valIsArray);
	}

	/**
	 * Used to add custom filters to the Spell-Browser
	 * @param {String} category - Title of the category
	 * @param {String} label - Title of the filter
	 * @param {String} path - path to the data that the filter uses. uses dotnotation. example: data.abilities.dex.value
	 * @param {String} type - type of filter
	 *                      possible filter:
	 *                          text:           will give a textinput (or use a select if possibleValues has values) to compare with the data. will use objectData.indexOf(searchedText) to enable partial matching
	 *                          bool:           will see if the data at the path exists and not false.
	 *                          select:         exactly matches the data with the chosen selector from possibleValues
	 *                          multiSelect:    enables selecting multiple values from possibleValues, any of witch has to match the objects data
	 *                          numberCompare:  gives the option to compare numerical values, either with =, < or the > operator
	 * @param {Boolean} possibleValues - predetermined values to choose from. needed for select and multiSelect, can be used in text filters
	 * @param {Boolean} valIsArray - if the objects data is an object use this. the filter will check each property in the object (not recursive). if no match is found, the object will be hidden
	 */
	addNpcFilter(category, label, path, type, possibleValues = null, valIsArray = false) {
		this.addFilter("npc", category, label, path, type, possibleValues, valIsArray);
	}

	addFeatFilter(category, label, path, type, possibleValues = null, valIsArray = false) {
		this.addFilter("feat", category, label, path, type, possibleValues, valIsArray);
	}

	addItemFilter(category, label, path, type, possibleValues = null, valIsArray = false) {
		this.addFilter("item", category, label, path, type, possibleValues, valIsArray);
	}

	async renderWith(tab = "spell", filters = []) {
		// if there isn't a tab error out
		if (!this[`${tab}Filters`]) {
			ui.notifications.warn(`no tab by name ${tab}`);
			return;
		}

		this.resetFilters();

		this.refreshList = tab;

		let html = await this.render();

		let activateFilters = filters.reduce((acc, input) => {
			let filter = this.findFilter(tab, input.section, input.label);

			if (filter) {
				if (input.value) {
					filter.value = input.value;
				} else if (input.values) {
					filter.values = input.values;
				} else {
					ui.notifications.warn(`no value(s) in filter:${tab} ${input.section}, ${input.label}`);
				}

				acc[stripSpecialCharacters(filter.path)] = filter;
			} else {
				ui.notifications.warn(`filter not found: tab:${tab} ${input.section}, ${input.label}.`);
			}

			return acc;
		}, {});

		this[`${tab}Filters`].activeFilters = activateFilters;

		// wait for after the afterRender function to change tabs
		// this avoids some errors when initially opening the window
		CompendiumBrowser.postRender = async () => {
			CompendiumBrowser.postRender = () => {};

			await html.activateTab(tab);

			for (let input of filters) {
				let filter = this.findFilter(tab, input.section, input.label);

				if (!filter) {
					continue;
				}

				const typeMap = {
					select: "select",
					bool: "select",
					text: "input",
				};

				const stringFromInput = `div.tab.active #${input.section}-${stripDotCharacters(input.label)}`;
				if (filter.type in typeMap) {
					let component = html.element.find(
						`${stringFromInput} ${typeMap[filter.type]}`
					);

					component[0].value = input.value;
				} else if (filter.type === "multiSelect") {
					let components = html.element.find(stringFromInput);

					for (let v of input.values) {
						let c = components.find(`input[data-value=${v}]`);
						c.prop("checked", true);
					}
				} else {
					ui.notifications.warn("Unknown filter type?");
				}
			}
		};

		this.render(true);

		return this;
	}

	findFilter(type, category, label) {
		let target = `${type}Filters`;
		let catId = stripSpecialCharacters(category);

		if (!this[target].registeredFilterCategories[catId]) {
			return;
		}

		const labelStripped = stripDotCharacters(label);

		let filter = this[target].registeredFilterCategories[catId].filters.find((x) => x.labelId === labelStripped);

		if (!filter) {
			return;
		}

		return {
			path: filter.path,
			type: filter.type,
			valIsArray: filter.valIsArray,
		};
	}
}

Hooks.once("init", () => {
	game.compendiumBrowser = new CompendiumBrowser();
});

Hooks.once("init", async () => {
	await preloadTemplates();
});

Hooks.once("setup", () => {
	registerSettings();
});

Hooks.once("setup", async () => {
	await game.compendiumBrowser.setup();
});

Hooks.on("changeSidebarTab", (app) => {
	if (["actors", "items", "compendium"].includes(app.tabName)) {
		game.compendiumBrowser.hookCompendiumList(app.element, app.tabName);
	}
});
Hooks.on("renderSidebarTab", (app, html, data) => {
	if (["actors", "items", "compendium"].includes(app.tabName)) {
		game.compendiumBrowser.hookCompendiumList(html, app.tabName);
	}
});

function stripSpecialCharacters(str) {
	return str.replace(/\W/g, "");
}

function stripDotCharacters(str) {
	return str.replace(/\./g, "");
}

function set(obj, path, value) {
	let schema = obj; // a moving reference to internal objects within obj
	let pList = path.split(".");
	let len = pList.length;
	for (let i = 0; i < len - 1; i++) {
		let elem = pList[i];
		if (!schema[elem]) schema[elem] = {};
		schema = schema[elem];
	}

	schema[pList[len - 1]] = value;
}

function getPropByString(obj, propString) {
	if (!propString) return obj;

	const props = propString.split(".");
	let result = obj;

	for (const prop of props) {
		if (result !== undefined) {
			result = result[prop];
		} else {
			break;
		}
	}
	return result;
}

Hooks.on("renderCompendiumBrowser", CompendiumBrowser.afterRender);
//# sourceMappingURL=compendium-browser.js.map
