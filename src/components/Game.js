import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Grid from './Grid';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ROWS = 25;
const COLS = 50;

const x = getRandomInt(0, ROWS - 1);
const y = getRandomInt(0, COLS - 1);

const eat = Array(5);
for (let k = 0; k < 5; k++) {
  const e1 = getRandomInt(0, ROWS - 1);
  const e2 = getRandomInt(0, COLS - 1);
  eat[k] = { x: e1, y: e2 };
}

let board = Array(ROWS).fill('');
for (let i = 0; i < ROWS; i++) {
  board[i] = new Array(COLS);
  for (let j = 0; j < COLS; j++) {
    board[i][j] = '';
  }
}

const Game = () => {
  const [snake, setSnake] = useState([{ x, y }]);
  const [apples, setApples] = useState(eat);
  const [key, setKey] = useState('ArrowDown');

  useEffect(() => {
    const head = snake[0];
    const isEat = apples.some(p => p.x === head.x && p.y === head.y);
    if (isEat) {
      const n = apples.findIndex(p => p.x === head.x && p.y === head.y);
      setApples(apples.filter((_, i) => i !== n));
      setSnake((prevSnake) => { 
        const [tail] = prevSnake.slice(-1);
        //TO DO: snake grow
      });
    }
  }, [apples, snake]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prevSnake) => { 
        const head = prevSnake[0];
        let newHead = { ...head };
        switch (key) {
        case 'ArrowDown':
          newHead.x = newHead.x + 1; 
          break;
        case 'ArrowUp':
          newHead.x = newHead.x - 1;
          break;
        case 'ArrowRight':
          newHead.y = newHead.y + 1;
          break;
        case 'ArrowLeft':
          newHead.y = newHead.y - 1;
          break;
        }
        return [newHead, ...prevSnake.slice(1)];
      });
    }, 500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const listener = window.addEventListener('keydown', (e) => setKey(e.key));

    return () => window.removeEventListener('keydown', listener);
  }, []);

  return (
    <div>
      <Grid board={board} snake={snake} apples={apples} />
    </div>
  );
};

export default Game;
