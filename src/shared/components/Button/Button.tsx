import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./Buttom.module.scss";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
};

export const Button = ({
  onClick,
  children,
  className = "",
  disabled = false,
  variant = "primary",
  size = "medium",
}: ButtonProps) => {
  const buttonClassNames = classNames(
    styles.button,
    styles[variant],
    styles[size],
    className,
    {
      [styles.disabled]: disabled,
    }
  );

  return (
    <button className={buttonClassNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
