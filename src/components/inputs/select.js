import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export const SelectComponent = ({ placeHolder, options, onChange, value }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-card">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
