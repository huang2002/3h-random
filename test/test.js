const Random = require('../');

console.log(`Random.seed              ${Random.seed}`);

console.log(`Random.float()           ${Random.float()}`);
console.log(`Random.float(0, 5)       ${Random.float(0, 5)}`);
console.log(`Random.int()             ${Random.int()}`);
console.log(`Random.int(0, 5)         ${Random.int(0, 5)}`);
console.log(`Random.boolean()         ${Random.boolean()}`);
console.log(`Random.string()          ${Random.string()}`);
console.log(`Random.string(32)        ${Random.string(32)}`);
console.log(`Random.string(32, false) ${Random.string(32, false)}`);

Random.reset();
console.log('Reset.');
console.log(`Random.float()           ${Random.float()}`);
console.log(`Random.float(0, 5)       ${Random.float(0, 5)}`);

Random.reset(20021011);
console.log(`Reset with seed ${Random.seed}.`);

console.log(`Random.float()           ${Random.float()}`);
console.log(`Random.int()             ${Random.int()}`);
console.log(`Random.boolean()         ${Random.boolean()}`);
console.log(`Random.string()          ${Random.string()}`);
