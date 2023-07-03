import { api } from "@/utils/api";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{
  repo: Repo;
}> = async (context) => {
  const { id } = context.query as { id: string };
  const data = await api.poseta.getOneForRedirect.useQuery(id);
  if (!data.data) return { notFound: true };

  return {
    redirect: {
      destination: `/pacijent/${data.data?.pacijentJMBG}`,
    },
  };
};

const Poseta = () => {
  return <div></div>;
};
