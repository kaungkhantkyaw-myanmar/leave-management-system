// pages/attendance.tsx
import React, { useState } from "react";
import styles from "../styles/Attendance.module.scss";

// Dummy data for the table, matching the screenshot's columns and format
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

// Define the props interface for DateNavigator
interface DateNavigatorProps {
  currentDate: string;
  onPrev: () => void;
  onNext: () => void;
}

// Component for the date navigation in the header
const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onPrev,
  onNext,
}) => {
  return (
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
};

const AttendancePage: React.FC = () => {
  // State for the current date displayed in the header
  const [currentDate, setCurrentDate] = useState("2025 Aug 1");

  // State for search term and filtered data
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(attendanceData);

  // --- Date Navigation Handlers ---
  const handlePrevDate = () => {
    // Basic date decrement logic. For a real app, use a date library like date-fns or moment.js.
    const currentDateParts = currentDate.split(" ");
    const day = parseInt(currentDateParts[2]);
    if (!isNaN(day) && day > 1) {
      setCurrentDate(
        `${currentDateParts[0]} ${currentDateParts[1]} ${day - 1}`
      );
    } else {
      console.log("Need logic for changing month/year.");
    }
  };

  const handleNextDate = () => {
    // Basic date increment logic.
    const currentDateParts = currentDate.split(" ");
    const day = parseInt(currentDateParts[2]);
    if (!isNaN(day)) {
      setCurrentDate(
        `${currentDateParts[0]} ${currentDateParts[1]} ${day + 1}`
      );
    } else {
      console.log("Need logic for changing month/year.");
    }
  };

  // --- Search Functionality ---
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const results = attendanceData.filter(
      (item) =>
        item.staffName.toLowerCase().includes(term) ||
        item.staffId.includes(term)
    );
    setFilteredData(results);
  };

  // Set the display name for _app.tsx to manage layout context
  AttendancePage.displayName = "AttendancePage";

  return (
    <>
      {/* Header Section (Simplified) */}
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
          {/* No Report or Add buttons are shown in this specific screenshot */}
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

export default AttendancePage;
