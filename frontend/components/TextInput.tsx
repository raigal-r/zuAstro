import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="flex flex-col mb-8">
      <label className="text-left tracking-tight text-gray-600">{`${label}`}</label>
      <input
        className="bg-white border-solid border-2 border-aGreen rounded-md p-2 px-4 mt-4"
        type="text"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextInput;
