import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { CorpseType, CorpseEffect } from './types';
import CorpseEffectList from './CorpseEffectList';
import TileEffectSummary from './TileEffectSummary';
import background from "./path-of-exile-necropolis-1536x864.jpg";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useTranslation } from 'react-i18next';

const firebaseConfig = {
  apiKey: "AIzaSyB-v6DOUIbzGt0Dreztzt7DB4Eun1eGRMI",
  authDomain: "necropolispoe.firebaseapp.com",
  projectId: "necropolispoe",
  storageBucket: "necropolispoe.appspot.com",
  messagingSenderId: "214113047169",
  appId: "1:214113047169:web:cf7fc04ae56a6024e2b380",
  measurementId: "G-J83VZJ4CNB"
};

interface Tile {
  corpseType: CorpseType | null;
  item: CorpseEffect | null; // `item`의 타입을 구체적으로 명시해야 할 수 있음
  active: boolean;
  disabled: boolean;
}

function App() {
  const { t } = useTranslation();

  const disabledIndexes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 22, 23, 24, 25, 26, 34, 35, 36, 41, 42, 43, 44, 46, 47, 50, 58, 59, 60, 61, 63, 64, 72, 76, 77, 78, 88, 89, 90, 98, 99, 106, 107, 115, 116, 127, 128]
  const [tiles, setTiles] = useState<Tile[]>(
    Array(17 * 8).fill(false).map((val, index) => ({
      corpseType: null,
      item: null,
      active: val,
      disabled: disabledIndexes.includes(index)
    }))
  );

  const CorpseTypes: CorpseType[] = ['demon', 'undead', 'beast', 'construct', 'humanoid'];

  const [selectedCorpseffect, setSelectedCorpseEffect] = useState<CorpseEffect | null>(null);
  const [selectedType, setSelectedType] = useState<CorpseType | null>(null);

  const handleTileClick = (index: any) => {
    if (selectedCorpseffect && selectedType) {
      const newTiles = [...tiles];
      if (!newTiles[index].disabled) {
        newTiles[index].active = !newTiles[index].active;
        if (newTiles[index].active) {
          newTiles[index].corpseType = selectedType;
          newTiles[index].item = {effectType: selectedCorpseffect.effectType, change: selectedCorpseffect.change, value: selectedCorpseffect.value }
        } else {
          newTiles[index].item = null;
        }
        setTiles(newTiles);
      }
    } else {
      if (!selectedType && !selectedCorpseffect) {
        alert('타입과 효과를 선택하세요')
      } else if (!selectedType) {
        alert('타입을 선택하세요')
      } else if (!selectedCorpseffect) {
        alert('효과를 선택하세요')
      }
    }
  };

  const handleTypeSelect = (type: CorpseType) => {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  return (
    <div className="App">
      <div className="top_container">
        <div className="grid">
          {tiles.map((tile, index) => {
            const tileInfo = ` CorpseType: ${tile.corpseType ? tile.corpseType : 'None'} 
  CorpseEffect: ${tile.item ? `${tile.item.effectType} ${tile.item.change} ${tile.item.value}`: 'None'}
            `;
            return (
              <div
              key={index}
              className={
                `tile ${tile.active ? 'filled' : ''} 
                ${tile.disabled ? 'disabled' : ''} 
                ${tile.item?.effectType === 'Horizontal' ? 'horizontal' : ''}
                ${tile.item?.effectType === 'Vertical' ? 'vertical' : ''}
                ${tile.item?.effectType === 'Adjacent' ? 'adjacent' : ''}
                ${tile.item?.effectType}_${tile.item?.change}
              `}
              onClick={() => handleTileClick(index)}
              title={tileInfo.trim()}
            >
              {tile.disabled ? 'X' : (
                tile.item?.effectType === 'Horizontal' ? 'H' :
                tile.item?.effectType === 'Vertical' ? 'V' : 
                tile.item?.effectType === 'Adjacent' ? 'A' : ''
              )}
              {!tile.disabled && tile.active &&tile.item?.effectType !== 'Horizontal' && tile.item?.effectType !== 'Vertical' && tile.item?.effectType !== 'Adjacent' ? 
              <> {t(`effect_type.${tile.item?.effectType}`)} <br/> {t(`${tile.item?.change}`)} </>: ''}
            </div>
            )
          })}
        </div>

      <div className="right-menu-container">
        <div className="background-container">
          {selectedType ? <div/> : <div className="header">{t('nav.choose_type')}</div>}
          {CorpseTypes.map((type) => (
            <Button
              key={type}
              variant="outlined"
              color={selectedType === type ? 'primary' : 'inherit'}
              onClick={() => handleTypeSelect(type)}
              style={{
                margin: '5px',
                borderColor: selectedType === type ? '#1976d2' : '#ccc',
                color: selectedType === type ? '#1976d2' : 'inherit',
              }}
            >
              {t(`corpse.${type}`)}
            </Button>
          ))}
        </div>

        <div className="background-container">
          <CorpseEffectList
            onSelectedCorpseEffect={setSelectedCorpseEffect}
          />
        </div>
      </div>
    </div>

    <div className="bottom_container">
      <TileEffectSummary tiles={tiles} /> 
    </div>
  </div>
  );
}
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default App;