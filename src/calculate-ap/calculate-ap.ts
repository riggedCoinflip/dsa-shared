interface calcApArgs {
    value: number;
    minValue: number;
    maxValue: number;
    maxLinearScaling: number;
    factor: number;
    hasUnlockCost: boolean;
}

export const calcAp = (args: calcApArgs): number => {
    let apCost = 0;

    if (!Number.isInteger(args.value)) {
        throw new TypeError(
            `Only integer values allowed at value ${args.value}`
        );
    } 
    
    if (args.value < args.minValue) {
        throw new RangeError(
            `Value ${args.value} is under the lower limit ${args.minValue}`
        );
    } else if (args.value <= args.maxLinearScaling) {
        //linear scaling
        const linear = args.value - args.minValue;
        apCost += linear;
    } else if (args.value <= args.maxValue) {
        //scaling equivalent to triangular number
        const linear = args.maxLinearScaling - args.minValue - 1;
        apCost += linear;
        const triangularBase = args.value - args.maxLinearScaling + 1;
        const triangular = (triangularBase * (triangularBase + 1)) / 2;
        apCost += triangular;
    } else {
        throw new RangeError(
            `Value ${args.value} is higher the upper limit ${args.maxValue}`
        );
    }

    if (args.hasUnlockCost) {
        apCost += 1;
    }

    const totalCost = apCost * args.factor;
    return totalCost;
};

export const calcApAttribute = (attributeValue: number): number => {
    return calcAp({
        value: attributeValue,
        minValue: 8,
        maxValue: 20,
        maxLinearScaling: 14,
        factor: 15,
        hasUnlockCost: false,
    });
};

export const calcSkillOrCombatAttribute = (
    skillOrCombatValue: number,
    factor: number
): number => {
    return calcAp({
        value: skillOrCombatValue,
        minValue: 0,
        maxValue: 25,
        maxLinearScaling: 12,
        factor: factor,
        hasUnlockCost: false,
    });
};

export const calcSpellOrLiturgyAttribute = (
    spellOrLiturgyValue: number,
    factor: number
): number => {
    return calcAp({
        value: spellOrLiturgyValue,
        minValue: 0,
        maxValue: 25,
        maxLinearScaling: 12,
        factor: factor,
        hasUnlockCost: true,
    });
};
