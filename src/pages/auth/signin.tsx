import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Signin.module.scss";
import Button from "../../components/commons/button/Button";
import Input from "../../components/commons/input/Input";

// Import signIn and useSession from next-auth/react
import { signIn, useSession } from "next-auth/react";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for login button
  const [error, setError] = useState<string | null>(null); // State for login errors

  const router = useRouter();
  const { data: session, status } = useSession(); // Get session data and status

  // If the user is already authenticated, redirect them to the dashboard/check-in page
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/check-inout"); // Redirect authenticated users
    }
  }, [status, router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    // Call NextAuth's signIn function with credentials
    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from automatically redirecting
      email: email,
      password: password,
    });

    setIsLoading(false); // Stop loading

    if (result?.error) {
      setError("Invalid email or password. Please try again."); // Set error message
      console.error("Login Error:", result.error);
    } else if (result?.ok) {
      // If signIn was successful, session will be set, and useEffect will handle redirect
      console.log("Sign in successful, session will be set.");
    }
  };

  // Show loading state while checking session
  if (status === "loading") {
    return <div>Loading session...</div>; // Or a more sophisticated loading spinner
  }

  return (
    <div className={styles["login-bg"]}>
      <div className={styles["login-title"]}>Log In</div>
      <form className={styles["login-card"]} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.errorMessage}>{error}</p>}{" "}
        {/* Display login errors */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        <a className={styles["forgot-link"]} href="/password-reset">
          Forgot password?
        </a>
      </form>
    </div>
  );
};
Signin.displayName = "SigninPage";
export default Signin;
