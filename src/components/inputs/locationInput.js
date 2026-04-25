import { useEffect, useRef, useState } from "react";
import { location } from "@/service/locationService";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "@base-ui/react";

export default function LocationInput({ diaDiem, value }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(value);
    }
  }, [value]);

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

      setLoading(true);
      const data = await location(value + ", việt nam"); 
      setSuggestions(data);
      setLoading(false);
    }, 300);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
      diaDiem(query); 
    }, 150);
  };

  const splitAddress = (place_name, text) => {
    return {
      main: text,
      sub: place_name.replace(text + ", ", ""),
    };
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={handleBlur}
          placeholder="Nhập địa điểm"
          className="text-sm border pl-8 pr-8 py-2 rounded-md w-full bg-card"
        />

        {loading && (
          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 size-4 animate-spin" />
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-20 top-full left-0 w-full bg-white border rounded-md shadow mt-1 max-h-64 overflow-y-auto">
          {suggestions.map((item) => {
            const addr = splitAddress(item.place_name, item.text);

            return (
              <div
                key={item.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  setQuery(item.place_name);
                  setSuggestions([]);
                  diaDiem(item.place_name);
                }}
              >
                <div className="text-sm font-medium">{addr.main}</div>
                <div className="text-xs text-gray-500 truncate">{addr.sub}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
