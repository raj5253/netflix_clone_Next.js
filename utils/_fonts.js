import { Roboto_Slab } from "next/font/google";

const roboto = Roboto_Slab({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
});

module.exports = {
  roboto: roboto.className,
};

// const myfonts = [roboto];
// module.exports = myfonts;  //not using them bc index need to be used to address them.=> can't see 'roboto' word in index.js. Solves confusion for developer.
