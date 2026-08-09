<div align="center">
  <img src="docs/assets/logo.svg" alt="has-permission — Check and assert Node.js Permission Model permissions at runtime" width="720">
</div>

<p align="center"><strong>Check and assert Node.js Permission Model permissions at runtime</strong></p>

<p align="center">
  <a href="https://github.com/mstuart/has-permission/actions/workflows/main.yml"><img src="https://github.com/mstuart/has-permission/actions/workflows/main.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://www.npmjs.com/package/has-permission"><img src="https://img.shields.io/npm/v/has-permission?label=npm" alt="npm"></a>
  <a href="https://deepwiki.com/mstuart/has-permission"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
  <a href="https://socket.dev/npm/package/has-permission"><img src="https://socket.dev/api/badge/npm/package/has-permission" alt="Socket"></a>
  <img src="https://img.shields.io/badge/node-%E2%89%A520-339933.svg" alt="Node 20+">
</p>

---
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
