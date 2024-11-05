import React, { useState } from "react";

const SearchBar = React.memo((): JSX.Element => {
  const options = ["제목", "내용"];
  const [selectedOptions, setSelectedOptions] = useState(options[0]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const handleSelect = (value: string) => {
    setSelectedOptions(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-[480px] h-[36px] mt-[30px] mb-[30px] border border-black rounded-[10px] flex items-center relative z-0">
      <select
        value={selectedOptions}
        onChange={e => handleSelect(e.target.value)}
        className="w-[80px] h-full text-[16px] pl-[12px] bg-transparent outline-none cursor-pointer appearance-none"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="relative flex items-center justify-center">
        <div className="absolute h-[14px] w-[1px] bg-black"></div>
      </div>

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleInputChange}
        className="flex-grow text-[16px] pl-[12px] outline-none placeholder-gray-500"
      />
    </div>
  );
});

export default SearchBar;
