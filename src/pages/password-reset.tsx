// pages/password-reset.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import OtpInput from "react-otp-input";
import styles from "../styles/PasswordReset.module.scss";

// Define form data types
interface RequestCodeFormData {
  email: string;
}

interface ResetPasswordFormData {
  otpCode: string;
  newPassword: string;
}

const PasswordResetPage: React.FC = () => {
  const router = useRouter();

  // State to manage which part of the flow is active (request code vs. reset password)
  const [step, setStep] = useState<"request-code" | "reset-password">(
    "request-code"
  );

  // --- Form Hooks ---
  const requestCodeForm = useForm<RequestCodeFormData>();
  const resetPasswordForm = useForm<ResetPasswordFormData>();

  // --- Password Strength State ---
  const [password, setPassword] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    minLength: false,
    number: false,
  });

  // --- Password Strength Check Logic ---
  useEffect(() => {
    setPasswordRequirements({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      minLength: password.length >= 8,
      number: /[0-9]/.test(password),
    });
  }, [password]);

  // --- Handlers ---
  const handleRequestCodeSubmit: SubmitHandler<RequestCodeFormData> = (
    data
  ) => {
    console.log("Requesting code for:", data.email);
    setStep("reset-password");
  };

  const handleResetPasswordSubmit: SubmitHandler<ResetPasswordFormData> = (
    data
  ) => {
    console.log("Resetting password with:", data);
    alert("Password reset successful! (Demo)");
    router.push("/auth/signin");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    resetPasswordForm.setValue("newPassword", e.target.value);
  };

  PasswordResetPage.displayName = "PasswordResetPage";

  return (
    <div className={styles["page-container"]}>
      <div className={styles["reset-container"]}>
        {/* Request Code Form */}
        {step === "request-code" && (
          <div className={styles["form-card"]}>
            <h2 className={styles.title}>Reset Password</h2>
            <p className={styles.subtitle}>
              Enter your email address to receive a password reset code.
            </p>
            <form
              onSubmit={requestCodeForm.handleSubmit(handleRequestCodeSubmit)}
            >
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`${styles.inputField} ${
                    requestCodeForm.formState.errors.email
                      ? styles.errorField
                      : ""
                  }`}
                  {...requestCodeForm.register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {requestCodeForm.formState.errors.email && (
                  <p className={styles.errorMessage}>
                    {requestCodeForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => router.push("/auth/signin")}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Request Code
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reset Password Form */}
        {step === "reset-password" && (
          <div className={styles["form-card"]}>
            <h2 className={styles.title}>Reset Password</h2>
            <p className={styles.subtitle}>
              Enter the code sent to <strong>info@pixsellz.io</strong> to reset
              your password.
            </p>

            {/* OTP Input Section */}
            <div className={styles["otp-section"]}>
              <label htmlFor="otpCode" className={styles.otpLabel}>
                Enter OTP Code
              </label>
              <OtpInput
                value={resetPasswordForm.getValues("otpCode")}
                onChange={(code) => resetPasswordForm.setValue("otpCode", code)}
                numInputs={6}
                shouldAutoFocus={true}
                containerStyle={styles.otpContainer}
                inputStyle={styles.otpInput}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
              {/* If you need custom focus styling, you would add it to PasswordReset.module.scss */}
              {/* For example, within .otpInput:hover or .otpInput:focus */}

              <div className={styles["code-status"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.324a.75.75 0 1 0-1.06 1.06L6.98 11.045a1.75 1.75 0 0 0 2.472.001l4.31-4.31a.75.75 0 0 0-1.08-1.022L7.477 9.417z" />
                </svg>
                <span>Code verified</span>
              </div>
            </div>

            {/* New Password Section */}
            <form
              onSubmit={resetPasswordForm.handleSubmit(
                handleResetPasswordSubmit
              )}
            >
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New password</label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={password === "" ? "password" : "text"}
                    id="newPassword"
                    placeholder="Enter your new password"
                    className={`${styles.inputField} ${
                      resetPasswordForm.formState.errors.newPassword
                        ? styles.errorField
                        : ""
                    }`}
                    {...resetPasswordForm.register("newPassword", {
                      required: "New password is required",
                      minLength: { value: 8, message: "Minimum 8 characters" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message:
                          "Must contain at least one uppercase letter, one lowercase letter, and one number",
                      },
                    })}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span
                    className={styles.passwordToggleIcon}
                    onClick={() => setPassword(password === "" ? "temp" : "")}
                  >
                    {password === "" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye-slash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m10.79 8.25-.673 1.879-.001-.001.001.001c-.109.377-.196.772-.273 1.165-.728 3.276-3.437 4.253-4.665 4.253-1.228 0-3.937-1.014-4.665-4.253-.077-.393-.164-.788-.273-1.165l-.001-.001-.674-1.879-.002-.003c-.048-.136-.097-.273-.145-.409l-.001-.002a.75.75 0 0 1 .083-.855l1.02-1.178a.75.75 0 0 1 .994-.004l1.917 1.697 1.917-1.697a.75.75 0 0 1 .994.004l1.019 1.178a.75.75 0 0 1 .083.855l-.001.002c-.048.136-.097.273-.145.409z" />
                        <path d="m13.779 8.677-.547 1.512c-.366 1.013-.907 1.779-1.644 2.304a3.486 3.486 0 0 1-2.692.533c-.425-.027-1.157-.35-1.917-.687-.761-.337-1.534-.835-2.294-1.463l-.001-.001c-.76-.628-1.454-1.344-2.027-2.173-.32-.43-.583-.924-.78-1.427l-.001-.002a.75.75 0 0 1 .083-.855l1.02-1.178a.75.75 0 0 1 .994-.004l1.917 1.697 1.917-1.697a.75.75 0 0 1 .994.004l1.019 1.178a.75.75 0 0 1 .083.855l-.001.002c-.048.136-.097.273-.145.409z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3-5.5-8-5.5S0 8 0 8zm8 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      </svg>
                    )}
                  </span>
                </div>
                {resetPasswordForm.formState.errors.newPassword && (
                  <p className={styles.errorMessage}>
                    {resetPasswordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Password Requirements List */}
              <div className={styles["password-requirements"]}>
                <ul>
                  <li
                    className={
                      passwordRequirements.lowercase
                        ? styles.valid
                        : styles.invalid
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.324a.75.75 0 1 0-1.06 1.06L6.98 11.045a1.75 1.75 0 0 0 2.472.001l4.31-4.31a.75.75 0 0 0-1.08-1.022L7.477 9.417z" />
                    </svg>
                    At least one lowercase letter
                  </li>
                  <li
                    className={
                      passwordRequirements.uppercase
                        ? styles.valid
                        : styles.invalid
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.324a.75.75 0 1 0-1.06 1.06L6.98 11.045a1.75 1.75 0 0 0 2.472.001l4.31-4.31a.75.75 0 0 0-1.08-1.022L7.477 9.417z" />
                    </svg>
                    At least one uppercase letter
                  </li>
                  <li
                    className={
                      passwordRequirements.minLength
                        ? styles.valid
                        : styles.invalid
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.324a.75.75 0 1 0-1.06 1.06L6.98 11.045a1.75 1.75 0 0 0 2.472.001l4.31-4.31a.75.75 0 0 0-1.08-1.022L7.477 9.417z" />
                    </svg>
                    Minimum 8 characters
                  </li>
                  <li
                    className={
                      passwordRequirements.number
                        ? styles.valid
                        : styles.invalid
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.324a.75.75 0 1 0-1.06 1.06L6.98 11.045a1.75 1.75 0 0 0 2.472.001l4.31-4.31a.75.75 0 0 0-1.08-1.022L7.477 9.417z" />
                    </svg>
                    At least one number
                  </li>
                </ul>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => router.push("/auth/signin")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={
                    !passwordRequirements.lowercase ||
                    !passwordRequirements.uppercase ||
                    !passwordRequirements.minLength ||
                    !passwordRequirements.number
                  }
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
