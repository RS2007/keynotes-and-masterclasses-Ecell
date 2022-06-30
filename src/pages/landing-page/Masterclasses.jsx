import {
	Flex,
	Button,
	Text,
	Heading,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Image,
	Spacer,
	HStack,
	Grid,
	GridItem,
	Link,
	Divider,
	Stack,
	useBreakpoint,
	Center,
	Badge,
} from "@chakra-ui/react";
import masterclasses from "../../state/masterclasses.json";
import { useState } from "react";
import { FaLinkedin, FaCalendar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../../state/cartReducer";

const ClassesModal = ({ modalState: { isOpen, onClose }, data }) => {
	const screen = useBreakpoint("base");
	const dispatch = useDispatch();
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center" fontSize="2xl">
					{data?.title}
				</ModalHeader>
				<ModalCloseButton />
				<Divider />
				<ModalBody mt="4">
					<Grid templateRows="repeat(16, 1fr)" templateColumns="repeat(6, 1fr)" gap="6">
						{data?.classes?.map(({ title, speaker, time }, i) => {
							if (!speaker.name) {
								return (
									<GridItem
										key={i}
										rowSpan={{ base: 4, md: 8 }}
										colSpan={{ base: 6, md: 3 }}
									>
										<Center w="100%" bg="gray.100" borderRadius={8} h="100%">
											<VStack>
												<Text
													fontSize="xl"
													fontWeight={600}
													color="background2"
													textAlign="center"
												>
													{title}
												</Text>
												<Badge
													color="gray.600"
													fontWeight={600}
													mt="0 !important"
												>
													Coming Soon
												</Badge>
											</VStack>
										</Center>
									</GridItem>
								);
							}
							return (
								<GridItem
									key={i}
									rowSpan={{ base: 4, md: 8 }}
									colSpan={{ base: 6, md: 3 }}
								>
									<Stack
										align={{ base: "center", md: "flex-start" }}
										direction={{ base: "column", md: "row" }}
									>
										<Image
											borderRadius={{ base: "full", md: "8" }}
											w={180}
											src={
												speaker.image
													? `/masterclass-speakers/${speaker.image}.jpg`
													: `https://source.boringavatars.com/marble/180/${title}?colors=c4c4c4,6666cc,dddddd&square`
											}
										></Image>
										<VStack
											align={{ base: "center", md: "flex-start" }}
											alignSelf="stretch"
											w="100%"
										>
											<Text
												fontSize="xl"
												fontWeight={600}
												color="background2"
												textAlign={{ base: "center", md: "left" }}
											>
												{title}
											</Text>

											<HStack mt="0 !important">
												<FaCalendar /> <Text>{time || "Coming Soon"}</Text>
											</HStack>
											<Spacer />
											{screen !== "base" && <Divider />}
											{speaker.name && (
												<>
													<Link
														href={speaker.linkedIn}
														fontWeight={600}
														fontSize="lg"
														color="background1"
														mt="0 !important"
													>
														<HStack mb={0}>
															<FaLinkedin />{" "}
															<Text>{speaker.name}</Text>
														</HStack>
													</Link>
													<Text
														textAlign={{ base: "center", md: "left" }}
														color="gray.600"
														fontWeight={600}
														mt="0 !important"
													>
														{speaker.designation}
													</Text>
												</>
											)}
										</VStack>
									</Stack>
									{screen === "base" && <Divider mt="4" />}
								</GridItem>
							);
						})}
					</Grid>
				</ModalBody>

				<ModalFooter>
					<Button variant="ghost" onClick={onClose}>
						Close
					</Button>
					<Button
						colorScheme="blue"
						ml={3}
						onClick={() =>
							dispatch(
								addItem({
									key: data.key,
									title: data.title,
									price: data.price,
									oneLiner: data.oneLiner,
								})
							)
						}
					>
						Add to Cart
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export function Masterclasses() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedClass, setSelectedClass] = useState({});
	const dispatch = useDispatch();
	return (
		<VStack
			h="fit-content"
			w="100vw"
			bgGradient="linear(180deg,background1,background2)"
			color="white"
			marginTop="20px"
			py={32}
		>
			<VStack marginBottom="10vh">
				<Heading color="wheat" fontSize={{ base: "16vw", md: "5vw" }}>
					MASTERCLASSES
				</Heading>
				<Text textAlign="center" fontSize="2xl" fontWeight="bold">
					Curated workshops from experts, categorized to tracks
				</Text>
			</VStack>
			<Flex w={{ md: "80%", base: "90%" }} flexWrap="wrap" justifyContent="space-between">
				{masterclasses.map((elem) => (
					<VStack
						align="flex-start"
						key={elem.key}
						w={{ md: "30%", base: "100%" }}
						mb={{ base: 16, md: "0" }}
					>
						<Image
							src={`/masterclass-logos/${elem.img}.png`}
							width="100%"
							borderRadius="12px"
							marginBottom="20px"
						/>
						<Text
							fontSize="2xl"
							fontWeight={600}
							fontFamily="Inter"
							marginBottom="10px"
						>
							{elem.title}
						</Text>
						<Text fontSize="xl" marginBottom="10px">
							{elem.oneLiner}
						</Text>
						<Spacer />
						<Button
							variant="white"
							w="100%"
							onClick={() => {
								setSelectedClass(elem);
								onOpen();
							}}
						>
							Show classes and speakers
						</Button>
						<Button
							variant="pink"
							w="100%"
							onClick={() =>
								dispatch(
									addItem({
										key: elem.key,
										title: elem.title,
										price: elem.price,
										oneLiner: elem.oneLiner,
									})
								)
							}
						>
							Add to Cart (Rs. {elem.price})
						</Button>
						<Text color="gray" fontSize="xl" textAlign="center">
							(All recordings included)
						</Text>
					</VStack>
				))}
			</Flex>
			<ClassesModal modalState={{ isOpen, onClose }} data={selectedClass} />
		</VStack>
	);
}
