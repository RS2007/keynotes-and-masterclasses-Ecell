import speakers from "../../state/speakerList.json";
import { Box, Flex, Image, Text, VStack, Heading, Grid, GridItem, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addItem } from "../../state/cartReducer";
// import "./gridUtils.css";

export default function SpeakerList() {
	const dispatch = useDispatch();
	return (
		<VStack bgGradient="linear(180deg,background1,background2)" py="32" mt="20px">
			<Heading color="wheat" fontSize={{ base: "16vw", md: "5vw" }} textAlign="center">
				INSPIRIT
			</Heading>
			<Grid
				w={{ base: "100%", md: "80%" }}
				templateColumns="repeat(6, 1fr)"
				templateRows="repeat(6, 1fr)"
			>
				{speakers.map((elem, index) => (
					<GridItem
						rowSpan={{ base: 1, md: 3 }}
						colSpan={{ base: 6, md: 2 }}
						key={index}
						py="8"
						px="8"
					>
						<VStack key={index} color="white">
							<Flex
								justify="center"
								style={{
									backgroundColor: " #cc317a",
									borderRadius: " 100%",
									maxWidth: " 175px !important",
									border: "10px solid pink",
								}}
							>
								<Image
									src={`/inspirit-speakers/${elem.photo}.jpeg`}
									style={{
										filter: "saturate(0)",
										opacity: 0.8,
									}}
									borderRadius="100%"
									maxWidth="300px"
								/>
							</Flex>
							<Box>
								<Text fontWeight="bold" fontSize="2xl" textAlign="center">
									{elem.name}
								</Text>
							</Box>
							<Box>
								<Text textAlign="center">{elem.designation}</Text>
							</Box>
						</VStack>
					</GridItem>
				))}
			</Grid>
			<Button
				variant="pink"
				w="25%"
				h="50px"
				marginTop="62px !important"
				minW="200px"
				onClick={() =>
					dispatch(
						addItem({
							key: "INSPIRIT",
							price: 149,
							title: "Inspirit Pass",
							oneLiner: "Keynotes & Panels by eminent personas.",
						})
					)
				}
			>
				BUY PASS
			</Button>
		</VStack>
	);
}
