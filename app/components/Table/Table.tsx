import {Table as HeroTable,TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import {ReactNode} from "react";
import {DataCell, IColumnConfigItem} from "./types";

interface ITableProps <R, K extends keyof R = keyof R>{
  headerConfig: IColumnConfigItem<K>[]
  renderCell: (row: R, key: K) => ReactNode
  data: R[]
  noResultsText?: string
}

export default function Table<R extends DataCell<keyof R>>({
  headerConfig,
  data,
  renderCell,
  noResultsText
}: ITableProps<R>) {
  return (
    <HeroTable>
      <TableHeader>
        {headerConfig.map(({ title, key }) => (
          <TableColumn key={String(key)} className="text-base">
            {title ?? ''}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={noResultsText}
        items={data}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof R)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </HeroTable>
  )
}
