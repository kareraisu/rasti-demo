app.extend({

	themes : {

	    blue : {
	        font : 'normal 14px sans-serif',
	        palette : {
	            light  : '#B5C1E2',
	            mid    : '#445288',
	            dark   : '#263256',
	            detail : '#C94C40',
	        },
	    },

	    green : {
	        font : 'normal 14px fantasy',
	        palette : {
	            light  : '#E0DEDE',
	            mid    : '#436F6E',
	            dark   : '#1D3638',
	            detail : '#DFD665',
	        },
	    },

	    red : {
	        font : 'normal 14px sans-serif',
	        palette : {
	            light  : '#C04542',
	            mid    : '#7C1E1A',
	            dark   : '#4B1817',
	            detail : '#DDCB41',
	        },
	    },

	},

	langs : {

		en : {
			welcome  : 'rasti.js demo app',
			username : 'user name',
			pass     : 'password',
			error_login : 'user or password incorrect',
			login    : 'log in',
			logout   : 'log out',
			main     : 'main',
			filters  : 'filters',
			personal : 'personal',
			name     : 'name',
			work     : 'work',
			skills   : 'skills',
			reqdata  : 'request data',
			search   : 'search',
			results  : 'results',
			config   : 'config',
			lang     : 'language',
			theme    : 'theme',
			variant  : 'variant',
			about    : 'about',
			info	 : 'This is a simple demo app to show the main features of rasti.js. Check out the source code for tips, or go to the docs for all the details.',
			features : 'features',
			some_feats : 'These are some of the feats that this demo app uses',
			numbers  : 'numbers',
			less_is_more : 'Here are some numbers that attest the power of rasti.js. Because less time coding is more time... doing sth else, idk :P',
			dont_forget : "Don't forget to ",
			things   : 'give it a star in github, tell your geek friends about rasti.js, get some air, do the laundry'
		},

		es : {
			welcome  : 'demo de rasti.js',
			username : 'usuario',
			pass     : 'contraseña',
			error_login : 'usuario o contraseña incorrectos',
			login    : 'acceder',
			logout   : 'salir',
			main     : 'principal',
			filters  : 'filtros',
			personal : 'personal',
			name     : 'nombre',
			work     : 'trabajo',
			skills   : 'habilidades',
			reqdata  : 'datos',
			search   : 'buscar',
			results  : 'resultados',
			config   : 'configuración',
			lang     : 'idioma',
			theme    : 'tema',
			variant  : 'variante',
			about    : 'acerca de',
			info	 : 'Esta es una simple app para mostrar las principales características de rasti.js. Mira el cóodigo fuente para pistas, o ve a la documentación para todos los detalles.',
			features : 'características',
			some_feats : 'Estas son algunas de las características que usa esta app:',
			numbers  : 'números',
			less_is_more : 'Algunos números que atestigüan el poder de rasti.js (no me crees? mira el código fuente!). Porque menos tiempo codeando es más tiempo... haciendo otra cosa, qué se yo :P',
			dont_forget : 'No olvides ',
			things   : 'darle like en github, contarle a tus amigos geeks sobre rasti.js, tomar sol, lavar la ropa'
		},

	},

	methods : {

	    applyTheme : el => {
			const {theme, map} = app.props
	        if (theme && map) app.setTheme(theme +' '+ map)
	    },

	},
})


app.extend({
	data : {
		lang : Object.keys(app.langs),
		theme : Object.keys(app.themes),
		themeMaps : Object.keys(app.themeMaps),
	},
})

