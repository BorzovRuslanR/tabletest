import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  pageSize: number;
  setPageSize: (value: number) => void;
};

export default function SelectCount({ pageSize, setPageSize }: Props) {
  return (
    <Select onValueChange={(value) => setPageSize(+value)} value={String(pageSize)}>
      <SelectTrigger className="w-[76px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
      </SelectContent>
    </Select>
  );
}
