import { memo } from "react";
import { TableCellProps } from "./types";

const TableCell = <T,>({ item, column }: TableCellProps<T>) => {
  return (
    <td>
      {column.render
        ? column.render(item[column.key])
        : item[column.key]?.toString()}
    </td>
  );
};

export default memo(TableCell) as typeof TableCell;
