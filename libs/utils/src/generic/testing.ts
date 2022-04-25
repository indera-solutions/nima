export function getTestText(characters?: number) {
	const originalTest = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar quis est id ornare. Nulla facilisi. Suspendisse potenti. Morbi hendrerit convallis diam, eget semper ante sagittis ac. Maecenas ligula eros, blandit sed quam et, dictum tristique mi. Proin dignissim quam quis elit lacinia imperdiet. Donec tristique commodo quam, nec auctor metus vehicula at. Donec molestie dolor eu neque efficitur posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean scelerisque, libero at posuere dignissim, ipsum nunc pharetra eros, at efficitur justo metus non ligula. Sed velit urna, sodales vel rhoncus in, ornare et nisl. Vestibulum volutpat lacus diam. Suspendisse eget mauris eget justo vulputate ornare nec id nisl. Aliquam in varius magna, a vulputate dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla ac ipsum eu lorem ornare semper at vel ante.';
	let finalTest = '';

	if ( characters === undefined ) return originalTest;

	for ( let i = 0; i < Math.floor(characters / originalTest.length); i++ ) {
		finalTest = finalTest + originalTest;
	}
	finalTest = finalTest + originalTest.substring(0, characters % originalTest.length);
	return finalTest;
}



