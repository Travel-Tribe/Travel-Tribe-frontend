import React from "react";

interface SelectBoxProps {
  options: string[];
  selectedValue?: string;
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = React.memo(
  ({ options, onSelect, selectedValue }: SelectBoxProps): JSX.Element => {
    return (
      <select
        className="select select-sm w-[140px] text-[16px] select-bordered border-custom-green focus:outline-none focus:ring-2 focus:ring-custom-green"
        onChange={onSelect}
        value={selectedValue}
      >
        <option value="선택">선택</option>
        {options?.map(option => (
          <option
            key={option}
            value={option}
            className="px-[12px] text-[16px] h-[30px] bg-white flex items-center cursor-pointer hover:bg-custom-green"
          >
            {option}
          </option>
        ))}
      </select>
    );
  },
);

export default SelectBox;
