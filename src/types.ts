export type CorpseType = 'Undead' | 'Humanoid' | 'Demon' | 'Beast' | 'Construct';

export type ChangeType = 'increase' | 'decrease' | 'tier';

export type CorpseEffect = {
    effectType: EffectTypeEnum,
    change: ChangeType,
    value: number,
};

export enum EffectTypeEnum {
    Physical = 'Physical',
    Fire = 'Fire',
    Cold = 'Cold',
    Lightning = 'Lightning',
    Chaos = 'Chaos',
    Life = 'Life',
    Mana = 'Mana',
    Attack = 'Attack',
    Caster = 'Caster',
    Elemental = 'Elemental',
    Defences = 'Defences',
    Critical = 'Critical',
    Speed = 'Speed',
    Attribute = 'Attribute',
    Resistance = 'Resistance',
    Gem = 'Gem',
    Minion = 'Minion',
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
    Adjacent = 'Adjacent',
    AddCraft = 'Add Craft',
    ModTierRating = 'Mod Tier Rating',
    Mirrored = 'Mirrored',
    Quality = 'Quality',
    Split = 'Split',
    Fracture = 'Fracture'
  }