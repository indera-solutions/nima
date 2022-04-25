const emailRegEx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegEx = new RegExp(/^(?=.*[A-Z]).{6,}$/);
const sixCodeDigits = new RegExp(/^(\d(\s+)?){6}$/);
const zipCodeDigits = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
const onlyNumbers = new RegExp(/^[0-9]*$/);
export const REGEX = {
	email: emailRegEx,
	password: passwordRegEx,
	code: sixCodeDigits,
	zipCode: zipCodeDigits,
	onlyNumbers: onlyNumbers,
};

export function isEmailValid(email: string) {
	return REGEX.email.test(email);
}

export function isPasswordAcceptable(password: string) {
	return REGEX.password.test(password);
}

export function isZipCodeValid(zipCode: string) {
	return REGEX.zipCode.test(zipCode);
}

export function isNumberValid(number: string) {
	return REGEX.onlyNumbers.test(number);
}

export function isSixCodeDigit(code: string) {
	return REGEX.code.test(code);
}
