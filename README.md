# 3h-random

A seedable randomizer.

# Usage

This lib can be used in both node environment and browser environment. `dist/index(.min).js` defines an es module, and `dist/index.umd(.min).js` defines a umd module.

# Example

```javascript
// The export object itself is an instance
// of Randomizer which is seeded by Date.now().
console.log(Random.float());
// You can create your own randomizer via the
// exported constructor.
const randomizer = new Random.Randomizer(seed);
```

# APIs

- Randomizer
    - `seed` *number* - The seed of the randomizer.
    - `cursor` *number* - The cursor.
    - `float(min = 0, max = 1)` *number* - Get a random float in (min, max).
    - `int(min = 1, max = 100)` *number* - Get an random integer in [min, max].
    - `boolean()` *boolean* - Get a random boolean value.
    - `string(radix = 16, upperCase = true)` *string* - Get a random string.
    - `reset(seed?: number)` *this* - Reset the randomizer.
