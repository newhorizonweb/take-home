import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, RevertButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon } from "./icons";
import { useDataStore } from "../store";
import '../assets/list.css';

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
  isDeleted: boolean;
};

export const Card: FC<CardProps> = ({ id, title, description, isDeleted }) => {

  const {
    removeCard,
    expandedCardIds,
    toggleCardExpand,
    revertCard
   } = useDataStore();

  // Check if the card should be expanded by default
  const isCardExpand = expandedCardIds.includes(id);

  return (
    <div className={`card border border-black px-2 py-1.5
      ${isCardExpand ? "card-expand" : ""}
    `}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          { !isDeleted ? /* Render the buttons based on the card state */
            <>
              <ExpandButton onClick={() => toggleCardExpand(id)}>
                <ChevronDownIcon />
              </ExpandButton>
              <DeleteButton
                  onClick={() => removeCard(id)}
              />
            </> :
            <RevertButton
              onClick={() => revertCard(id)}
            />
          }
        </div>
      </div>
      { description && <p className="text-sm">{description}</p> }
    </div>
  );
};
