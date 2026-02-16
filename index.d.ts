/**
Error thrown when a required permission is not granted.
*/
export class PermissionError extends Error {
	/**
	The permission scope that was denied.
	*/
	scope: string;

	/**
	The optional reference (e.g., file path, URL).
	*/
	reference: string | undefined;

	/**
	@param scope - The permission scope that was denied.
	@param reference - The optional reference.
	*/
	constructor(scope: string, reference?: string);
}

/**
Check if the current process has a given permission.

Returns `true` if the Permission Model is not enabled.

@param scope - The permission scope to check (e.g., `'fs.read'`, `'fs.write'`, `'child'`, `'worker'`).
@param reference - An optional reference (e.g., a file path or URL).
@returns Whether the permission is granted.

@example
```
import hasPermission from 'has-permission';

hasPermission('fs.read');
//=> true (when Permission Model is not enabled)

hasPermission('fs.read', '/etc/passwd');
//=> true (when Permission Model is not enabled)
```
*/
export default function hasPermission(scope: string, reference?: string): boolean;

/**
Assert that the current process has a given permission. Throws a `PermissionError` if denied.

@param scope - The permission scope to check.
@param reference - An optional reference.
@throws {PermissionError} If the permission is denied.

@example
```
import {assertPermission} from 'has-permission';

assertPermission('fs.read', '/tmp');
// No error thrown when Permission Model is not enabled
```
*/
export function assertPermission(scope: string, reference?: string): void;
