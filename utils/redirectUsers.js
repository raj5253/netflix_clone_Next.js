import { verifyToken } from "@/lib/utils";

const useRedirectUser = async (context) => {
  const token = context.req ? context.req?.cookies.token : null; //read the docs for context in getServerSideProps
  const userId = await verifyToken(token);
  //   const userId = null;

  // if (!userId) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

  return { userId, token };
};

export default useRedirectUser;
