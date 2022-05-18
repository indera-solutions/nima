// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	onDemandEntries: {
		// period (in ms) where the server will keep pages in the buffer
		maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
		// number of pages that should be kept simultaneously without being disposed
		pagesBufferLength: 100,
	},
	images: {
		domains: ['loom-cdn.indera.gr'],
	},
	publicRuntimeConfig: {
		basePath: process.env.BASE_PATH,
	},
};

module.exports = withNx(nextConfig);
