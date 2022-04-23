const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const path = require('path');

module.exports = {
	content: [
		...createGlobPatternsForDependencies(__dirname),
		path.join(__dirname, '/**/!(*.stories|*.spec).{tsx,jsx,js,html}'),
	],
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
