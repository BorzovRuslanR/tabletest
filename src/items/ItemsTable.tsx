import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import TablePagination from "./TablePagination";
import SelectCount from "./SelectCount";
import SearchItems from "./SearchItems";
import { Button } from "@/components/ui/button";
import { CreateItem } from "./CreateItem";
import { EditItem } from "./EditItem";
import { ArrowDownAz, ArrowDownUp, ArrowUpAz } from "lucide-react";

type Data = {
  id: number;
  name: string;
  measurement_units: string;
  code: string;
  description: string;
};

export function ItemsTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC" | null>(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data[]>([]);
//   const [render, setRender] = useState(0);
  function fetchData() {
    fetch(
        `https://hcateringback-dev.unitbeandev.com/api/wh/items?page=${page}&pageSize=${pageSize}&itemName=${search}` +
          (sort ? `&sortOrder=${sort}` : ""),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxMzY0NjgwMH0.NzTgxdETSrAQvjUD-gh4H9Ve2LUKOPDTo7lJo1i-dcvsRRxNjNWBFtFdgiPLvxxhMQS-nSbHLS3vMyxTL1eWjQ",
          },
        }
      )
        .then((res) => {
          if (res.ok) return res.json(); // 200 - 299
          return Promise.reject("Something went wrong");
        })
        .then(({ result, total }: { result: Data[]; total: number }) => {
          setData(
            result.map((item) => {
              return {
                id: item.id,
                name: item.name,
                measurement_units: item.measurement_units,
                code: item.code,
                description: item.description,
              };
            })
          );
          setPageTotal(total);
        })
        .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search, sort]);

  return (
    <div>
        <div className="flex justify-between mx-[20px] my-[25px] mb-[45px]">
            <div className="flex items-center gap-2 ">
              <h1 className="font-inter font-semibold text-[32px] leading-38.4 tracking-tighter">Номенклатура</h1>
              <p className="bg-[#A85757] text-white rounded-sm py-1 px-1">{pageTotal} единиц</p>
            </div>
                  <div className="flex gap-2">
                    <SearchItems search={search} setSearch={setSearch} />
                    <CreateItem fetchData={fetchData} />
                  </div>
        </div>
      <Table>
        <TableHeader className="text-muted-foreground bg-slate-200">
          <TableRow>
            <TableHead className="flex content-center items-center gap-2">
                Название
              <Button size={"iconSm"} onClick={() => setSort(sort === "ASC" ? "DESC" : "ASC")}>
                {sort === 'ASC' ? <ArrowUpAz /> : sort === 'DESC' ? <ArrowDownAz /> : <ArrowDownUp />}
              </Button>
            </TableHead>
            <TableHead>Единица измерения</TableHead>
            <TableHead>Артикул/код</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="text-left">
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.measurement_units}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell className="text-right"><EditItem item={item} setData={setData}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-[28px]">
          <TablePagination
            current={page}
            total={Math.ceil(pageTotal / pageSize)}
            setCurrent={setPage}
          />
          <div className="flex gap-4 items-center mr-[20px]">
            <p className="font-inter text-[14px] leading-20 tracking-tighter">Показывать по:</p>
            <SelectCount pageSize={pageSize} setPageSize={setPageSize} />
          </div>
      </div>
    </div>
  );
}
