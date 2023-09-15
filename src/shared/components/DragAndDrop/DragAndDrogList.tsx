import update from 'immutability-helper';
import type { FC } from 'react';
import { useCallback, useState, useEffect } from 'react';

import { Card } from './Card';
import { Button } from '../form/Button';

export interface Item {
  id: number;
  text: string;
  value: string;
}

export interface ContainerState {
  cards: Item[];
}

interface DragAndDrogListProps {
  items: Record<string, string>[];
  onSubmit: (items: string[]) => Promise<void> | void;
}
export const DragAndDrogList = ({ items, onSubmit }: DragAndDrogListProps) => {
  const [cards, setCards] = useState(
    items.map((i, index) => ({
      id: index,
      text: i.label,
      value: i.value,
    })),
  );

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    },
    [],
  );

  return (
    <div className="item-center flex flex-col">
      <div className="space-y-2 p-8">
        {cards.map((card, i) => renderCard(card, i))}
      </div>
      <Button
        color="blue"
        title="confirm"
        onClick={() => onSubmit(cards.map((c) => c.value))}
        className="absolute bottom-2 right-2"
      />
    </div>
  );
};
