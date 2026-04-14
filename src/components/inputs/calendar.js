import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

export const CalenDarInput = ({ date, style, updateState }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          name="date"
          className="bg-card w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground focus:bg-card hover:bg-card hover:text-foreground hover:border-ring"
        >
          {date ? format(date, style) : <span>Chọn ngày</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => updateState(d)}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};
