import { Limiter } from './limiter';

import {
	kLimit,
	kAmount,
	kRecoveryTime,
	kRecoveryInterval,
} from './constants';

export class FireLimiter extends Limiter {
	/**
	 * Returns the interval for the reset of requests
	 */
	get recoveryTime(): number {
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
	conversionAmount() {
		const now = Date.now();

		const limit = this[kLimit];

		let difference = Math.max(now - this[kRecoveryTime], 0);
		difference *= limit / this[kRecoveryInterval];
		difference += this[kAmount];

		this[kRecoveryTime] = now;
		this[kAmount] = Math.min(difference, limit);
	}
}
