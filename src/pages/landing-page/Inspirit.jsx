import { Flex, Button, Center, Heading, VStack, Image, Text, HStack } from "@chakra-ui/react";
import Keynote from "./Keynote";
import * as contentInspirit from "../../state/inspirit.json";
import { CalendarIcon } from "@chakra-ui/icons";

export function Inspirit() {
	return (
		<VStack
			paddingBottom="20vh"
			h="fit-content"
			w="100vw"
			bgGradient="linear(180deg,background1,background2)"
			marginTop="20px"
			paddingTop="10vh"
		>
			<Heading color="wheat" fontSize={{ base: "16vw", md: "5vw" }}>
				INSPIRIT
			</Heading>
			<Heading color="white" textAlign="center">
				Keynotes & Panel Discussions
			</Heading>
			<Flex
				w={{ md: "80%", base: "90%" }}
				h="fit-content"
				flexWrap="wrap"
				justify="space-between"
			>
				{contentInspirit.keynote.map((elem, index) => (
					<>
						<Keynote keynote={elem} key={index} />
					</>
				))}
			</Flex>
			<Flex
				w={{ md: "80%", base: "90%" }}
				h="fit-content"
				justify="space-between"
				flexWrap="wrap"
			>
				{contentInspirit.panel.map((elem, index) => (
					<Flex
						key={index}
						direction="column"
						color="white"
						w={{ md: "30%", base: "100%" }}
						marginTop="20px"
						minWidth="200px"
					>
						<Image
							src="https://images.pexels.com/photos/2058128/pexels-photo-2058128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=200"
							width="100%"
							borderRadius="12px"
							marginBottom="20px"
						/>
						<Heading as="h2" size="lg" fontFamily="Inter" marginBottom="10px">
							{elem.title}
						</Heading>
						<Text marginBottom="10px">{elem.oneLiner}</Text>
						<HStack marginBottom="10px">
							<CalendarIcon fontSize={{ md: "1.6rem" }} />
							<Text fontSize={{ md: "1.2rem" }}> {elem.timeAndDate}</Text>
						</HStack>
					</Flex>
				))}
			</Flex>
			<Center
				w="100%"
				className="cartButtonBox"
				_before={{
					content: 'url("../assets/Rectangle 10.png")',
					position: "relative",
					left: "26.2%",
					top: "17%",
					zIndex: "1",
				}}
				_after={{
					content: '"149"',
					position: "relative",
					zIndex: "1",
					right: "4%",
					bottom: "-5%",
					fontSize: "1.4rem",
				}}
			>
				<Button variant="pink" w="25%" h="50px" marginTop="62px !important" minW="200px">
					ADD TO CARD
				</Button>
			</Center>
		</VStack>
	);
}
