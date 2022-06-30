import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useRoute } from "wouter";

export const Footer = () => {
	const [isHomePage] = useRoute("/");

	const footerBottom = useBreakpointValue({ base: null, md: 0 });

	const checkoutPageStyles = !isHomePage && {
		position: "absolute",
		bottom: footerBottom,
	};
	return (
		<Box p="4" bg="gray.200" w="100%" color="gray.700" {...checkoutPageStyles}>
			<Flex
				justify="space-evenly"
				w="100%"
				wrap={{ base: "wrap", lg: "nowrap" }}
				textAlign={{ base: "center", lg: "left" }}
			>
				<Text mb={{ base: "2em", lg: "0" }}>
					©Developed by Web Operations | E-Cell | IIT Madras.
					<br />
					All Rights Reserved
				</Text>
				<Text>
					Problems? Contact us:
					<br />
					<strong>Rohith: +91 6238276462</strong>
					<br />
					<strong>Abhijit: +91 8895219514</strong>
				</Text>
			</Flex>
		</Box>
	);
};
