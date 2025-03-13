import { useEffect, useRef, useState, UIEvent, useCallback } from "react";
import { debounce } from "../../utils/debounce";
import { UseTableProps, UseTableReturn } from "./types";

export const useTable = <T>({
  data,
  maxHeight,
  rowHeight,
}: UseTableProps<T>): UseTableReturn<T> => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLTableSectionElement | null>(null);
  const [visibleRowCount, setVisibleRowCount] = useState<number>(
    maxHeight ? Math.floor(maxHeight / rowHeight) : 10
  );
  const [visibleData, setVisibleData] = useState<T[]>([]);

  useEffect(() => {
    const updateVisibleRows = () => {
      if (bodyRef.current && containerRef.current) {
        const bodyHeight = bodyRef.current.clientHeight;
        setVisibleRowCount(Math.floor(bodyHeight / rowHeight));
      }
    };

    updateVisibleRows();
    window.addEventListener("resize", updateVisibleRows);

    return () => {
      window.removeEventListener("resize", updateVisibleRows);
    };
  }, [rowHeight]);

  useEffect(() => {
    setVisibleData(data.slice(0, visibleRowCount));
  }, [data, visibleRowCount]);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLTableSectionElement>) => {
      const scrollHeight = e.currentTarget.scrollHeight;
      const startIndex = Math.floor((scrollHeight + rowHeight) / rowHeight);
      const endIndex = startIndex + visibleRowCount;

      debounce(() => {
        setVisibleData((prev) => [
          ...prev,
          ...data.slice(startIndex, endIndex),
        ]);
      }, 50)();
    },
    [data, visibleRowCount, rowHeight]
  );

  return {
    visibleRowCount,
    bodyRef,
    visibleData,
    handleScroll,
  };
};
