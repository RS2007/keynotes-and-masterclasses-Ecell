import { Button, Center, Heading, Stack } from "@chakra-ui/react";
// import getUser from "../../utils/getSummitID";

const SplashSection = ({ executeScroll }) => {
	return (
		<Center
			flexDirection="column"
			h="100vh"
			w="100vw"
			bgGradient="linear(180deg,background1,background2)"
		>
			<Heading size="4xl" textAlign="center" id="main-heading" color="white">
				INSPIRIT & MASTERCLASSES
			</Heading>
			<Heading size="2xl" textAlign="center" id="main-heading" color="white">
				E-Summit IITM 2022
			</Heading>
			<Stack mt="2em" direction={["column-reverse", "row"]}>
				<Button size="sm" onClick={executeScroll} zIndex={99} color="darkPink">
					GET THE COMBOS
				</Button>
			</Stack>
		</Center>
	);
};

export default SplashSection;
