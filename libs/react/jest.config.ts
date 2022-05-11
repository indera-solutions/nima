module.exports = {
	displayName: 'react',

	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/react',
	preset: '../../jest.preset.ts',
};
