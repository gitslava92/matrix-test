import { Column } from "../../../../shared/ui/Table/types";
import { SelectedAsset } from "../../model/types";

const validatedSumValue = (value: string | number) => {
  const numericValue = Number(value || 0);
  const toFixedValue = numericValue > 1 ? 2 : 8;
  return `${Number(numericValue.toFixed(toFixedValue)).toLocaleString("ru-RU", {
    minimumFractionDigits: toFixedValue,
    maximumFractionDigits: toFixedValue,
  })}$`;
};

export const columns: Column<SelectedAsset>[] = [
  {
    key: "name" as keyof SelectedAsset,
    title: "Name",
  },
  {
    key: "count" as keyof SelectedAsset,
    title: "Count",
    render: (value) => Number(value || 0).toLocaleString("ru-RU"),
  },
  {
    key: "price" as keyof SelectedAsset,
    title: "Price",
    render: (value) => validatedSumValue(value),
  },
  {
    key: "sum" as keyof SelectedAsset,
    title: "Total",
    render: (value) => validatedSumValue(value),
  },
  {
    key: "change" as keyof SelectedAsset,
    title: "Change per day",
    render: (value) => {
      const isPositive = Number(value || 0) >= 0;
      return (
        <span style={{ color: isPositive ? "green" : "red" }}>
          {isPositive
            ? `+${Number(value || 0).toFixed(2)}`
            : Number(value || 0).toFixed(2)}
          %
        </span>
      );
    },
  },
  {
    key: "share" as keyof SelectedAsset,
    title: "Portfolio share",
    render: (value) => <span>{`${Number(value || 0).toFixed(2)}%`}</span>,
  },
];
