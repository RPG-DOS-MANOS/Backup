Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'call-of-cthulhu-7th-babele-pt-BR',
			lang: 'pt-BR',
			dir: 'compendium'
		});
		
		
		
	}
});
