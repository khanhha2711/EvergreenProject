import SearchInput from "./searchInput";
import { SelectComponent } from "./select";

const SearchAndFilter = ({ onSearch, onFilter, status, isFilter = true,placeholder }) => {
  return (
    <div className="flex gap-4 ">
      <SearchInput setSearch={onSearch} placeholder={placeholder} />
      {isFilter && (
        <div>
          <SelectComponent
            placeHolder="Lọc trạng thái"
            options={status}
            onChange={onFilter}
          />
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
