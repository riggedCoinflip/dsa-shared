import { calcAp } from "./calc-ap";

export const rename = (name: string): string => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return `ap${capitalized}`;
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

export const calcApSkillOrCombatAttribute = (
  skillOrCombatValue: number,
  factor: number,
): number => {
  return calcAp({
    value: skillOrCombatValue,
    minValue: 0,
    maxValue: 25,
    maxLinearScaling: 12,
    factor,
    hasUnlockCost: false,
  });
};

export const calcApSpellOrLiturgyAttribute = (
  spellOrLiturgyValue: number,
  factor: number,
): number => {
  return calcAp({
    value: spellOrLiturgyValue,
    minValue: 0,
    maxValue: 25,
    maxLinearScaling: 12,
    factor,
    hasUnlockCost: true,
  });
};
