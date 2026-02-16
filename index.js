import process from 'node:process';

/**
Error thrown when a required permission is not granted.
*/
export class PermissionError extends Error {
	/**
	@param {string} scope - The permission scope that was denied.
	@param {string} [reference] - The optional reference (e.g., file path, URL).
	*/
	constructor(scope, reference) {
		const message = reference
			? `Permission denied: ${scope} for '${reference}'`
			: `Permission denied: ${scope}`;

		super(message);
		this.name = 'PermissionError';

		/** @type {string} The permission scope that was denied. */
		this.scope = scope;

		/** @type {string | undefined} The optional reference. */
		this.reference = reference;
	}
}

/**
Check if the current process has a given permission.

Returns `true` if the Permission Model is not enabled.

@param {string} scope - The permission scope to check (e.g., `'fs.read'`, `'fs.write'`, `'child'`, `'worker'`).
@param {string} [reference] - An optional reference (e.g., a file path or URL).
@returns {boolean} Whether the permission is granted.
*/
export default function hasPermission(scope, reference) {
	if (typeof scope !== 'string') {
		throw new TypeError('Expected `scope` to be a string');
	}

	return process.permission?.has(scope, reference) ?? true;
}

/**
Assert that the current process has a given permission. Throws a `PermissionError` if denied.

@param {string} scope - The permission scope to check.
@param {string} [reference] - An optional reference.
@throws {PermissionError} If the permission is denied.
*/
export function assertPermission(scope, reference) {
	if (!hasPermission(scope, reference)) {
		throw new PermissionError(scope, reference);
	}
}
