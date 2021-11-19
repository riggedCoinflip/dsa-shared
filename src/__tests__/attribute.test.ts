import { calcAp } from '../calculate-ap/calculate-ap';

describe('Attribute', () => {
    const opts = {
        minValue: 0,
        maxValue: 10,
        maxLinearScaling: 5,
        factor: 1,
        hasUnlockCost: false,
    };

    const calcApTest = (value: number): number => {
        return calcAp({
            value,
            ...opts,
        });
    };

    it('returns 0 for attribute=minAllowed', () => {
        expect(calcApTest(0)).toBe(0);
    });

    it('scales linearly for <=maxLinearScaling', () => {
        for (let i = 0; i <= opts.maxLinearScaling - opts.minValue - 1; i++) {
            expect(
                calcApTest(opts.minValue + i + 1) -
                    calcApTest(opts.minValue + i)
            ).toBe(opts.factor);
        }
    });

    it('scales by triangle number for >maxLinearScaling', () => {
        for (let i = 0; i <= opts.maxValue - opts.maxLinearScaling - 1; i++) {
            expect(
                calcApTest(opts.maxLinearScaling + i + 1) -
                    calcApTest(opts.maxLinearScaling + i)
            ).toBe(opts.factor * (i + 2));
        }
    });

    it('adds unlock cost', () => {
        expect(
            calcAp({
                value: 0,
                ...opts,
                hasUnlockCost: true,
            }) - opts.factor
        ).toBe(
            calcAp({
                value: 0,
                ...opts,
                hasUnlockCost: false,
            })
        );
    });

    it('throws TypeError for non Integer', () => {
        const calcApTestWithFloat = () => {
            return calcApTest(0.5);
        };

        expect(calcApTestWithFloat).toThrow(TypeError);
    });

    it('throws RangeError for value under minValue', () => {
        const calcApTestWithValueUnderMinValue = () => {
            return calcApTest(opts.minValue - 1);
        };
        expect(calcApTestWithValueUnderMinValue).toThrow(RangeError);
    });

    it('throws RangeError for value over maxValue', () => {
        const calcApTestWithValueOverMaxValue = () => {
            return calcApTest(opts.maxValue + 1);
        };
        expect(calcApTestWithValueOverMaxValue).toThrow(RangeError);
    });
});
