import type { AppProps } from "next/app";
import "../styles/globals.scss";

// Import react-toastify and its CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import SessionProvider from next-auth/react
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Import Session type

// Import LayoutProps and Layout component
import Layout, { LayoutProps } from "../components/Layout";
import { useRouter } from "next/router";

// Define the AppProps type to include session
interface MyAppProps extends AppProps {
  pageProps: {
    session?: Session | null; // Make session optional
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  // Determine the active sidebar link and if layout is required based on pathname
  let activeSidebarLink: LayoutProps["activeSidebarLink"] | undefined;
  let requiresLayout = false;

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
    // For pages like Login or Password Reset, layout is not required.
    requiresLayout = false;
  }

  return (
    <>
      {/* Wrap the entire application with SessionProvider */}
      <SessionProvider session={pageProps.session}>
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
      </SessionProvider>
    </>
  );
}

export default MyApp;
