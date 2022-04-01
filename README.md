# 3h-random

> A randomizer lib.

## Usage

```javascript
/**
 * Employ one of the following to import this lib
 * or access the global namespace `HRandom` directly
 * if you are using it as a UMD module.
 * - import HRandom from '3h-random';
 * - const HRandom = require('3h-random');
 */

const randomizer = new HRandom.Randomizer({
    // seed: ...
    // cursor: ...
    // m: ...
    // a: ...
    // b: ...
});

console.log(randomizer.float(0, 1));
console.log(randomizer.integer(0, 100));

randomizer.reset(seed, cursor);

console.log(randomizer.boolean(0.5));
console.log(randomizer.string(16));
console.log(randomizer.choice(choices));
```

## Links

- [API Reference](https://github.com/huang2002/3h-random/wiki)
- [Changelog](./CHANGELOG.md)
- [License (MIT)](./LICENSE)
