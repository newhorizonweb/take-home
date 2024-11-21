import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { ToggleButton } from "./Buttons";
import { useDataStore } from "../store";
import '../assets/buttons.css';

export const Entrypoint = () => {

  const { 
    setData,
    cardData,
    removedCards
  } = useDataStore();

  // Fetch data
  const listQuery = useGetListData();

  // Deleted cards visibility
  const [ displayDeleted, setDisplayDeleted ] = useState(false);

  useEffect(() => {
    if (listQuery.isLoading){
      return;
    }
    // Filter out the items with !isVisible
    setData(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading){
    return <Spinner />;
  }

  return (
    <div className="w-[800px] md:w-full max-w-full flex gap-16 px-3 flex-col md:flex-row md:justify-center">
      <div className="w-full md:w-[500px]">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">My Awesome List ({cardData.length})</h1>

          <button
              className="main-btn text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
              onClick={() => { listQuery.refetch() }}
              disabled={listQuery.isFetching /* Prevent unnecessary refreshes when already fetching */}
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {cardData.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              isDeleted={false}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-[500px]">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards {`(${removedCards.length})`}
          </h1>

          { /* Don't display the button when the deleted list is empty */ removedCards.length > 0 &&
            <ToggleButton
              text={displayDeleted ? "Hide" : "Reveal"}
              onClick={() => setDisplayDeleted(!displayDeleted)}
              isActive={displayDeleted}
            />
          }
        </div>
        {displayDeleted &&
          <div className="flex flex-col gap-y-3">
            {removedCards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                isDeleted={true}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
};
