// pages/leave-requests.tsx
import React, { useState, useEffect } from "react";
import styles from "../styles/LeaveRequests.module.scss";
import ApplyLeaveModal, { LeaveFormData } from "../components/ApplyLeaveModal";

const leaveHistory = [
  {
    dates: "April 25",
    type: "Unpaid Leave",
    mode: "Full Day",
    days: 1,
    reason: "Emergency",
    submittedOn: "Apr 25",
    status: "Pending",
    id: 1,
  },
  {
    dates: "Mar 25",
    type: "Paid Leave",
    mode: "Half-day",
    days: 0.5,
    reason: "Family Issues",
    submittedOn: "Apr 23",
    status: "Approved",
    id: 2,
  },
  {
    dates: "Feb 28, Mar 1, 2",
    type: "Maternity",
    mode: "Multi-days",
    days: 3,
    reason: "Casual",
    submittedOn: "Apr 23",
    status: "Rejected",
    id: 3,
  },
];

const LeaveRequests: React.FC = () => {
  const [year, setYear] = useState(2025);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOpenDropdownId(null);
  };

  const handleLeaveFormSubmit = (leaveData: LeaveFormData) => {
    console.log("Submitted Leave Data:", leaveData);
    // alert(
    //   `Leave Request Submitted:\nType: ${leaveData.leaveType}\nDates: ${leaveData.leaveDates}\nReason: ${leaveData.reason}`
    // );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Cast event.target to Element for .closest()
      const targetElement = event.target as Element;

      if (
        openDropdownId !== null &&
        !targetElement.closest(".actions-container")
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  return (
    <>
      <div className={styles["summary-cards"]}>
        <div className={styles["card"]}>
          <div className={styles["card-value"]}>20</div>
          <div className={styles["card-label"]}>Leave(s) allowed</div>
        </div>
        <div className={styles["card"]}>
          <div className={styles["card-value"]}>16.5</div>
          <div className={styles["card-label"]}>Available Leavees</div>
        </div>
        <div className={styles["card"]}>
          <div className={styles["card-value"]}>16.5</div>
          <div className={styles["card-label"]}>Leaves Taken</div>
        </div>
        <div className={styles["renewal-info"]}>Renew at May, 25</div>
      </div>

      <div className={styles["history-section"]}>
        <div className={styles["history-header"]}>
          <span>Leave Request History</span>
          <div className={styles["year-selector"]}>
            <button
              className={styles["nav-arrow"]}
              onClick={() => handleYearChange(year - 1)}
            >
              &#9664;
            </button>
            <div className={styles["year-display"]}>
              <span>{year}</span>
            </div>
            <button
              className={styles["nav-arrow"]}
              onClick={() => handleYearChange(year + 1)}
            >
              &#9654;
            </button>
          </div>
          <button className={styles["request-leave-btn"]} onClick={openModal}>
            Request Leave
          </button>
        </div>

        <table className={styles["history-table"]}>
          <thead>
            <tr>
              <th>Dates Requested</th>
              <th>Type</th>
              <th>Mode</th>
              <th>No. of days</th>
              <th>Reason</th>
              <th>Submitted On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((request) => (
              <tr key={request.id}>
                <td>{request.dates}</td>
                <td>{request.type}</td>
                <td>{request.mode}</td>
                <td>{request.days}</td>
                <td>{request.reason}</td>
                <td>{request.submittedOn}</td>
                <td>
                  <span
                    className={`${styles["status-badge"]} ${
                      styles[request.status.toLowerCase()]
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  {" "}
                  {/* Added class for styling the TD */}
                  <div
                    className={styles["actions-container"]}
                    onClick={() => toggleDropdown(request.id)}
                  >
                    ...
                    {openDropdownId === request.id && (
                      <div className={styles["actions-dropdown"]}>
                        <div
                          className={styles["dropdown-item"]}
                          onClick={() =>
                            alert(`Edit clicked for row ${request.id}!`)
                          }
                        >
                          Edit
                        </div>
                        <div
                          className={styles["dropdown-item"]}
                          onClick={() =>
                            alert(`Delete clicked for row ${request.id}!`)
                          }
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ApplyLeaveModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleLeaveFormSubmit}
      />
    </>
  );
};
LeaveRequests.displayName = "LeaveRequestsPage"; // Set display name for _app.tsx
export default LeaveRequests;
