import React, { useState } from 'react';
import './App.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { EffectTypeEnum, ChangeType, CorpseEffect } from './types';
import { useTranslation } from 'react-i18next';

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
  { name: EffectTypeEnum.AddCraft, change: 'increase', value: 20 },
  { name: EffectTypeEnum.ModTier, change: 'rating', value: 50 },
  { name: EffectTypeEnum.Horizontal, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Vertical, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Adjacent, change: 'increase', value: 40 },
  { name: EffectTypeEnum.Mirrored, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Quality, change: 'increase', value: 5 },
  { name: EffectTypeEnum.Split, change: 'increase', value: 25 },
  { name: EffectTypeEnum.Fracture, change: 'increase', value: 25 },
  { name: EffectTypeEnum.ItemLevel, change: 'increase', value: 1 },
  { name: EffectTypeEnum.Explicit, change: 'increase', value: 1 },
  { name: EffectTypeEnum.Explicit, change: 'decrease', value: 1 },
  { name: EffectTypeEnum.SocketNumbers, change: 'increase', value: 200 },
  { name: EffectTypeEnum.SocketLinks, change: 'increase', value: 200 },
  { name: EffectTypeEnum.RerollExplicit, change: 'increase', value: 6 },
  { name: EffectTypeEnum.RerollPrefix, change: 'increase', value: 6 },
];

type CorpseEffectProps = {
  onSelectedCorpseEffect: (effect: CorpseEffect) => void;
};

function CorpseEffectButton(props: CorpseEffectProps) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const open = Boolean(anchorEl);
  
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    // filteredEffects에서 실제 선택된 항목의 정보를 가져옵니다.
    const selectedEffectFromFiltered = filteredEffects[index];
  
    // 원본 EffectTypes 배열에서 해당 항목의 인덱스를 찾습니다.
    const selectedIndexInOriginal = EffectTypes.findIndex(effectType =>
      effectType.name === selectedEffectFromFiltered.name && effectType.change === selectedEffectFromFiltered.change
    );
  
    setSelectedIndex(selectedIndexInOriginal);  // 이제 선택된 인덱스는 원본 배열에서의 인덱스를 반영합니다.
    setAnchorEl(null);
  
    // 원본 배열에서 선택된 항목의 정보를 사용합니다.
    const selectedEffect = EffectTypes[selectedIndexInOriginal];
    
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

  const filteredEffects = filter
    ? EffectTypes.filter(effectType =>
        t(`effect_type.${effectType.name}`).toLowerCase().includes(filter.toLowerCase()) ||
        t(`${effectType.change}`).toLowerCase().includes(filter.toLowerCase())
      )
    : EffectTypes;

  return (
    <React.Fragment>
      <TextField
        label="Search Effects"
        variant="outlined"
        fullWidth
        onChange={e => setFilter(e.target.value)}
        sx={{ m: 1 }}
      />
      <List
        component="nav"
        aria-label="Corpse-effect"
        sx={{
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto', // 스크롤 가능하도록 설정
          maxHeight: 260, // 최대 높이 설정
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          m: 1,
        }}
      >
          {filteredEffects.map((effectType, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={() => handleMenuItemClick(index)}
                sx={{
                  textAlign: 'center',
                  '&.Mui-selected': {
                    bgcolor: 'action.selected',
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: 'action.hover',
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemText primary={t(`effect.${effectType.name}_${effectType.change}`)} /> 
              </ListItemButton>
              {index < EffectTypes.length - 1 && <Divider />} {/* 마지막 요소 제외하고 구분선 추가 */}
            </React.Fragment>
          ))}
      </List>
    </React.Fragment>
  );
}

export default CorpseEffectButton;