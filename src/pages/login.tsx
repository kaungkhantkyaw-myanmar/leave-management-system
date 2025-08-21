// // pages/login.tsx
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import styles from "../styles/Login.module.scss";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     router.push("/check-inout");
//   };

//   return (
//     // No Layout wrapper here for the login page
//     <div className={styles["login-bg"]}>
//       <div className={styles["login-title"]}>Log In</div>
//       <form className={styles["login-card"]} onSubmit={handleSubmit}>
//         <label className={styles["input-label"]} htmlFor="email">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           className={styles["input-field"]}
//           placeholder="Value"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <label className={styles["input-label"]} htmlFor="password">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           className={styles["input-field"]}
//           placeholder="Value"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className={styles["login-btn"]} type="submit">
//           Sign In
//         </button>
//         <a className={styles["forgot-link"]} href="#">
//           Forgot password?
//         </a>
//       </form>
//     </div>
//   );
// };
// Login.displayName = "LoginPage";
// export default Login;
