import { GetServerSideProps } from "next";
const IndexPage: React.FC = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/auth/signin",
      permanent: false,
    },
  };
};

export default IndexPage;
