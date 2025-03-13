import { Column } from "../../../../shared/ui/Table/types";
import { Asset } from "../../api";

const validatedSumValue = (value: string | number) => {
  const numericValue = Number(value || 0);
  const toFixedValue = numericValue > 1 ? 2 : 8;
  return `${Number(numericValue.toFixed(toFixedValue)).toLocaleString("ru-RU", {
    minimumFractionDigits: toFixedValue,
    maximumFractionDigits: toFixedValue,
  })}$`;
};

export const columns: Column<Asset>[] = [
  {
    key: "symbol" as keyof Asset,
    title: "Name",
  },
  {
    key: "lastPrice" as keyof Asset,
    title: "Price",
    render: (value) => validatedSumValue(value),
  },
  {
    key: "priceChangePercent" as keyof Asset,
    title: "Сhange per day",
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
];
