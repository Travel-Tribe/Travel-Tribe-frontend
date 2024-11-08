import React, { useState } from "react";

interface MultipleValueTextInputProps {
  className?: string;
  deleteButton?: JSX.Element;
  label?: string;
  labelClassName?: string;
  name?: string;
  onItemAdded?: (newItem: string, resultItems: string[]) => void;
  onItemDeleted?: (deletedItem: string, resultItems: string[]) => void;
  placeholder?: string;
  shouldAddOnBlur?: boolean;
  submitKeys?: string[];
  values?: string[];
}

const MultipleValueTextInput: React.FC<MultipleValueTextInputProps> = ({
  className = "",
  deleteButton = <span>&times;</span>,
  name = "",
  onItemAdded = () => null,
  onItemDeleted = () => null,
  placeholder = "",
  submitKeys = ["Enter", ","],
  values = [],
}) => {
  const [items, setItems] = useState(values);
  const [inputValue, setInputValue] = useState("");

  const addItem = (item: string) => {
    if (item && !items.includes(item)) {
      const newItems = [...items, item];
      setItems(newItems);
      onItemAdded(item, newItems);
    }
  };

  const deleteItem = (item: string) => {
    const newItems = items.filter(i => i !== item);
    setItems(newItems);
    onItemDeleted(item, newItems);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (submitKeys.includes(e.key)) {
      e.preventDefault();
      addItem(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className={className}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="mt-2 border px-2 py-1 rounded w-[100%]"
      />
      <div className="flex flex-wrap gap-2 mt-[20px] w-[100%]">
        {items.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-1 px-2 py-1 border rounded"
          >
            {item}
            <button onClick={() => deleteItem(item)}>{deleteButton}</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultipleValueTextInput;
