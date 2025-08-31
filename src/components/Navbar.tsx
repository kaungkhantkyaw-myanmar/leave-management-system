import React from "react";
import styles from "../styles/Navbar.module.scss";
import Button from "../components/commons/button/Button"; // Import the reusable Button

import { signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession(); // Get session data to check if user is logged in
  const userRole = session?.user?.role;
  // console.log(userRole);
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/signin" }); // Redirect to login page after logout
  };

  return (
    <nav className={styles.navbar}>
      <div /> {/* Placeholder for potential logo or branding */}
      <div className={styles["nav-right"]}>
        <div className={styles["profile-icon"]}>
          {/* User profile icon SVG */}
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
        {/* Show Logout button only if user is authenticated */}
        {status === "authenticated" && session?.user && (
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
