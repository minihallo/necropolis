import React, { useState } from 'react';
import './App.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { ChangeType, CorpseEffect } from './types';

const EffectTypes: Array<{ name: string, change: ChangeType, value: number }> = [
  { name: 'Physical', change: 'increase', value: 500 },
  { name: 'Physical', change: 'decrease', value: 300 },
  { name: 'Physical', change: 'tier', value: 100 },
  { name: 'Fire', change: 'increase', value: 500 },
  { name: 'Fire', change: 'decrease', value: 300 },
  { name: 'Fire', change: 'tier', value: 100 },
  { name: 'Cold', change: 'increase', value: 500 },
  { name: 'Cold', change: 'decrease', value: 300 },
  { name: 'Cold', change: 'tier', value: 100 },
  { name: 'Lightning', change: 'increase', value: 500 },
  { name: 'Lightning', change: 'decrease', value: 300 },
  { name: 'Lightning', change: 'tier', value: 100 },
  { name: 'Chaos', change: 'increase', value: 500 },
  { name: 'Chaos', change: 'decrease', value: 300 },
  { name: 'Chaos', change: 'tier', value: 100 },
  { name: 'Life', change: 'increase', value: 500 },
  { name: 'Life', change: 'decrease', value: 300 },
  { name: 'Life', change: 'tier', value: 100 },
  { name: 'Mana', change: 'increase', value: 500 },
  { name: 'Mana', change: 'decrease', value: 300 },
  { name: 'Mana', change: 'tier', value: 100 },
  { name: 'Attack', change: 'increase', value: 300 },
  { name: 'Attack', change: 'decrease', value: 150 },
  { name: 'Attack', change: 'tier', value: 50 },
  { name: 'Caster', change: 'increase', value: 300 },
  { name: 'Caster', change: 'decrease', value: 150 },
  { name: 'Caster', change: 'tier', value: 50 },
  { name: 'Elemental', change: 'increase', value: 300 },
  { name: 'Elemental', change: 'decrease', value: 150 },
  { name: 'Elemental', change: 'tier', value: 50 },
  { name: 'Defences', change: 'increase', value: 500 },
  { name: 'Defences', change: 'decrease', value: 300 },
  { name: 'Defences', change: 'tier', value: 100 },
  { name: 'Critical', change: 'increase', value: 500 },
  { name: 'Critical', change: 'decrease', value: 300 },
  { name: 'Critical', change: 'tier', value: 100 },
  { name: 'Speed', change: 'increase', value: 500 },
  { name: 'Speed', change: 'decrease', value: 300 },
  { name: 'Speed', change: 'tier', value: 100 },
  { name: 'Attribute', change: 'increase', value: 500 },
  { name: 'Attribute', change: 'decrease', value: 300 },
  { name: 'Attribute', change: 'tier', value: 100 },
  { name: 'Resistance', change: 'increase', value: 500 },
  { name: 'Resistance', change: 'decrease', value: 300 },
  { name: 'Resistance', change: 'tier', value: 100 },
  { name: 'Gem', change: 'increase', value: 500 },
  { name: 'Gem', change: 'decrease', value: 300 },
  { name: 'Gem', change: 'tier', value: 100 },
  { name: 'Minion', change: 'increase', value: 500 },
  { name: 'Minion', change: 'decrease', value: 300 },
  { name: 'Minion', change: 'tier', value: 100 },
  { name: 'All', change: 'tier', value: 50 },
  { name: 'Horizontal', change: 'increase', value: 25 },
  { name: 'Vertical', change: 'increase', value: 25 },
  { name: 'Adjacent', change: 'increase', value: 40 },
  { name: 'Add Craft', change: 'increase', value: 20 },
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