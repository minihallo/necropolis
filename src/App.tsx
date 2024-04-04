import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { CorpseType } from './types';
import CorpseEffect from './CorpseEffect';

function App() {
  const disabledIndexes = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 23, 24, 25, 26, 27, 34, 35, 36, 41, 42, 43, 44, 46, 47, 50, 58, 59, 60, 61, 63, 64, 72, 76, 77, 78, 88, 89, 90, 98, 99, 106, 107, 115, 116, 127, 128]
  const [tiles, setTiles] = useState(
    Array(17 * 8).fill(true).map((val, index) => ({
      active: val,
      disabled: disabledIndexes.includes(index)
    }))
  );

  const CorpseTypes: CorpseType[] = ['Demon', 'Undead', 'Beast', 'Construct', 'Humanoid'];

  const [selectedCorpseffect, setSelectedCorpseEffect] = useState<CorpseEffect | null>(null);
  const [selectedType, setSelectedType] = useState<CorpseType | null>(null);

  const handleTileClick = (index: any) => {
    const newTiles = [...tiles];
    if (!newTiles[index].disabled) {
      newTiles[index].active = !newTiles[index].active;
      setTiles(newTiles);
    }
  };

  const handleTypeSelect = (type: CorpseType) => {
    if (selectedType === type) {
      setSelectedType(null);  // 선택된 타입이 다시 클릭되면 선택을 해제
    } else {
      setSelectedType(type);  // 다른 타입이 클릭되면 선택을 업데이트
    }
  };

  return (
    <div className="App">
      <div className="grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile.active ? 'filled' : ''} ${tile.disabled ? 'disabled' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {tile.disabled ? 'X' : ''}
          </div>
        ))}
      </div>

      <div className="menu-container">
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
            {type}
          </Button>
        ))}
      </div>

    <CorpseEffect 
      onSelectedCorpseEffect={setSelectedCorpseEffect}
    />
  </div>
  );
}

export default App;