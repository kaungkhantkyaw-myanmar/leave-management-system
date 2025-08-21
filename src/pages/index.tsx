import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/signin");
  }, [router]); // Add router to dependency array

  return null;
};

export default IndexPage;
