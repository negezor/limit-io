import ms from 'ms';

import nodeUtil from 'util';

import { symbols } from './utils/constants';

const { inspect } = nodeUtil;

const {
	LIMIT,
	AMOUNT,
	RECOVERY_TIME,
	RECOVERY_INTERVAL
} = symbols;

export default class Limiter {
	/**
	 * Constructor
	 *
	 * @param {string} recoveryInterval
	 * @param {number} amount
	 */
	constructor(recoveryInterval, amount) {
		if (typeof recoveryInterval !== 'string') {
			throw new TypeError('RecoveryInterval should be string');
		}

		if (typeof amount !== 'number') {
			throw new TypeError('Amount should be number');
		}

		if (amount < 0) {
			throw new RangeError('Amount should be greater than 0');
		}

		this[LIMIT] = amount;
		this[AMOUNT] = amount;

		this[RECOVERY_TIME] = 0;
		this[RECOVERY_INTERVAL] = ms(recoveryInterval);
	}

	/**
	 * Returns the limit on the number of calls
	 *
	 * @return {number}
	 */
	get limit() {
		return this[LIMIT];
	}

	/**
	 * Returns the number of available calls
	 *
	 * @return {number}
	 */
	get amount() {
		this.conversionAmount();

		return this[AMOUNT];
	}

	/**
	 * Returns the time to restore
	 *
	 * @return {number}
	 */
	get recoveryTime() {
		if (this.amount === this.limit) {
			return 0;
		}

		const recoveryTime = this[RECOVERY_TIME] - Date.now();

		return recoveryTime > 0
			? recoveryTime
			: 0;
	}

	/**
	 * Returns the interval for the reset of requests
	 *
	 * @return {number}
	 */
	get recoveryInterval() {
		return this[RECOVERY_INTERVAL];
	}

	/**
	 * Checks if there are enough calls to call
	 *
	 * @param {number} amount
	 *
	 * @return {boolean}
	 */
	accept(amount) {
		if (this.amount < amount) {
			return false;
		}

		this[AMOUNT] -= amount;

		return true;
	}

	/**
	 * Clears the number of available calls
	 *
	 * @return {this}
	 */
	reset() {
		this[AMOUNT] = this[LIMIT];

		this[RECOVERY_TIME] = 0;

		return this;
	}

	/**
	 * Counts the number of requests
	 */
	conversionAmount() {
		const now = Date.now();

		if (this[RECOVERY_TIME] > now) {
			return;
		}

		this[AMOUNT] = this[LIMIT];

		this[RECOVERY_TIME] = now + this[RECOVERY_INTERVAL];
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		const {
			limit,
			amount,
			recoveryTime,
			recoveryInterval
		} = this;

		const customData = {
			limit,
			amount,
			recoveryTime,
			recoveryInterval,
			'<recoveryTime>': ms(recoveryTime, {
				long: true
			}),
			'<recoveryInterval>': ms(recoveryInterval, {
				long: true
			})
		};

		const payload = inspect(customData, {
			...options,

			compact: false
		});

		return `${options.stylize(name, 'special')} ${payload}`;
	}
}
