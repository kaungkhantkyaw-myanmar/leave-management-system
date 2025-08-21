// components/Layout.tsx
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "../styles/Layout.module.scss";

type ActiveLinkType = "check-inout" | "leave-requests" | "attendance";

export interface LayoutProps {
  children: ReactNode;
  activeSidebarLink: ActiveLinkType;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSidebarLink }) => {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <Sidebar activeLink={activeSidebarLink} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
