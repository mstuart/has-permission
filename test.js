import test from 'ava';
import hasPermission, {assertPermission, PermissionError} from './index.js';

// hasPermission tests (without --permission flag, always returns true)

test('hasPermission returns true for fs.read in normal Node.js', t => {
	t.true(hasPermission('fs.read'));
});

test('hasPermission returns true for fs.write in normal Node.js', t => {
	t.true(hasPermission('fs.write'));
});

test('hasPermission returns true for child in normal Node.js', t => {
	t.true(hasPermission('child'));
});

test('hasPermission returns true for worker in normal Node.js', t => {
	t.true(hasPermission('worker'));
});

test('hasPermission returns true with reference in normal Node.js', t => {
	t.true(hasPermission('fs.read', '/tmp'));
});

test('hasPermission throws TypeError for non-string scope', t => {
	t.throws(() => hasPermission(123), {
		instanceOf: TypeError,
		message: 'Expected `scope` to be a string',
	});
});

test('hasPermission throws TypeError for null scope', t => {
	t.throws(() => hasPermission(null), {
		instanceOf: TypeError,
	});
});

test('hasPermission throws TypeError for undefined scope', t => {
	t.throws(() => hasPermission(undefined), {
		instanceOf: TypeError,
	});
});

test('hasPermission throws TypeError for boolean scope', t => {
	t.throws(() => hasPermission(true), {
		instanceOf: TypeError,
	});
});

test('hasPermission throws TypeError for object scope', t => {
	t.throws(() => hasPermission({}), {
		instanceOf: TypeError,
	});
});

// assertPermission tests

test('assertPermission does not throw in normal Node.js', t => {
	t.notThrows(() => assertPermission('fs.read'));
});

test('assertPermission does not throw with reference in normal Node.js', t => {
	t.notThrows(() => assertPermission('fs.read', '/tmp'));
});

test('assertPermission propagates TypeError for invalid scope', t => {
	t.throws(() => assertPermission(42), {
		instanceOf: TypeError,
	});
});

// PermissionError tests

test('PermissionError has correct name', t => {
	const error = new PermissionError('fs.read');
	t.is(error.name, 'PermissionError');
});

test('PermissionError has correct scope', t => {
	const error = new PermissionError('fs.read');
	t.is(error.scope, 'fs.read');
});

test('PermissionError has correct reference', t => {
	const error = new PermissionError('fs.read', '/etc/passwd');
	t.is(error.reference, '/etc/passwd');
});

test('PermissionError reference is undefined when not provided', t => {
	const error = new PermissionError('fs.read');
	t.is(error.reference, undefined);
});

test('PermissionError message includes scope', t => {
	const error = new PermissionError('fs.read');
	t.is(error.message, 'Permission denied: fs.read');
});

test('PermissionError message includes scope and reference', t => {
	const error = new PermissionError('fs.read', '/etc/passwd');
	t.is(error.message, "Permission denied: fs.read for '/etc/passwd'");
});

test('PermissionError is an instance of Error', t => {
	const error = new PermissionError('fs.read');
	t.true(error instanceof Error);
});

test('PermissionError is an instance of PermissionError', t => {
	const error = new PermissionError('child');
	t.true(error instanceof PermissionError);
});

test('PermissionError has a stack trace', t => {
	const error = new PermissionError('fs.write');
	t.truthy(error.stack);
});
