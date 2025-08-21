import React, { useEffect, useState } from "react";
import styles from "../styles/CheckInOut.module.scss";

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour12: false });
};

const getToday = () => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const LOCATION = "R44X+86 Yangon, Myanmar (Burma)";

const CheckInOut: React.FC = () => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Content for the CheckInOut page
    <>
      {" "}
      {/* Use fragment as Layout provides the main structure */}
      <div className={styles["content"]}>
        <div className={styles["date-row"]}>
          <span>{getToday()}</span>
          <span className={styles["location"]}>
            <span role="img" aria-label="location">
              📍
            </span>{" "}
            {LOCATION}
          </span>
        </div>
        <div className={styles["time-row"]}>{time}</div>
        <div className={styles["btn-row"]}>
          <button className={styles["clockin-btn"]}>Clock In</button>
          <button className={styles["clockout-btn"]} disabled>
            Clock Out
          </button>
        </div>
      </div>
    </>
  );
};
CheckInOut.displayName = "CheckInOutPage";
export default CheckInOut;
