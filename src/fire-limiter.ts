import { TimeoutLimiter } from './timeout-limiter';

import {
	kLimit,
	kAmount,
	kRecoveryTime,
	kRecoveryInterval,
} from './constants';

export class FireLimiter extends TimeoutLimiter {
	/**
	 * Returns the interval for the reset of requests
	 */
	public get recoveryTime(): number {
		const { amount, limit, recoveryInterval } = this;

		if (amount === limit) {
			return 0;
		}

		let recovery = recoveryInterval * amount;
		recovery /= limit;

		recovery = recoveryInterval - recovery;

		return recovery > 0
			? recovery
			: 0;
	}

	/**
	 * Counts the number of requests
	 */
	protected countAmount() {
		const now = Date.now();

		const limit = this[kLimit];

		let difference = Math.max(now - this[kRecoveryTime], 0);
		difference *= limit / this[kRecoveryInterval];
		difference += this[kAmount];

		this[kRecoveryTime] = now;
		this[kAmount] = Math.ceil(Math.min(difference, limit));
	}
}
