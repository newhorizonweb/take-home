


import { create } from "zustand";
import { ListItem, DeletedListItem } from "./api/getListData";

type State = {
    cardData: ListItem[];
    removedCards: DeletedListItem[];
    expandedCardIds: number[];
};

type Actions = {
    setData: (newData: ListItem[]) => void;
    removeCard: (id: number) => void;
    toggleCardExpand: (id: number) => void;
    revertCard: (id: number) => void;
};

export const useDataStore = create<State & Actions>((set) => ({
    cardData: [],
    removedCards: [],
    expandedCardIds: [],

    setData: (newData) => set((state) => {

        // Filter out deleted cards from the new data
        const filteredData = newData.filter(
          card => !state.removedCards.some(removedCard => removedCard.id === card.id)
        );
    
        // Restore "expand" states
        const processedData = filteredData.map(card => ({
          ...card,
          isVisible: state.cardData.some(existingCard => 
            existingCard.id === card.id && existingCard.isVisible
          )
        }));
    
        return{
          cardData: processedData
        }
    }),

    removeCard: (id) => set((state) => {
        // Check if the card exists
        const cardToRemove = state.cardData.find(card => card.id === id);
        if (!cardToRemove) return state;
    
        return{
            // Remove the card from the array
            cardData: state.cardData.filter(card => card.id !== id),

            // Add it to the array with removed cards
            removedCards: [...state.removedCards, { 
                id: cardToRemove.id, 
                title: cardToRemove.title,
                isVisible: cardToRemove.isVisible 
            }],
        }
    }),

    toggleCardExpand: (id) => set((state) => {
        const isCurrentlyExpanded = state.expandedCardIds.includes(id);
        return{
            expandedCardIds: isCurrentlyExpanded 
                ? state.expandedCardIds.filter(cardId => cardId !== id)
                : [...state.expandedCardIds, id]
        }
    }),

    revertCard: (id) => set((state) => {
        // For future functionality:
        // reverting the cards to the "My Awesome List"

        // Some placeholders so TS does not whine
        console.log(id)
        return state;
    })

}));
