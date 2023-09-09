module.exports = {
  content: [
    "./src/components/**/*.jsx",
    "./src/pages/**/*.jsx",
    "./src/**/*.jsx",
    "./src/index.html",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "567px",
      md: "800px",
      lg: "990px",
      xl: "1200px",
      xxl: "1600px",
    },
    fontSize: {
      h3Footer: "2rem",
      socialLink: "3.5rem",
      searchIcon: "3rem",
      navLogo: "2.2rem",
      base: "1.6rem",
    },
    extend: {
      colors: {
        mainGrey: "#3B3B3B",
        mainGreyDarker: "#231F20",
        mainGreyLightest: "#F1F1F1",
        brandBg: "#d9d9d9",
        date: "#181663",
        darkGreen: "#0f3d3e",
        progressGray: "rgba(35, 31, 32, 0.15)",
        badgeBg: "rgba(35, 31, 32, 0.5)",
        badgeText: "rgba(255, 255, 255, 0.7)",
        sidebarBg: "#F5F5F5",
        staticBlue: "#2A5F9E",
        lightGreen: "#207D66",
        btnRed: "#BF2129",
      },
      fontFamily: {
        Averia: ["Averia Libre", "cursive"],
        Roboto: ["Roboto", "sans"],
      },
      height: {
        21: "21rem",
        28: "28rem",
      },
    },
  },
  plugins: [],
};
