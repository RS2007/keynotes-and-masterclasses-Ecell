import {
	Heading,
	Container,
	Box,
	useBreakpointValue,
	VStack,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";
import faqs from "../../state/faqs.json";
const FAQSection = () => {
	const svgSize = useBreakpointValue({ base: "110px", lg: "210px" });

	return (
		<>
			<Container pt="2em" pb={{ base: "8em", lg: 200 }} maxW="5xl">
				<VStack spacing={6}>
					<Heading size="2xl" textAlign="center" className="heading">
						FAQs
					</Heading>
					<Accordion defaultIndex={[0]} allowMultiple w="100%">
						{faqs.map(({ question, answer }, i) => (
							<AccordionItem key={i} >
								<h2>
									<AccordionButton _expanded={{ bg: "blue.900", color: "white" }} _focus="none">
										<Box flex="1" textAlign="left">
											{question}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4} color="gray.300">
									{answer}
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>
				</VStack>
			</Container>
			<div className="shape-divider">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 630 120"
					preserveAspectRatio="none"
					style={{ height: svgSize }}>
					<title>Asset 164</title>
					<path
						d="M567.67,31.14c-26.22,17.36-50,36.55-81.8,50C437.52,101.48,375.52,106.21,317,103.23s-115.42-13-173.15-19.56C96.47,78.25,47.18,75.18,0,80.07v32.41H630V0C606.44,7.52,585.89,19.09,567.67,31.14Z"
						style={{ fill: "#fff", opacity: 0.64 }}></path>
					<path
						d="M567.67,38.67c-26.22,17.35-50,36.55-81.8,50C437.52,109,375.52,113.73,317,110.75s-115.42-13-173.15-19.56C96.47,85.77,47.18,82.7,0,87.59V120H630V7.52C606.44,15,585.89,26.61,567.67,38.67Z"
						style={{ fill: "#fff" }}></path>
				</svg>
			</div>
		</>
	);
};
export default FAQSection;
