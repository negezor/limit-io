<p align="center"><img src="https://raw.githubusercontent.com/negezor/limit-io/master/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://www.npmjs.com/package/limit-io"><img src="https://img.shields.io/npm/v/limit-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://github.com/negezor/limit-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/actions/workflow/status/negezor/limit-io/tests.yml?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/limit-io"><img src="https://img.shields.io/npm/dt/limit-io.svg?style=flat-square" alt="NPM downloads"></a>

> LIMIT-IO - This is a simple query limiter based on memory storage

## Features
- Two operating modes
- Support ESM
- Simple

## Installation
> **[Node.js](https://nodejs.org/) 18.0.0 or newer is required**

- **Using `npm`** (recommended)
	```shell
	npm i limit-io
	```
- **Using `Yarn`**
  ```shell
  yarn add limit-io
  ```
- **Using `pnpm`**
  ```shell
  pnpm add limit-io
  ```

## API Reference

* [TimeoutLimiter](#TimeoutLimiter)
* [FireLimiter](#FireLimiter)

## TimeoutLimiter

```js
import { TimeoutLimiter } from 'limit-io';
```

### Constructor
Initializing a new instance

```js
const limiter = new TimeoutLimiter(recoveryInterval, amount)
```

| Parameter         | Type   | Description                          |
|-------------------|--------|--------------------------------------|
| recoveryInterval  | string | [API ms](https://github.com/zeit/ms) |
| amount            | number | Number of available requests         |

### limit
Returns the limit on the number of calls

```js
limiter.limit; // => number
```

### amount
Returns the number of available calls

```js
limiter.amount; // => number
```

### recoveryTime
Returns the time to restore

```js
limiter.recoveryTime; // => number
```

### recoveryInterval
Returns the interval for the reset of requests

```js
limiter.recoveryInterval; // => number
```

### accept
Checks if there are enough calls to call

```js
limiter.accept(amount); // => boolean
```

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| amount    | number | Number of requests requested |

### reset
Clears the number of available calls

```js
limiter.reset();
```

## FireLimiter
The difference from Limiter is that it will be called as soon as there is enough for the specified number of calls
