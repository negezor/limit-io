<p align="center"><img src="https://raw.githubusercontent.com/negezor/limit-io/master/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://www.npmjs.com/package/limit-io"><img src="https://img.shields.io/npm/v/limit-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://travis-ci.org/negezor/limit-io"><img src="https://img.shields.io/travis/negezor/limit-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/limit-io"><img src="https://img.shields.io/npm/dt/limit-io.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.codacy.com/app/negezor/limit-io"><img src="https://img.shields.io/codacy/grade/25ee36d46e6e498981a74f8b0653aacc.svg?style=flat-square" alt="Code quality"></a>
</p>

LIMIT-IO - This is a simple query limiter based on memory storage

## Features
- Two operating modes
- Support ESM
- Simple

## Installation
> **[Node.js](https://nodejs.org/) 8.0.0 or newer is required**  

### Yarn
Recommended, auto assembly
```shell
$ yarn add limit-io
```

### NPM
```shell
$ npm i limit-io
```

## API Reference

* [Limiter](#Limiter)
	* [FireLimiter](#FireLimiter)
	* [TimeoutLimiter](#TimeoutLimiter)

## Limiter

```js
import { Limiter } from 'limit-io';
```

### Constructor
Initializing a new instance

```js
const limiter = new Limiter(recoveryInterval, amount)
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

## TimeoutLimiter

Alias for [Limiter](#Limiter)

## FireLimiter
The difference from Limiter is that it will be called as soon as there is enough for the specified number of calls
