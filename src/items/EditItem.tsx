import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { EditIcon } from "lucide-react";

type Props = {
  item: EditedItem
  setData: React.Dispatch<React.SetStateAction<EditedItem[]>>
};

type EditedItem = {
  id: number;
  name: string;
  measurement_units: string;
  code: string;
  description: string;
}

export function EditItem({ item, setData }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <EditIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData) as Omit<EditedItem, 'id'>
          const res = await fetch("https://hcateringback-dev.unitbeandev.com/api/wh/items/" + item.id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxMzY0NjgwMH0.NzTgxdETSrAQvjUD-gh4H9Ve2LUKOPDTo7lJo1i-dcvsRRxNjNWBFtFdgiPLvxxhMQS-nSbHLS3vMyxTL1eWjQ",
            },
            body: JSON.stringify(data),
          })
          if (res.ok) {
            setData((prev) => {
              return prev.map((i) => {
                if (i.id === item.id) {
                  return {...data, id: item.id}
                }
                return i
              })
            });
          } else {
            console.log("Error");
          }
        }}>
          <SheetHeader>
            <SheetTitle>{item.name}</SheetTitle>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor="name" className="text-left mb-[7px]">
                Название
              </Label>
              <Input id="name" name="name" className="col-span-3" defaultValue={item.name} />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="measurement_units" className="text-left mb-[7px]">
                Единицы измерения
              </Label>
              <Input id="measurement_units" name="measurement_units" className="col-span-3" defaultValue={item.measurement_units} />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="code" className="text-left mb-[7px]">
                Артикул/код
              </Label>
              <Input id="code" name="code" className="col-span-3" defaultValue={item.code} />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="description" className="text-left mb-[7px]">
                Описание
              </Label>
              <Textarea  id="description" name="description" className="col-span-3 w-[352px] h-[140px]" defaultValue={item.description} />
            </div>
          </div>
          <div className="mt-60">
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Редактировать</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
