# Intrinsic Functions

SimpleSteps maps all 18 ASL intrinsic functions to TypeScript. **Write natural JavaScript** — the compiler handles the mapping. `Steps.*` methods are also available for direct access (useful in JSONPath mode or when no JS equivalent exists).

## Summary

| Natural JavaScript | ASL Intrinsic | `Steps.*` Alternative |
|---|---|---|
| `` `Hello ${name}` ``, `a + b` (strings) | `States.Format` | `Steps.format(template, ...args)` |
| `JSON.parse(str)` | `States.StringToJson` | `Steps.jsonParse(str)` |
| `JSON.stringify(obj)` | `States.JsonToString` | `Steps.jsonStringify(obj)` |
| `[a, b, c]` (dynamic elements) | `States.Array` | `Steps.array(...items)` |
| `arr.includes(val)` | `States.ArrayContains` | `Steps.arrayContains(arr, val)` |
| `arr[index]` | `States.ArrayGetItem` | `Steps.arrayGetItem(arr, idx)` |
| `arr.length` | `States.ArrayLength` | `Steps.arrayLength(arr)` |
| `str.split(delimiter)` | `States.StringSplit` | -- |
| `a + b`, `a++`, `a -= n` | `States.MathAdd` | `Steps.add(a, b)` |
| `btoa(data)` | `States.Base64Encode` | `Steps.base64Encode(data)` |
| `atob(data)` | `States.Base64Decode` | `Steps.base64Decode(data)` |
| `{ ...a, ...b }` | `States.JsonMerge` | `Steps.merge(a, b, deep?)` |
| `crypto.randomUUID()` | `States.UUID` | `Steps.uuid()` |
| -- | `States.ArrayPartition` | `Steps.arrayPartition(arr, n)` |
| -- | `States.ArrayRange` | `Steps.arrayRange(start, end, step)` |
| -- | `States.ArrayUnique` | `Steps.arrayUnique(arr)` |
| -- | `States.Hash` | `Steps.hash(data, algorithm)` |
| -- | `States.MathRandom` | `Steps.random(start, end)` |

---

## String Formatting

```typescript
// Template literal — the natural way
const msg = `Hello ${name}, your order ${orderId} is ready`;
// -> States.Format('Hello {}, your order {} is ready', $.name, $.orderId)

// String concatenation
const msg = firstName + ' ' + lastName;
// -> States.Format('{} {}', $.firstName, $.lastName)

// Steps.* alternative
const msg = Steps.format('Order {} has {} items', orderId, count);
```

## Arithmetic

```typescript
// Natural JS — works in both JSONata and JSONPath modes
const next = count + 1;      // States.MathAdd($.count, 1)
const prev = count - 1;      // States.MathAdd($.count, -1)
count++;                      // States.MathAdd($.count, 1)
count--;                      // States.MathAdd($.count, -1)
count += 5;                   // States.MathAdd($.count, 5)
count -= 3;                   // States.MathAdd($.count, -3)
```

In **JSONata mode** (the default), all arithmetic operators work natively: `*`, `/`, `%`, `-`, `+`. In **JSONPath mode**, only addition and literal subtraction are supported (ASL only provides `States.MathAdd`).

## JSON

```typescript
// Natural JS
const data = JSON.parse(rawJson);       // States.StringToJson($.rawJson)
const json = JSON.stringify(myObject);  // States.JsonToString($.myObject)
```

## Arrays

```typescript
// Natural JS
const arr = [name, age, null];              // States.Array($.name, $.age, null)
const found = items.includes(target);       // States.ArrayContains($.items, $.target)
const item = items[index];                  // States.ArrayGetItem($.items, $.index)
const count = items.length;                 // States.ArrayLength($.items)
const parts = csvLine.split(',');           // States.StringSplit($.csvLine, ',')

// Steps.* only (no JS equivalent)
const chunks = Steps.partition(items, 4);   // States.ArrayPartition($.items, 4)
const indices = Steps.range(0, 100, 10);    // States.ArrayRange(0, 100, 10)
const deduped = Steps.unique(items);        // States.ArrayUnique($.items)
```

## Encoding

```typescript
// Natural JS
const encoded = btoa(plainText);            // States.Base64Encode($.plainText)
const decoded = atob(encodedData);          // States.Base64Decode($.encodedData)

// Steps.* only (no JS equivalent)
const checksum = Steps.hash(payload, 'SHA-256');  // States.Hash($.payload, 'SHA-256')
```

Supported hash algorithms: `MD5`, `SHA-1`, `SHA-256`, `SHA-384`, `SHA-512`.

## Object Merge

```typescript
// Natural JS — spread syntax (shallow merge)
const combined = { ...defaults, ...overrides };
// -> States.JsonMerge($.defaults, $.overrides, false)

// Steps.* alternative — supports deep merge
const deep = Steps.merge(base, patch, true);
// -> States.JsonMerge($.base, $.patch, true)
```

Spread always uses shallow merge. For deep merge, use `Steps.merge(a, b, true)`.

## Random and UUID

```typescript
// Natural JS
const id = crypto.randomUUID();        // States.UUID()

// Steps.* alternatives
const roll = Steps.random(1, 6);       // States.MathRandom(1, 6)
const id = Steps.uuid();               // States.UUID()
```

