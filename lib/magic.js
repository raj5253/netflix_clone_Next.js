const { Magic } = require("@magic-sdk/admin");

export const magicAdmin = new Magic(process.env.MAGIC_SREVER_KEY);
