import Limiter from './limiter';

import { symbols } from './utils/constants';

const {
	LIMIT,
	AMOUNT,
	RECOVERY_TIME,
	RECOVERY_INTERVAL
} = symbols;

export default class FireLimiter extends Limiter {
	/**
	 * Returns the interval for the reset of requests
	 *
	 * @return {number}
	 */
	get recoveryTime() {
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

		const limit = this[LIMIT];

		let difference = Math.max(now - this[RECOVERY_TIME], 0);
		difference *= limit / this[RECOVERY_INTERVAL];
		difference += this[AMOUNT];

		this[RECOVERY_TIME] = now;
		this[AMOUNT] = Math.min(difference, limit);
	}
}
