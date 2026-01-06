import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./schadcn/Select";

export const Filters = () => {
  return (
    <div className="flex gap-2">
      <Select defaultValue="default">
        <SelectTrigger
          className="max-w-[120px]  rounded rounded-bl-md"
          size="sm"
        >
          <SelectValue placeholder="city" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">default</SelectItem>
          <SelectItem value="default">non implemented</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="default">
        <SelectTrigger className="w-[120px]  rounded rounded-bl-md" size="sm">
          <SelectValue placeholder="tech" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">default</SelectItem>
          <SelectItem value="default">non implemented</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
