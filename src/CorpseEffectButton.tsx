import React, { useState } from 'react';
import './App.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { EffectTypeEnum, ChangeType, CorpseEffect } from './types';

const EffectTypes: Array<{ name: EffectTypeEnum, change: ChangeType, value: number }> = [
  { name: EffectTypeEnum.Physical, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Physical, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Fire, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Fire, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Cold, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Cold, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Lightning, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Lightning, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Chaos, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Chaos, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Life, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Life, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Mana, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Mana, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Attack, change: 'increase', value: 300 },
  { name: EffectTypeEnum.Attack, change: 'decrease', value: 150 },
  { name: EffectTypeEnum.Caster, change: 'increase', value: 300 },
  { name: EffectTypeEnum.Caster, change: 'decrease', value: 150 },
  { name: EffectTypeEnum.Elemental, change: 'increase', value: 300 },
  { name: EffectTypeEnum.Elemental, change: 'decrease', value: 150 },
  { name: EffectTypeEnum.Defences, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Defences, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Critical, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Critical, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Speed, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Speed, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Attribute, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Attribute, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Resistance, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Resistance, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Gem, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Gem, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.Minion, change: 'increase', value: 500 },
  { name: EffectTypeEnum.Minion, change: 'decrease', value: 300 },
  { name: EffectTypeEnum.ModTierRating, change: 'increase', value: 50 },
  { name: EffectTypeEnum.Horizontal, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Vertical, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Adjacent, change: 'increase', value: 40 },
  { name: EffectTypeEnum.Minion, change: 'increase', value: 20 },
  { name: EffectTypeEnum.Mirrored, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Quality, change: 'increase', value: 5 },
  { name: EffectTypeEnum.Split, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Fracture, change: 'increase', value: 25 },
];

type CorpseEffectProps = {
  onSelectedCorpseEffect: (effect: CorpseEffect) => void;
};

function CorpseEffectButton(props: CorpseEffectProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    
    const selectedEffect = EffectTypes[index];
    
    const effect: CorpseEffect = {
      effectType: selectedEffect.name,
      value: selectedEffect.value,
      change: selectedEffect.change,
    };

    props.onSelectedCorpseEffect(effect);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Corpse-effect"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{
            border: 1, // 1px 테두리 추가
            borderColor: 'lightgray', // 테두리 색상 설정
            borderRadius: 1, // 모서리를 약간 둥글게
            textAlign: 'center', // 내용 가운데 정렬
            flex: 'none', // flex 컨테이너 내에서 자동 크기 조정을 방지
            m: 1, // margin 추가
            '&:hover': {
              backgroundColor: 'action.hover', // 호버 상태의 배경색 변경
            },
          }}
        >
          <ListItemText
            primary={selectedIndex != null ? `${EffectTypes[selectedIndex].name} ${EffectTypes[selectedIndex].change} ${EffectTypes[selectedIndex].value}`
             : "Choose a corpse effect"}
            // secondary={selectedIndex != null ? `${EffectTypes[selectedIndex].change} ${EffectTypes[selectedIndex].value}` : ''}
            sx={{
              textAlign: 'center', // 가운데 정렬
            }}
          />
        </ListItemButton>
      </List>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {EffectTypes.map((effectType, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {effectType.name} {effectType.change} {effectType.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default CorpseEffectButton;