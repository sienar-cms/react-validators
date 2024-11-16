import type { FormValueValidator } from '@sienar/react-utils';

/**
 * Creates a validator that expects the input value to have the specified minimum string length
 *
 * @param min The minimum length of the string
 * @param message The message to render if the validation fails
 */
export function minLength(min: number, message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must be at least %min characters.',
		isValid: input => {
			if (!input) return null;
			return input.length >= min
		},
		replacementValues: { min }
	};
}

/**
 * Creates a validator that expects the input value to have the specified maximum string length
 *
 * @param max The maximum length of the string
 * @param message The message to render if the validation fails
 */
export function maxLength(max: number, message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must be no longer than %max characters.',
		isValid: input => {
			if (!input) return null;
			return input.length <= max
		},
		replacementValues: { max }
	};
}

/**
 * Creates a validator that expects the input value to match another input value
 *
 * @param otherName The <code>&lt;input name='...'&gt;</code> name of the input to match against
 * @param message The message to render if the validation fails
 */
export function matches(otherName: string, message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must match %otherName.',
		isValid: (input, formValues) => {
			if (!input) return null;
			return input === formValues[otherName].value;
		},
		replacementValues: {
			otherName: values => values[otherName].displayName ?? otherName
		}
	}
}

/**
 * Creates a validator that expects the input value to be an email address
 *
 * @param message The message to render if the validation fails
 */
export function isEmail(message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must be a valid email address.',
		isValid: input => {
			if (!input) return null;
			return /^\S+@\S+\.\S+$/.test(input);
		}
	}
}

/**
 * Creates a validator that expects the input value to match the given regular expression
 *
 * @param test The regular expression used to test the input value
 * @param message The message to render if the validation fails
 */
export function matchesRegex(test: RegExp, message: string) :FormValueValidator<string> {
	return {
		message,
		isValid: input => {
			if (!input) return null;
			return test.test(input);
		}
	}
}

/**
 * Creates a validator that expects the input value to contain at least one special character
 */
export function containsSpecialCharacter(): FormValueValidator<string> {
	return matchesRegex(/[\W_]/, '%name must contain at least one special character.');
}

/**
 * Creates a validator that expects the input value to contain at least one number
 */
export function containsNumber(): FormValueValidator<string> {
	return matchesRegex(/\d/, '%name must contain at least one number.');
}

/**
 * Creates a validator that expects the input value to contain at least one uppercase letter
 */
export function containsUpper(): FormValueValidator<string> {
	return matchesRegex(/[A-Z]/, '%name must contain at least one uppercase letter.');
}

/**
 * Creates a validator that expects the input value to contain at least one lowercase letter
 */
export function containsLower(): FormValueValidator<string> {
	return matchesRegex(/[a-z]/, '%name must contain at least one lowercase letter.');
}
