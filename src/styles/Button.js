export default {
  // Styles for the base style
  baseStyle: {
    fontSize: "40px",
    lineHeight: "60px",
    color: "white",
    /* identical to box height */
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    pink: {
      backgroundColor: "#CC317A;",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "bold",

    },
    white: {
      background: "white",
      color: "pink",
      fontFamily: "Inter",
      fontWeight: "normal",
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
};
