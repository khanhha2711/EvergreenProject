import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";

export default function ComboboxComponent({
  placeholder,
  options,
  handleOnChange,
  value,
}) {
  const selectedLabel =
    options?.find((opt) => opt.value === value)?.label || "";
  return (
    <Combobox
      items={options}
      itemToStringValue={(option) => option?.label || ""}
      value={selectedLabel}
      onValueChange={(selectedValue) => {
        handleOnChange(selectedValue);
      }}
    >
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(option) => (
            <ComboboxItem key={option?.value} value={option?.value}>
              {option?.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
