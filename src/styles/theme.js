import { extendTheme } from "@chakra-ui/react";
import Button from "./Button";

const theme = extendTheme({
	initialColorMode: "dark",
	useSystemColorMode: false,
	colors: {
		background1: "#2B1E70",
		background2: "#0C0A33",
		wheat: " #FFECD1",
		pink: "#cc317a",
		inactive: "#C4C4C4",
		purple: "#6666cc",
		darkPink: "#7e204c",
		walnut: "#b69674",
	},
	fonts: {
		heading: "Staatliches",
		headingCard: "Inter",
		buttonText: "Poppins",
	},
	components: {
		Button,
	},
});

export default theme;
