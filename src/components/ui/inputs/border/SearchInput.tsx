import React, { useState } from "react";

interface SearchInputProps {
  placeholder: string;
  type?: string;
  onSubmit: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSubmit,
  type = "text",
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(inputValue);
    }
  };

  return (
    <div className="relative w-96">
      <span className="absolute top-1 left-2 pointer-events-none">
        <span className="material-symbols-outlined">search</span>
      </span>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="border border-border-secondary rounded-lg w-full pl-10 pr-2 py-1.5 text-sm font-normal"
      />
    </div>
  );
};

export default SearchInput;
