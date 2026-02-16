import {expectType, expectError} from 'tsd';
import hasPermission, {assertPermission, PermissionError} from './index.js';

// HasPermission
expectType<boolean>(hasPermission('fs.read'));
expectType<boolean>(hasPermission('fs.read', '/tmp'));
expectType<boolean>(hasPermission('fs.write', '/var/log'));

// AssertPermission
expectType<void>(assertPermission('fs.read'));
expectType<void>(assertPermission('fs.read', '/tmp'));

// PermissionError
const error = new PermissionError('fs.read', '/etc/passwd');
expectType<PermissionError>(error);
expectType<string>(error.scope);
expectType<string | undefined>(error.reference);
expectType<string>(error.message);

const errorNoReference = new PermissionError('child');
expectType<string | undefined>(errorNoReference.reference);

// Invalid usage
expectError(hasPermission(123));
expectError(hasPermission());
expectError(assertPermission(123));
expectError(assertPermission());
