# Intrinsic Functions

SimpleSteps maps all 18 ASL intrinsic functions to TypeScript. Each can be used either as an explicit `Steps.*` method or via a natural JavaScript equivalent.

## Summary

| ASL Intrinsic | `Steps.*` Method | JS Equivalent |
|---|---|---|
| `States.Format` | `Steps.format(template, ...args)` | `` `Hello ${name}` ``, `a + b` (strings) |
| `States.StringToJson` | `Steps.jsonParse(str)` | `JSON.parse(str)` |
| `States.JsonToString` | `Steps.jsonStringify(obj)` | `JSON.stringify(obj)` |
| `States.Array` | `Steps.array(...items)` | `[a, b, c]` (dynamic elements) |
| `States.ArrayPartition` | `Steps.arrayPartition(arr, n)` | -- |
| `States.ArrayContains` | `Steps.arrayContains(arr, val)` | `arr.includes(val)` |
| `States.ArrayRange` | `Steps.arrayRange(start, end, step)` | -- |
| `States.ArrayGetItem` | `Steps.arrayGetItem(arr, idx)` | `arr[index]` |
| `States.ArrayLength` | `Steps.arrayLength(arr)` | `arr.length` |
| `States.ArrayUnique` | `Steps.arrayUnique(arr)` | -- |
| `States.Base64Encode` | `Steps.base64Encode(data)` | `btoa(data)` |
| `States.Base64Decode` | `Steps.base64Decode(data)` | `atob(data)` |
| `States.Hash` | `Steps.hash(data, algorithm)` | -- |
| `States.JsonMerge` | `Steps.merge(a, b, deep?)` | `{ ...a, ...b }` |
| `States.MathRandom` | `Steps.random(start, end)` | -- |
| `States.MathAdd` | `Steps.add(a, b)` | `a + b`, `a - b`, `a++`, `a--`, `a += n` |
| `States.StringSplit` | -- | `str.split(delimiter)` |
| `States.UUID` | `Steps.uuid()` | `crypto.randomUUID()` |

---

## String Formatting (`States.Format`)

```typescript
// Template literal
const msg = `Hello ${name}, your order ${orderId} is ready`;
// -> States.Format('Hello {}, your order {} is ready', $.name, $.orderId)

// String concatenation
const msg = firstName + ' ' + lastName;
// -> States.Format('{} {}', $.firstName, $.lastName)

// Explicit
const msg = Steps.format('Order {} has {} items', orderId, count);
```

## Arithmetic (`States.MathAdd`)

```typescript
const next = count + 1;      // States.MathAdd($.count, 1)
const prev = count - 1;      // States.MathAdd($.count, -1)
count++;                      // States.MathAdd($.count, 1)
count--;                      // States.MathAdd($.count, -1)
count += 5;                   // States.MathAdd($.count, 5)
count -= 3;                   // States.MathAdd($.count, -3)
```

Multiplication, division, and modulo are **not supported** -- ASL only provides `States.MathAdd`.

## JSON (`States.StringToJson` / `States.JsonToString`)

```typescript
const data = JSON.parse(rawJson);       // States.StringToJson($.rawJson)
const json = JSON.stringify(myObject);  // States.JsonToString($.myObject)
```

## Arrays

```typescript
const arr = [name, age, null];              // States.Array($.name, $.age, null)
const found = items.includes(target);       // States.ArrayContains($.items, $.target)
const item = items[index];                  // States.ArrayGetItem($.items, $.index)
const count = items.length;                 // States.ArrayLength($.items)
const parts = csvLine.split(',');           // States.StringSplit($.csvLine, ',')
const chunks = Steps.partition(items, 4);   // States.ArrayPartition($.items, 4)
const indices = Steps.range(0, 100, 10);    // States.ArrayRange(0, 100, 10)
const deduped = Steps.unique(items);        // States.ArrayUnique($.items)
```

## Encoding

```typescript
const encoded = btoa(plainText);            // States.Base64Encode($.plainText)
const decoded = atob(encodedData);          // States.Base64Decode($.encodedData)
const checksum = Steps.hash(payload, 'SHA-256');  // States.Hash($.payload, 'SHA-256')
```

Supported hash algorithms: `MD5`, `SHA-1`, `SHA-256`, `SHA-384`, `SHA-512`.

## Object Merge (`States.JsonMerge`)

```typescript
const combined = { ...defaults, ...overrides };
// -> States.JsonMerge($.defaults, $.overrides, false)  (shallow)

const deep = Steps.merge(base, patch, true);
// -> States.JsonMerge($.base, $.patch, true)  (deep)
```

Spread always uses shallow merge. For deep merge, use `Steps.merge(a, b, true)`.

## Random and UUID

```typescript
const roll = Steps.random(1, 6);       // States.MathRandom(1, 6)
const id = Steps.uuid();               // States.UUID()
const id = crypto.randomUUID();        // States.UUID()
```

For the full specification with ASL examples, see [`spec/intrinsic-functions.md`](../spec/intrinsic-functions.md).
