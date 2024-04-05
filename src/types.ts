export type CorpseType = 'Undead' | 'Humanoid' | 'Demon' | 'Beast' | 'Construct';

export type ChangeType = 'increase' | 'decrease' | 'tier';

export type CorpseEffect = {
    effectType: string,
    change: ChangeType,
    value: number,
};