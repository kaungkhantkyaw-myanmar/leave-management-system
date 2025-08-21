// components/Navbar.tsx
import React from "react";
import styles from "../styles/Navbar.module.scss"; // We will create this CSS file

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div /> {/* Placeholder for potential logo or branding */}
      <div className={styles["nav-right"]}>
        <button className={styles["nav-btn"]}>Admin View</button>
        <div className={styles["profile-icon"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
          >
            <circle cx="16" cy="12" r="6" stroke="#222" strokeWidth="2" />
            <rect
              x="6"
              y="20"
              width="20"
              height="8"
              rx="4"
              stroke="#222"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
