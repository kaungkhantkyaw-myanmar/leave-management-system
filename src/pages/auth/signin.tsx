import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Signin.module.scss";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/check-inout");
  };

  return (
    <div className={styles["login-bg"]}>
      <div className={styles["login-title"]}>Log In</div>
      <form className={styles["login-card"]} onSubmit={handleSubmit}>
        <label className={styles["input-label"]} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={styles["input-field"]}
          placeholder="Value"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className={styles["input-label"]} htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className={styles["input-field"]}
          placeholder="Value"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles["login-btn"]} type="submit">
          Sign In
        </button>
        <a className={styles["forgot-link"]} href="/password-reset">
          Forgot password?
        </a>
      </form>
    </div>
  );
};
SignIn.displayName = "Signin Page";
export default SignIn;
