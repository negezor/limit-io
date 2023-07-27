import { FireLimiter } from '..';

describe('FireLimiter', () => {
	it('check accept', () => {
        const limiter = new FireLimiter('1m', 3);

        expect(limiter.amount).toEqual(3);

        expect(limiter.accept(1)).toEqual(true);

        expect(limiter.amount).toEqual(2);

        expect(limiter.accept(1)).toEqual(true);

        expect(limiter.amount).toEqual(1);

        expect(limiter.accept(1)).toEqual(true);

        expect(limiter.amount).toEqual(0);

        expect(limiter.accept(1)).toEqual(false);

        expect(limiter.amount).toEqual(0);
	});
});
