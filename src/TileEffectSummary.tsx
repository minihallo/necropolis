
import React, { useState } from 'react';
import './App.css';
import { ChangeType, CorpseType, CorpseEffect } from './types';

interface Tile {
    corpseType: CorpseType | null
    item: CorpseEffect | null;
    active: boolean;
    disabled: boolean;
}
  
interface TileEffectSummaryProps {
    tiles: Tile[];
}

interface EffectSummary {
    [key: string]: {
        effectType: string;
        change: ChangeType;
        value: number;
        count: number;
    };
}

function TileEffectSummary({ tiles }: TileEffectSummaryProps) {
    const ROW_LENGTH = 17;
    const COLUMN_LENGTH = 8;

    const tilesCopy = tiles.map(tile => ({
        ...tile,
        item: tile.item ? { ...tile.item } : null,
    }));


    // 가로 및 세로 효과 적용
    tilesCopy.forEach((tile, index) => {
        if (!tile.active || tile.disabled || !tile.item) return;
    
        const { item } = tile;
    
        switch (item.effectType) {
            case 'Horizontal': {
                const rowStart = index - (index % ROW_LENGTH);
                const rowEnd = rowStart + ROW_LENGTH;
                
                let start = rowStart;
                let end = rowEnd;
    
                //findStart
                for (let i = index; i > rowStart; i--) {
                    if (tiles[i].disabled) {
                        start = i+1;
                        break;
                    }
                }
                //findEnd
                for (let i = index; i < rowEnd; i++) {
                    if (tiles[i].disabled) {
                        end = i-1;
                        break;
                    }
                }
    
                for (let i = start; i<end; i++) {
                    if (tilesCopy[i] && tilesCopy[i].item) {
                        if (tilesCopy[i].item!.effectType !== 'Horizontal'
                         && tilesCopy[i].item!.effectType !== 'Vertical'
                         && tilesCopy[i].item!.effectType !== 'Adjacent') {
                            tilesCopy[i].item!.value += tilesCopy[i].item!.value * (item.value / 100);
                        }
                    }
                }
                break;
            }
            case 'Vertical': {
                let start = index % 17;
                let end = tiles.length; // 세로 검사를 위한 끝 설정
            
                // 위쪽 방향으로 disabled 상태를 검사하고 범위를 결정
                for (let i = index - ROW_LENGTH; i >= 0; i -= ROW_LENGTH) {
                    if (tiles[i].disabled) {
                        start = i + ROW_LENGTH;
                        break;
                    }
                }
            
                // 아래쪽 방향으로 disabled 상태를 검사하고 범위를 결정
                for (let i = index + ROW_LENGTH; i < tiles.length; i += ROW_LENGTH) {
                    if (tiles[i].disabled) {
                        end = i - ROW_LENGTH;
                        break;
                    }
                }

                for (let i = start; i <= end; i += ROW_LENGTH) {
                    if (tilesCopy[i] && tilesCopy[i].item && i !== index) {
                        if (tilesCopy[i].item!.effectType !== 'Horizontal'
                            && tilesCopy[i].item!.effectType !== 'Vertical'
                            && tilesCopy[i].item!.effectType !== 'Adjacent') {
                            tilesCopy[i].item!.value += tilesCopy[i].item!.value * (item.value / 100);
                        }
                    }
                }
                break;
            }
            case 'Adjacent': {
                const adjacentIndices = [
                    index - 1, // 왼쪽
                    index + 1, // 오른쪽
                    index - ROW_LENGTH, // 위
                    index + ROW_LENGTH // 아래
                ];
            
                adjacentIndices.forEach(adjIndex => {
                    if (adjIndex >= 0 && adjIndex < tilesCopy.length) {
                        const adjTile = tilesCopy[adjIndex];
            
                        // 행의 시작과 끝 경계 검사 (왼쪽과 오른쪽 타일에 대해)
                        if ((adjIndex % ROW_LENGTH === 0 && index % ROW_LENGTH === ROW_LENGTH - 1) ||
                            (adjIndex % ROW_LENGTH === ROW_LENGTH - 1 && index % ROW_LENGTH === 0)) {
                            return; // 인접하지 않으므로 처리하지 않음
                        }
            
                        if (!adjTile.disabled && adjTile.item) {
                            if (adjTile.item.effectType !== 'Horizontal' && adjTile.item.effectType !== 'Vertical' && adjTile.item.effectType !== 'Adjacent') {
                                if (adjTile.corpseType === tile.corpseType)
                                adjTile.item.value += adjTile.item.value * (item.value / 100);
                            }
                        }
                    }
                });
                break;
            }
        }
    });
    
    const effectsSummary = tilesCopy.reduce<EffectSummary>((acc, tile) => {
        if (tile.active && !tile.disabled && tile.item
            && tile.item.effectType !== 'Horizontal'
            && tile.item.effectType !== 'Vertical'
            && tile.item.effectType !== 'Adjacent') {
            const key = `${tile.item.effectType}-${tile.item.change}`;
            if (!acc[key]) {
                acc[key] = { ...tile.item, count: 1 };
            } else {
                acc[key].value += tile.item.value;
                acc[key].count += 1;
            }
        }
        return acc;
    }, {} as EffectSummary);
    
    return (
        <div className="tile-effect-summary">
            <ul>
                {Object.entries(effectsSummary).map(([key, effect]) => (
                    <p key={key}>{effect.effectType} {effect.change} - {Math.floor(effect.value)} (Count: {effect.count})</p>
                ))}
            </ul>
        </div>
    );
}

export default TileEffectSummary;