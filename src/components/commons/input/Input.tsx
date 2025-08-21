// src/components/commons/input/Input.tsx
import React, { InputHTMLAttributes } from "react";
import styles from "./input.module.scss"; // Import SCSS for styling

// Define props, extending standard HTML input attributes
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label for the input
  errorMessage?: string; // Optional error message to display below the input
  // No specific 'variant' prop is needed here as styling can be applied via className
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  className = "", // Default to empty string if no class is provided
  ...rest // Capture all other standard HTML input attributes (like type, placeholder, value, onChange, etc.)
}) => {
  // Combine base input styles with any custom classes passed via props
  const inputClassName = `${styles.input} ${
    errorMessage ? styles.errorInput : ""
  } ${className}`.trim();

  return (
    <div className={styles.formGroup}>
      {/* Render label if provided */}
      {label && <label htmlFor={rest.id}>{label}</label>}
      <input
        className={inputClassName}
        {...rest} // Pass down all other standard input attributes
      />
      {/* Display error message if provided */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
