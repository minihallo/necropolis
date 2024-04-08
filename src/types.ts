export type CorpseType = 'undead' | 'humanoid' | 'demon' | 'beast' | 'construct';

export type ChangeType = 'increase' | 'decrease' | 'tier' | 'reforge' | 'reroll' | 'rating';

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
    AddCraft = 'AddCraft',
    ModTier = 'ModTier',
    Mirrored = 'Mirrored',
    Quality = 'Quality',
    Split = 'Split',
    Fracture = 'Fracture',
    ItemLevel = 'ItemLevel',
    Explicit = 'Explicit',
    SocketNumbers = 'SocketNumbers',
    SocketLinks = 'SocketLinks',
    RerollExplicit = 'RerollExplicit',
    RerollPrefix = 'RerollPrefix',
}
