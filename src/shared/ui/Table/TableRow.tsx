import { memo } from "react";
import { motion } from "framer-motion";
import styles from "./Table.module.scss";
import { TableRowProps } from "./types";
import TableCell from "./TableCell";

const TableRow = <T,>({
  item,
  columns,
  rowHeight,
  onRowClick,
}: TableRowProps<T>) => {
  return (
    <motion.tr
      className={styles.row}
      style={{
        height: `${rowHeight}px`,
        cursor: onRowClick ? "pointer" : "",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      onClick={() => onRowClick && onRowClick(item)}
    >
      {columns.map((col) => (
        <TableCell<T> key={String(col.key)} item={item} column={col} />
      ))}
    </motion.tr>
  );
};

export default memo(TableRow) as typeof TableRow;
