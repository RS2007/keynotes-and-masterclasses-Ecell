import { Text, Heading, Flex, Image, HStack } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
const Panel = (props) => {
	return (
		<Flex
			direction="column"
			color="white"
			w={{ md: props.md, base: "100%" }}
			marginTop="20px"
			justifyContent="space-between"
			minWidth="200px"
		>
			<Image
				src="https://images.pexels.com/photos/2058128/pexels-photo-2058128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=200"
				width="100%"
				borderRadius="12px"
				marginBottom="20px"
			/>
			<Heading as="h2" size="lg" fontFamily="Inter" marginBottom="10px">
				{props.panel.title}
			</Heading>
			<Text marginBottom="10px">{props.panel.oneLiner}</Text>
			<HStack marginBottom="10px">
				<CalendarIcon fontSize={{ md: "1.6rem" }} />
				<Text fontSize={{ md: "1.2rem" }}> {props.panel.timeAndDate}</Text>
			</HStack>
		</Flex>
	);
};

export default Panel;
