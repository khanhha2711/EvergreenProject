import { useEffect, useRef, useState } from "react";
import { location } from "@/service/locationService";
import { Map, MapPin } from "lucide-react";
import { Input } from "@base-ui/react";

export default function LocationInput({ diaDiem, value }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (!value) {
        setSuggestions([]);
        return;
      }

      const data = await location(value);
      setSuggestions(data);
    }, 300);
  };
  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="icon absolute translate-y-1/2 translate-x-2" />
        <Input
          value={value || query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Nhập địa điểm"
          className="text-sm border px-8 py-2 rounded-sm w-full bg-card"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 top-full left-0 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="px-3 py-2 hover:bg-accent/20 cursor-pointer"
              onClick={() => {
                setQuery(item.place_name);
                setSuggestions([]);
                diaDiem(item.place_name);
              }}
            >
              {item.place_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
