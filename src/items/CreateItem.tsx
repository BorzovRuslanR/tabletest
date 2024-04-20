import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";


type Props = {
  fetchData: () => void;
};

type CreatedItem = {
  name: string;
  measurement_units: string;
  code: string;
  description: string;
}

export function CreateItem({ fetchData }: Props) {


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="newItem">
          <Plus
            className="w-[20px] h-[20px] mr-2"
           /> 
          Новая позиция
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData) as CreatedItem
          const res = await fetch("https://hcateringback-dev.unitbeandev.com/api/wh/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxMzY0NjgwMH0.NzTgxdETSrAQvjUD-gh4H9Ve2LUKOPDTo7lJo1i-dcvsRRxNjNWBFtFdgiPLvxxhMQS-nSbHLS3vMyxTL1eWjQ",
            },
            body: JSON.stringify(data),
          })
          if (res.ok) {
            fetchData();
          } else {
            console.log("Error");
          }
        }}>
          <SheetHeader>
          <div className="mr-[240px]">
            <svg width="400" height="84" viewBox="0 0 400 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 72 24)" fill="#FAF4F4"/>
              <path d="M39 45.4161C39 45.0467 39.188 44.7001 39.5046 44.486L47.3046 39.2112C47.7209 38.9296 48.2791 38.9296 48.6954 39.2112L56.4954 44.486C56.812 44.7001 57 45.0467 57 45.4161V55.2882C57 56.2336 56.1941 57 55.2 57H40.8C39.8059 57 39 56.2336 39 55.2882V45.4161Z" stroke="#A85757" stroke-width="2"/>
              <path d="M379.25 43.25L369.75 52.75M379.25 52.75L369.75 43.25" stroke="#352424" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <SheetTitle>Новая позиция</SheetTitle>
            <SheetDescription>
              Заполните все поля для создания новой номенклатуры
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor="name" className="text-left mb-[7px]">
                Название
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="measurement_units" className="text-left mb-[7px]">
                Единицы измерения
              </Label>
              <Input id="measurement_units" name="measurement_units" className="col-span-3" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="code" className="text-left mb-[7px]">
                Артикул/код
              </Label>
              <Input id="code" name="code" className="col-span-3" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="description" className="text-left mb-[7px]">
                Описание
              </Label>
              <Textarea  id="description" name="description" className="col-span-3 w-[352px] h-[140px]"/>
              {/* <Input id="description" name="description" className="col-span-3" /> */}
            </div>
          </div>
          <div className="mt-60">
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Подтвердить</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
