# has-permission

> Check and assert Node.js Permission Model permissions at runtime

## Install

```sh
npm install has-permission
```

## Usage

```js
import hasPermission, {assertPermission, PermissionError} from 'has-permission';

// Check if file system read is allowed
if (hasPermission('fs.read', '/tmp')) {
	console.log('Can read /tmp');
}

// Assert a permission or throw
assertPermission('fs.write', '/var/log');

// Catch permission errors
try {
	assertPermission('child');
} catch (error) {
	if (error instanceof PermissionError) {
		console.log(error.scope); // 'child'
	}
}
```

## API

### hasPermission(scope, reference?)

Returns `true` if the permission is granted, or if the [Permission Model](https://nodejs.org/api/permissions.html#permission-model) is not enabled.

#### scope

Type: `string`

The permission scope to check (e.g., `'fs.read'`, `'fs.write'`, `'child'`, `'worker'`).

#### reference

Type: `string`

An optional reference (e.g., a file path or URL).

### assertPermission(scope, reference?)

Throws a `PermissionError` if the permission is denied. No-op if the Permission Model is not enabled.

#### scope

Type: `string`

The permission scope to check.

#### reference

Type: `string`

An optional reference.

### PermissionError

Error thrown when a required permission is not granted.

#### .scope

Type: `string`

The permission scope that was denied.

#### .reference

Type: `string | undefined`

The optional reference.

## Related

- [Node.js Permission Model](https://nodejs.org/api/permissions.html#permission-model) - Node.js built-in Permission Model

## License

MIT
