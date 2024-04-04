import React, { useState } from 'react';
import './App.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { ChangeType } from './types';

type CorpseEffect = {
  type: string,
  value: number,
  change: ChangeType,
}

const EffectTypes: Array<{ name: string, change: ChangeType, value: number }> = [
  { name: 'Physical', change: 'increased', value: 500 },
  { name: 'Physical', change: 'scarcer', value: 300 },
  { name: 'Physical', change: 'tier', value: 100 },
  { name: 'Fire', change: 'increased', value: 500 },
  { name: 'Fire', change: 'scarcer', value: 300 },
  { name: 'Fire', change: 'tier', value: 100 },
  { name: 'Cold', change: 'increased', value: 500 },
  { name: 'Cold', change: 'scarcer', value: 300 },
  { name: 'Cold', change: 'tier', value: 100 },
  { name: 'Lightning', change: 'increased', value: 500 },
  { name: 'Lightning', change: 'scarcer', value: 300 },
  { name: 'Lightning', change: 'tier', value: 100 },
  { name: 'Chaos', change: 'increased', value: 500 },
  { name: 'Chaos', change: 'scarcer', value: 300 },
  { name: 'Chaos', change: 'tier', value: 100 },
  { name: 'Life', change: 'increased', value: 500 },
  { name: 'Life', change: 'scarcer', value: 300 },
  { name: 'Life', change: 'tier', value: 100 },
  { name: 'Mana', change: 'increased', value: 500 },
  { name: 'Mana', change: 'scarcer', value: 300 },
  { name: 'Mana', change: 'tier', value: 100 },
  { name: 'Attack', change: 'increased', value: 300 },
  { name: 'Attack', change: 'scarcer', value: 150 },
  { name: 'Attack', change: 'tier', value: 50 },
  { name: 'Caster', change: 'increased', value: 300 },
  { name: 'Caster', change: 'scarcer', value: 150 },
  { name: 'Caster', change: 'tier', value: 50 },
  { name: 'Elemental', change: 'increased', value: 300 },
  { name: 'Elemental', change: 'scarcer', value: 150 },
  { name: 'Elemental', change: 'tier', value: 50 },
  { name: 'Defences', change: 'increased', value: 500 },
  { name: 'Defences', change: 'scarcer', value: 300 },
  { name: 'Defences', change: 'tier', value: 100 },
  { name: 'Critical', change: 'increased', value: 500 },
  { name: 'Critical', change: 'scarcer', value: 300 },
  { name: 'Critical', change: 'tier', value: 100 },
  { name: 'Speed', change: 'increased', value: 500 },
  { name: 'Speed', change: 'scarcer', value: 300 },
  { name: 'Speed', change: 'tier', value: 100 },
  { name: 'Attribute', change: 'increased', value: 500 },
  { name: 'Attribute', change: 'scarcer', value: 300 },
  { name: 'Attribute', change: 'tier', value: 100 },
  { name: 'Resistance', change: 'increased', value: 500 },
  { name: 'Resistance', change: 'scarcer', value: 300 },
  { name: 'Resistance', change: 'tier', value: 100 },
  { name: 'Gem', change: 'increased', value: 500 },
  { name: 'Gem', change: 'scarcer', value: 300 },
  { name: 'Gem', change: 'tier', value: 100 },
  { name: 'Minion', change: 'increased', value: 500 },
  { name: 'Minion', change: 'scarcer', value: 300 },
  { name: 'Minion', change: 'tier', value: 100 },
  { name: 'All', change: 'tier', value: 50 },
  { name: 'horizontal', change: 'increased', value: 25 },
  { name: 'vertical', change: 'increased', value: 25 },
  { name: 'adjacent', change: 'increased', value: 40 },
];

type CorpseEffectProps = {
  onSelectedCorpseEffect: (effect: CorpseEffect) => void;
};

function CorpseEffect(props: CorpseEffectProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
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
    const value = selectedEffect.change === 'increased' ? 500 : 300;
    
    const effect: CorpseEffect = {
      type: selectedEffect.name,
      value: value,
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
        >
          <ListItemText
            primary="효과"
            secondary={`${EffectTypes[selectedIndex].name} ${EffectTypes[selectedIndex].change} ${EffectTypes[selectedIndex].value}`}
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

export default CorpseEffect;