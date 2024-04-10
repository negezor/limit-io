import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { TimeoutLimiter } from '..';

describe('TimeoutLimiter', () => {
	it('check accept', () => {
        const limiter = new TimeoutLimiter('1m', 3);

        strictEqual(limiter.amount, 3);

        strictEqual(limiter.accept(1), true);

        strictEqual(limiter.amount, 2);

        strictEqual(limiter.accept(1), true);

        strictEqual(limiter.amount, 1);

        strictEqual(limiter.accept(1), true);

        strictEqual(limiter.amount, 0);

        strictEqual(limiter.accept(1), false);

        strictEqual(limiter.amount, 0);
	});
});
