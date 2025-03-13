import { ReactNode, UIEvent, RefObject } from "react";

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T]) => ReactNode | string | number;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (item: T) => void;
  maxHeight?: number;
  rowHeight?: number;
}

export interface UseTableProps<T> {
  data: T[];
  maxHeight?: number;
  rowHeight: number;
}

export interface UseTableReturn<T> {
  visibleRowCount: number;
  bodyRef: RefObject<HTMLTableSectionElement | null>;
  visibleData: T[];
  handleScroll: (e: UIEvent<HTMLTableSectionElement>) => void;
}

export interface TableRowProps<T> {
  item: T;
  columns: {
    key: keyof T;
    title: string;
    render?: (value: T[keyof T]) => ReactNode | string | number;
  }[];
  rowHeight: number;
  onRowClick?: (item: T) => void;
}

export interface TableCellProps<T> {
  item: T;
  column: {
    key: keyof T;
    title: string;
    render?: (value: T[keyof T]) => ReactNode | string | number;
  };
}
