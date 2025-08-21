import type { AppProps } from "next/app";
import "../styles/globals.scss";
// import "../styles/Signin.module.scss";
// import "../styles/CheckInOut.module.scss";
// import "../styles/LeaveRequests.module.scss";
// import "../styles/Navbar.module.scss";
// import "../styles/Sidebar.module.scss";
// import "../styles/Layout.module.scss";
// import "../styles/ApplyLeaveModal.module.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import LayoutProps and Layout component
import Layout, { LayoutProps } from "../components/Layout";
// Import useRouter hook from next/router
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
        // Pass the determined activeSidebarLink to the Layout component
        <Layout activeSidebarLink={activeSidebarLink}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        // Render pages like Login without the Layout wrapper
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
