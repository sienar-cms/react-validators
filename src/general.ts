import type { FormValueValidator } from '@sienar/react-utils';

/**
 * Creates a validator that expects the input value to be truthy
 *
 * @param message The message to render if the validation fails
 */
export function required(message?: string): FormValueValidator<any> {
	return {
		message: message || '%name is required.',
		isValid: input => {
			// Damn you, JavaScript. You and your 'truthiness'
			if (typeof input === 'number' && input === 0) return true;

			if (Array.isArray(input) && input.length === 0) return false;

			// Bless you, JavaScript. You and your 'truthiness'
			return !!input;
		}
	};
}
