import { STATES } from "@/constants/filter";
import SearchInput from "./inputs/searchInput";
import { SelectComponent } from "./inputs/select";

const SearchAndFilter = ({ onSearch, onFilter }) => {
  return (
    <div className="flex gap-4 ">
      <SearchInput setSearch={onSearch} />
      <div>
        <SelectComponent
          placeHolder="Lọc trạng thái"
          options={STATES}
          onChange={onFilter}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
