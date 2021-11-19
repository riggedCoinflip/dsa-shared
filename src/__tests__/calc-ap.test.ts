import { calcAp } from '../calc-ap/calc-ap';

describe('calculate-ap', () => {
    const args = {
        minValue: 0,
        maxValue: 10,
        maxLinearScaling: 5,
        factor: 1,
        hasUnlockCost: false,
    };

    const calcApTest = (value: number): number => {
        return calcAp({
            value,
            ...args,
        });
    };

    it('returns 0 for attribute=minAllowed', () => {
        expect(calcApTest(0)).toBe(0);
    });

    it('scales linearly for <=maxLinearScaling', () => {
        for (let i = 0; i <= args.maxLinearScaling - args.minValue - 1; i++) {
            expect(
                calcApTest(args.minValue + i + 1) -
                    calcApTest(args.minValue + i)
            ).toBe(args.factor);
        }
    });

    it('scales by triangle number for >maxLinearScaling', () => {
        for (let i = 0; i <= args.maxValue - args.maxLinearScaling - 1; i++) {
            expect(
                calcApTest(args.maxLinearScaling + i + 1) -
                    calcApTest(args.maxLinearScaling + i)
            ).toBe(args.factor * (i + 2));
        }
    });

    it('adds unlock cost', () => {
        expect(
            calcAp({
                value: 0,
                ...args,
                hasUnlockCost: true,
            }) - args.factor
        ).toBe(
            calcAp({
                value: 0,
                ...args,
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
            return calcApTest(args.minValue - 1);
        };
        expect(calcApTestWithValueUnderMinValue).toThrow(RangeError);
    });

    it('throws RangeError for value over maxValue', () => {
        const calcApTestWithValueOverMaxValue = () => {
            return calcApTest(args.maxValue + 1);
        };
        expect(calcApTestWithValueOverMaxValue).toThrow(RangeError);
    });
});
