import React from 'react';
import styled from 'styled-components';

const Board = styled.table`
  border: 1px solid red;
`;

const Row = styled.tr`

`;

const Cell = styled.td`
  width: 20px;
  height: 20px;
  line-height: 1px;
`;

const Grid = ({ board = [], snake, apples}) => {
  const rows = board.map((item, i) => {
    const cells = item.map((cell, j) => {
      const isSnake = snake.filter(p => p.x === i && p.y === j).length > 0;
      const isEat = apples.filter(p => p.x === i && p.y === j).length > 0;
      if (isSnake && isEat) {
        console.log('eat');
      }
      return <Cell key={`cell_${i}_${j}`}>{isSnake ? '*' :  isEat ? '0' : ''}</Cell>;
    });
    return <Row key={`row_${i}`}>{cells}</Row>;
  });

  return (
    <div>
      <Board>
        <tbody>
          {rows}
        </tbody>
      </Board>
    </div>
  );
};

export default Grid;
