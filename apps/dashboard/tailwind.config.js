const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
	content: createGlobPatternsForDependencies(__dirname),
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					'--btn-text-case': 'none',
				},
			},
		],
	},
};
