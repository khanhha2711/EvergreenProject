import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRef, useState } from "react";

const SearchInput = ({ setSearch, placeholder }) => {
  const [value, setValue] = useState("");
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(val);
    }, 500);
  };
  return (
    <div className="relative">
      <Search
        className="absolute text-gray-600 translate-y-2/3 left-2"
        size={15}
      />

      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-sm border px-8 py-2 rounded-sm w-full bg-card"
      />
    </div>
  );
};

export default SearchInput;
