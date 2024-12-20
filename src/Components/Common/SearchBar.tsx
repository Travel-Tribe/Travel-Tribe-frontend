import React, { useState } from "react";

interface SearchProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchBar = React.memo(
  ({ value, setValue }: SearchProps): JSX.Element => {
    const options: string[] = ["제목", "내용"];
    const [selectedOptions, setSelectedOptions] = useState<string>(options[0]);

    const handleSelect = (value: string) => {
      setSelectedOptions(value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    return (
      <div className="w-[480px] h-[36px] my-[30px] bg-white border border-black rounded-[10px] flex items-center relative z-0">
        <select
          value={selectedOptions}
          onChange={e => handleSelect(e.target.value)}
          className="w-[80px] h-full text-[16px] pl-[12px] bg-transparent outline-none cursor-pointer"
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="absolute left-[88px] h-[16px] w-[1px] bg-black"></div>

        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={value}
          onChange={handleInputChange}
          className="flex-grow text-[16px] pl-[12px] outline-none placeholder-gray-500"
        />
      </div>
    );
  },
);

export default SearchBar;
