import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { Card } from './Card';
import { Button } from '../form/Button';

export interface Item {
  id: number;
  text: string;
  value: string;
  display: JSX.Element;
}

export interface ContainerState {
  cards: Item[];
}

interface ItemsInput {
  label: string;
  value: string;
  display?: JSX.Element;
}

interface DragAndDrogListProps {
  items: ItemsInput[];
  onSubmit: (items: string[]) => Promise<void> | void;
}

export const DragAndDrogList = ({ items, onSubmit }: DragAndDrogListProps) => {
  const [cards, setCards] = useState(
    items.map((i, index) => ({
      id: index,
      text: i.label,
      value: i.value,
      display: i.display ?? <>{i.label}</>,
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
    (
      card: { id: number; text: string; display: JSX.Element },
      index: number,
    ) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.display ?? card.text}
          moveCard={moveCard}
        />
      );
    },
    [moveCard],
  );

  return (
    <div className="item-center flex flex-col">
      <p className="p-2 text-5xl font-light">Drag and Drop</p>
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
