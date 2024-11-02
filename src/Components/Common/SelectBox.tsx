import React, { useState, useEffect, useRef } from "react";
import dropDown from "../../assets/icons/arrow_drop_down.svg";
import dropUp from "../../assets/icons/arrow_drop_up.svg";

interface SelectBoxProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SelectBox = React.memo(
  ({ options, selectedValue, onSelect }: SelectBoxProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const selectBoxRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(prev => !prev);
    const handleOptionSelect = (value: string) => {
      onSelect(value);
      setIsOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectBoxRef.current &&
          !selectBoxRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={selectBoxRef}>
        <div
          className="w-[140px] h-[36px] border border-custom-green rounded-[10px] px-[12px] text-[16px] flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedValue}

          {isOpen ? (
            <img src={dropUp} alt="DropUp Icon" className="ml-auto" />
          ) : (
            <img src={dropDown} alt="Dropdown Icon" className="ml-auto" />
          )}
        </div>

        {isOpen && (
          <div className="absolute w-[120px] mt-1 border rounded-[10px] shadow-lg overflow-hidden">
            {options.map(option => (
              <div
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="px-[12px] text-[16px] h-[36px] flex items-center cursor-pointer hover:bg-custom-green"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

export default SelectBox;
