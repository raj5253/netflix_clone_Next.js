import { Magic } from "magic-sdk";

const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)
  );
};

export const magic = createMagic();

//.env.local file got updated,so server restart required.

/* Error : window undefined ::
 magic is just for client .. But nextjs code is for both client and server.
 windows is present there on client side by default. but no window on server side. */

//api KEY ERROR : bc any key which need to be made available to the browser side, should begin with NEXT_PUBLIC
