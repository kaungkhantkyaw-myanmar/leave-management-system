import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/Attendance.module.scss";

// Dummy data for the table
const attendanceData = [
  {
    id: 1,
    staffName: "Bagus Fikri",
    staffId: "39486846",
    clockInOut: "9:00AM ~ 5:00PM",
    overtime: "1",
    location: "大阪府",
  },
  {
    id: 2,
    staffName: "Ihdizein",
    staffId: "34534543",
    clockInOut: "9:00AM ~ 5:00PM",
    overtime: "-",
    location: "大阪府",
  },
  {
    id: 3,
    staffName: "Mufti Hidayat",
    staffId: "827473837",
    clockInOut: "9:00AM ~ 5:00PM",
    overtime: "1",
    location: "大阪府",
  },
  {
    id: 4,
    staffName: "Fauzan Ardiansyah",
    staffId: "39486846",
    clockInOut: "9:00AM ~ 5:00PM",
    overtime: "-",
    location: "大阪府",
  },
  {
    id: 5,
    staffName: "Raihan Fikri",
    staffId: "92884744",
    clockInOut: "9:00AM ~ 5:00PM",
    overtime: "1",
    location: "大阪府",
  },
  {
    id: 6,
    staffName: "Ifan",
    staffId: "90029388",
    clockInOut: "9:00AM ~ 5:00PM",
    overtime: "-",
    location: "大阪府",
  },
];

// Date nav component
interface DateNavigatorProps {
  currentDate: string;
  onPrev: () => void;
  onNext: () => void;
}
const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onPrev,
  onNext,
}) => (
  <div className={styles["date-navigator"]}>
    <button className={styles["nav-arrow"]} onClick={onPrev}>
      &#9664;
    </button>
    <span className={styles["current-date"]}>{currentDate}</span>
    <button className={styles["nav-arrow"]} onClick={onNext}>
      &#9654;
    </button>
  </div>
);

const AttendancePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/");
    }
  }, [status, session, router]);

  // States
  const [currentDate, setCurrentDate] = useState("2025 Aug 1");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(attendanceData);

  // Date Navigation Handlers
  const handlePrevDate = () => {
    const parts = currentDate.split(" ");
    const day = parseInt(parts[2]);
    if (!isNaN(day) && day > 1) {
      setCurrentDate(`${parts[0]} ${parts[1]} ${day - 1}`);
    }
  };
  const handleNextDate = () => {
    const parts = currentDate.split(" ");
    const day = parseInt(parts[2]);
    if (!isNaN(day)) {
      setCurrentDate(`${parts[0]} ${parts[1]} ${day + 1}`);
    }
  };

  // Search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      attendanceData.filter(
        (item) =>
          item.staffName.toLowerCase().includes(term) ||
          item.staffId.includes(term)
      )
    );
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "authenticated" && session?.user?.role !== "admin") {
    return <div>Forbidden: You don&apos;t have access to this page.</div>;
  }

  return (
    <>
      <div className={styles["attendance-header"]}>
        <div className={styles["attendance-title-container"]}>
          <h1 className={styles.title}>Attendance</h1>
          <DateNavigator
            currentDate={currentDate}
            onPrev={handlePrevDate}
            onNext={handleNextDate}
          />
        </div>
        <div className={styles["header-search-actions"]}>
          <div className={styles["search-container"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="m11.713 11.297 3.141 3.142a.25.25 0 0 1 0 .354l-.354.354a.25.25 0 0 1-.354 0L11.094 11.707a4.5 4.5 0 1 1 1.019-1.019z" />
              <path d="M6.5 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0-1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
            </svg>
            <input
              type="text"
              placeholder="Name, etc.,"
              className={styles["search-input"]}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      {/* Table Section */}
      <div className={styles["table-section"]}>
        <table className={styles["attendance-table"]}>
          <thead>
            <tr>
              <th>Staff</th>
              <th>Check-in & Out</th>
              <th>Overtime</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles["staff-info"]}>
                    <div className={styles["staff-avatar"]}>
                      {item.staffName.charAt(0)}
                    </div>
                    <div className={styles["staff-details"]}>
                      <span className={styles.name}>{item.staffName}</span>
                      <span className={styles.id}>StaffID: {item.staffId}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles["clock-times"]}>
                    <span className={styles.clockin}>{item.clockInOut}</span>
                  </div>
                </td>
                <td className={styles.overtime}>{item.overtime}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
AttendancePage.displayName = "AttendancePage";
export default AttendancePage;
