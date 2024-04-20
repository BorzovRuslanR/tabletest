import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchItems({ setSearch }: Props) {
  const [input, setInput] = useState("");
  console.log("Render");
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex">
      <Input
        placeholder="Поиск по названию"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={ref}
      />
      <Button
        variant="search"
        onClick={() => {
          setSearch(input);
        }}
      >
        Поиск
      </Button>
    </div>
  );
}
