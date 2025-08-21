import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout, { LayoutProps } from "../components/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter(); // Initialize useRouter

  // Determine the active sidebar link based on the current route path
  let activeSidebarLink: LayoutProps["activeSidebarLink"] | undefined;
  let requiresLayout = false;

  // Check the current pathname to set the active link
  if (router.pathname.startsWith("/check-inout")) {
    activeSidebarLink = "check-inout";
    requiresLayout = true;
  } else if (router.pathname.startsWith("/leave-requests")) {
    activeSidebarLink = "leave-requests";
    requiresLayout = true;
  } else if (router.pathname.startsWith("/attendance")) {
    activeSidebarLink = "attendance";
    requiresLayout = true;
  } else {
    // For the login page or any other page that doesn't require the layout
    requiresLayout = false;
    // activeSidebarLink remains undefined, which is handled by requiresLayout = false
  }

  return (
    <>
      {requiresLayout && activeSidebarLink ? (
        <Layout activeSidebarLink={activeSidebarLink}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
      {/* ToastContainer for global notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default MyApp;
