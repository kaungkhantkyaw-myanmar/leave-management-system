// components/ApplyLeaveModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../styles/ApplyLeaveModal.module.scss";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"; // Import react-hook-form

// Set the app element for react-modal
if (typeof window !== "undefined") {
  Modal.setAppElement("#__next");
}

// Define the type for the form data
export interface LeaveFormData {
  leaveType: string;
  leaveDates: string; // Consider using a date picker library for better date handling
  reason: string;
}

interface ApplyLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leaveData: LeaveFormData) => void;
}

const ApplyLeaveModal: React.FC<ApplyLeaveModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }, // Get errors and submit status
    reset, // Function to reset the form
  } = useForm<LeaveFormData>();

  // Function to handle form submission
  const onSubmitForm: SubmitHandler<LeaveFormData> = (data) => {
    onSubmit(data);
    toast.success("Leave Request Success");
    onClose();
    reset();
  };

  // Close the modal and reset the form when the modal is closed by the user
  const handleCloseModal = () => {
    reset(); // Reset form on close
    onClose(); // Close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal} // Use the new handler
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="Apply Leave Modal"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Apply Leave</h2>
          <button className={styles.closeButton} onClick={handleCloseModal}>
            &times;
          </button>
        </div>
        {/* Start of the form using react-hook-form */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={styles.formGroup}>
            <label htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              {...register("leaveType", { required: "Leave type is required" })} // Register field with validation
              className={`${styles.selectField} ${
                errors.leaveType ? styles.errorField : ""
              }`}
            >
              <option value="">Select Leave Type</option>{" "}
              {/* Add a default empty option */}
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Medical">Medical</option>
            </select>
            {errors.leaveType && (
              <p className={styles.errorMessage}>{errors.leaveType.message}</p>
            )}{" "}
            {/* Display error message */}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="leaveDates">Leave Date(s)</label>
            <input
              type="text"
              id="leaveDates"
              placeholder="Choose Date(s)"
              className={`${styles.inputField} ${
                errors.leaveDates ? styles.errorField : ""
              }`}
              {...register("leaveDates", {
                required: "Leave dates are required",
              })} // Register field with validation
            />
            {errors.leaveDates && (
              <p className={styles.errorMessage}>{errors.leaveDates.message}</p>
            )}{" "}
            {/* Display error message */}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              placeholder="Enter reason"
              className={`${styles.textareaField} ${
                errors.reason ? styles.errorField : ""
              }`}
              {...register("reason", {
                required: "Reason is required",
                minLength: {
                  value: 5,
                  message: "Reason must be at least 5 characters",
                },
              })} // Register with validation
              rows={4}
            />
            {errors.reason && (
              <p className={styles.errorMessage}>{errors.reason.message}</p>
            )}{" "}
            {/* Display error message */}
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
        {/* End of the form */}
      </div>
    </Modal>
  );
};

export default ApplyLeaveModal;
