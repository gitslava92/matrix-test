import styles from "./Table.module.scss";
import { TableProps } from "./types";
import { useTable } from "./useTable";
import TableRow from "./TableRow";

export const Table = <T,>({
  data,
  columns,
  rowKey,
  onRowClick,
  maxHeight,
  rowHeight = 42,
}: TableProps<T>) => {
  const { visibleRowCount, bodyRef, visibleData, handleScroll } = useTable<T>({
    data,
    maxHeight,
    rowHeight,
  });

  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr className={styles.row}>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody
        ref={bodyRef}
        className={styles.body}
        onScroll={handleScroll}
        style={{
          maxHeight: `${rowHeight * (visibleRowCount - 3)}px`,
        }}
      >
        {visibleData.map((item) => (
          <TableRow<T>
            key={String(item[rowKey])}
            item={item}
            columns={columns}
            rowHeight={rowHeight}
            onRowClick={onRowClick}
          />
        ))}
      </tbody>
    </table>
  );
};
