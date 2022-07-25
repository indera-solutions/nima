export const removeUndefinedProperties = (obj: any) => {
	Object.keys(obj).forEach((key) =>
		obj[key] === undefined ? delete obj[key] : {},
	);
};

export const deepEqual = function (x: any, y: any) {
	if ( x === y ) {
		return true;
	} else if ( (typeof x == 'object' && x != null) && (typeof y == 'object' && y != null) ) {
		if ( Object.keys(x).length != Object.keys(y).length )
			return false;

		for ( const prop in x ) {
			// eslint-disable-next-line no-prototype-builtins
			if ( y.hasOwnProperty(prop) ) {
				if ( !deepEqual(x[prop], y[prop]) )
					return false;
			} else
				return false;
		}

		return true;
	} else
		return false;
};

export async function runAsyncObject(input: { [k: string]: Promise<any> }): Promise<{ [k: string]: any }> {
	const promisedProperties = [];
	const objectKeys = Object.keys(input);

	objectKeys.forEach((key) => promisedProperties.push(input[key]));

	return Promise.all(promisedProperties)
				  .then((resolvedValues) => {
					  return resolvedValues.reduce((resolvedObject, property, index) => {
						  resolvedObject[objectKeys[index]] = property;
						  return resolvedObject;
					  }, input);
				  });

}
