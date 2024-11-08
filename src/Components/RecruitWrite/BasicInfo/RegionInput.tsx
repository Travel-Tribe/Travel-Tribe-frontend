import React from "react";
import { useTravelData } from "../../../Hooks/useTravelData";
import MultipleValueTextInput from "../../Common/MultipleValueTextInput";

const RegionInput = React.memo((): JSX.Element => {
  const { updateTravelData } = useTravelData();

  const handleOnItemAdded = (newItem: string, resultItems: string[]) => {
    updateTravelData("region", resultItems.join(" "));
  };

  const handleOnItemDeleted = (deletedItem: string, resultItems: string[]) => {
    updateTravelData("region", resultItems.join(","));
  };

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">도시:</p>
      <MultipleValueTextInput
        className="w-[350px]"
        onItemAdded={(item, allItems) => {
          handleOnItemAdded(item, allItems);
        }}
        onItemDeleted={(item, allItems) => handleOnItemDeleted(item, allItems)}
        label="Items"
        name="item-input"
        placeholder="enter키를 통해 연속입력이 가능합니다."
      />
    </div>
  );
});

export default RegionInput;
