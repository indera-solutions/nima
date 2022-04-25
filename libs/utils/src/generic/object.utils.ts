export const removeUndefinedProperties = (obj: any) => {
	Object.keys(obj).forEach((key) =>
		obj[key] === undefined ? delete obj[key] : {},
	);
};
