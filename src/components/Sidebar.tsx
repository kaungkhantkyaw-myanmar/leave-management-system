import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "../styles/Sidebar.module.scss";

type ActiveLinkType = "check-inout" | "leave-requests" | "attendance";

interface SidebarProps {
  activeLink: ActiveLinkType;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <aside className={styles.sidebar}>
      <div
        className={`${styles["menu-item"]} ${
          activeLink === "check-inout" ? styles["menu-item-active"] : ""
        }`}
        onClick={() => handleNav("/check-inout")}
      >
        Check In/Out
      </div>
      <div
        className={`${styles["menu-item"]} ${
          activeLink === "leave-requests" ? styles["menu-item-active"] : ""
        }`}
        onClick={() => handleNav("/leave-requests")}
      >
        Leave Requests
      </div>
      {/* Attendance ကို admin role သာပြမယ် */}
      {status === "authenticated" && session?.user?.role === "admin" && (
        <div
          className={`${styles["menu-item"]} ${
            activeLink === "attendance" ? styles["menu-item-active"] : ""
          }`}
          onClick={() => handleNav("/attendance")}
        >
          Attendance
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
