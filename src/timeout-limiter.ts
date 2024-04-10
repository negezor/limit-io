import ms from 'ms';

import { inspect } from 'node:util';

import {
	kLimit,
	kAmount,
	kRecoveryTime,
	kRecoveryInterval,
} from './constants';

export class TimeoutLimiter {
    protected [kLimit]: number;
    protected [kAmount]: number;
    protected [kRecoveryTime]: number;
    protected [kRecoveryInterval]: number;

	public constructor(recoveryInterval: string, amount: number) {
		if (typeof recoveryInterval !== 'string') {
			throw new TypeError('RecoveryInterval should be string');
		}

		if (typeof amount !== 'number') {
			throw new TypeError('Amount should be number');
		}

		if (amount < 0) {
			throw new RangeError('Amount should be greater than 0');
		}

		this[kLimit] = amount;
		this[kAmount] = amount;

		this[kRecoveryTime] = 0;
		this[kRecoveryInterval] = ms(recoveryInterval);
	}

	/**
	 * Returns the limit on the number of calls
	 */
	public get limit(): number {
		return this[kLimit];
	}

	/**
	 * Returns the number of available calls
	 */
	public get amount(): number {
		this.countAmount();

		return this[kAmount];
	}

	/**
	 * Returns the time to restore
	 */
	public get recoveryTime(): number {
		if (this.amount === this.limit) {
			return 0;
		}

		const recoveryTime = this[kRecoveryTime] - Date.now();

		return recoveryTime > 0
			? recoveryTime
			: 0;
	}

	/**
	 * Returns the interval for the reset of requests
	 */
	public get recoveryInterval(): number {
		return this[kRecoveryInterval];
	}

	/**
	 * Checks if there are enough calls to call
	 */
	public accept(amount: number): boolean {
		if (this.amount < amount) {
			return false;
		}

		this[kAmount] -= amount;

		return true;
	}

	/**
	 * Clears the number of available calls
	 */
	public reset(): this {
		this[kAmount] = this[kLimit];

		this[kRecoveryTime] = 0;

		return this;
	}

	/**
	 * Counts the number of requests
	 */
	protected countAmount() {
		const now = Date.now();

		if (this[kRecoveryTime] > now) {
			return;
		}

		this[kAmount] = this[kLimit];

		this[kRecoveryTime] = now + this[kRecoveryInterval];
	}

	/**
	 * Custom inspect object
	 */
	[inspect.custom](depth: number, options: Record<string, any> & { stylize: (name: string, color: 'special') => string}): string {
		const { name } = this.constructor;

		const {
			limit,
			amount,
			recoveryTime,
			recoveryInterval,
		} = this;

		const customData = {
			limit,
			amount,
			recoveryTime,
			recoveryInterval,
			'<recoveryTime>': ms(recoveryTime, {
				long: true,
			}),
			'<recoveryInterval>': ms(recoveryInterval, {
				long: true,
			}),
		};

		const payload = inspect(customData, {
			...options,

			compact: false,
		});

		return `${options.stylize(name, 'special')} ${payload}`;
	}
}
