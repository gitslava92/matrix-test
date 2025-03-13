import { useState } from "react";
import styles from "./TextField.module.scss";
import { TextFieldProps } from "./types";

export const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
}: TextFieldProps) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(value !== "");

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={focus || value ? "" : placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${styles.input} ${error ? styles.error : ""}`}
        />
        {focus && (
          <label
            className={`${styles.label} ${
              focus || value ? styles.focused : ""
            }`}
          >
            {label}
          </label>
        )}
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
