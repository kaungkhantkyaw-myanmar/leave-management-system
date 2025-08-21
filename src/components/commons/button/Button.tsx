import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.scss"; // Import SCSS for styling

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // The content of the button (text, icons, etc.)
  onClick?: () => void; // The click handler function
  className?: string; // To allow passing additional custom classes
  variant?: "primary" | "secondary" | "danger"; // Example variants for styling
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "", // Default to an empty string if no class is provided
  variant = "primary", // Default to 'primary' variant
  disabled,
  type = "button", // Default type to 'button' to prevent accidental form submission
  ...rest // Capture any other standard HTML button attributes
}) => {
  // Combine base styles, variant styles, and any custom classes passed via props
  const combinedClassName =
    `${styles.button} ${styles[variant]} ${className}`.trim();

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      type={type} // Set the type attribute
      {...rest} // Pass down any other remaining HTML attributes
    >
      {children}
    </button>
  );
};

export default Button;
