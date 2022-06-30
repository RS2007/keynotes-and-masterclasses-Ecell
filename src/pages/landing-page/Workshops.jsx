import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, addItem } from "../../state/cartReducer";
import {
	Heading,
	Image,
	Container,
	Flex,
	VStack,
	Box,
	HStack,
	Wrap,
	WrapItem,
	Button,
	Icon,
	Modal,
	ModalHeader,
	ModalBody,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalCloseButton,
	Spacer,
	useBreakpointValue,
	Divider,
	Text,
} from "@chakra-ui/react";
import { FaCalendar, FaClock, FaMinusCircle, FaShoppingCart, FaTags } from "react-icons/fa";

import workshops from "../../state/workshops.json";

const disabledWorkshops = ["growth-hacks", "investor-relations", "effective-capital-management"];

const WorkshopModal = ({ workshop, ...modalProps }) => {
	const dispatch = useDispatch();

	const isWorkshopPresentInCart = useSelector(({ cart }) => cart.workshops.some(({ key }) => key === workshop.key));
	const { isWorkshopPresentInCombo, comboKey } = useSelector(({ cart }) => {
		const comboFound = cart.combos.find(({ workshops }) => workshops.some(({ key }) => key === workshop.key));
		return {
			isWorkshopPresentInCombo: comboFound !== undefined,
			comboKey: comboFound && comboFound.key,
		};
	});

	const handleWorkshopCartChange = () => {
		if (isWorkshopPresentInCart) {
			dispatch(removeItem(workshop.key));
		} else if (isWorkshopPresentInCombo) {
			dispatch(removeItem(comboKey));
		} else {
			const { key, price, topic, sponsor, date } = workshop;
			dispatch(addItem({ key, price, topic, sponsor, date }));
		}
	};

	return (
		<Modal {...modalProps} size="3xl" preserveScrollBarGap>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{workshop.topic}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>{workshop.description}</Text>
					<HStack justify="space-between" mt="0.5em" mb="0.5em">
						<Text fontWeight="semibold" fontSize="lg" color="teal.400">
							<Icon as={FaCalendar} /> {workshop.date}
						</Text>
						<Text fontWeight="semibold" fontSize="lg" color="teal.400">
							<Icon as={FaClock} /> {workshop.duration}
						</Text>
					</HStack>
					<VStack>
						<Divider mt="0.5em" mb="0.5em" />
						<Heading as="h2" size="md">
							{workshop.sponsor.includes("Parrish") ? "Conducted by" : "In Association With"}
						</Heading>
						<Image src={workshop.logo} maxW="xs" p="4" pt="0" />
						<Heading as="h2" size="md" color="gray.400">
							{workshop.sponsor}
						</Heading>
						<Text color="gray.400">{workshop.sponsorDescription}</Text>
					</VStack>
				</ModalBody>
				<Divider mt="1em" />
				<ModalFooter>
					<Heading size="md">
						<Icon as={FaTags} /> {workshop.price > 0 ? `₹ ${workshop.price}` : "FREE!"}
					</Heading>
					<Spacer />
					{/* {!disabledWorkshops.includes(workshop.key) ? (
						<Button
							colorScheme="teal"
							leftIcon={
								<Icon
									as={
										isWorkshopPresentInCart || isWorkshopPresentInCombo
											? FaMinusCircle
											: FaShoppingCart
									}
								/>
							}
							onClick={handleWorkshopCartChange}>
							{isWorkshopPresentInCart
								? "Remove from Cart"
								: isWorkshopPresentInCombo
								? "Remove Combo"
								: "Add to Cart"}
						</Button>
					) : ( */}
					<Button isDisabled={true} colorScheme="teal">
						Registrations Closed
					</Button>
					{/* )} */}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

const WorkshopGrid = ({ isLive, track, setWorkshopModalData }) => {
	return (
		<Flex wrap="wrap" mb="2em" w="100%" id="workshop">
			<Heading flexBasis="100%" mb="1em" textAlign="center">
				{track}
			</Heading>
			<Wrap spacing="4" justify="center" w="100%">
				{workshops
					.filter(({ track: _track }) => _track === track)
					.map((workshop) => (
						<WrapItem key={workshop.topic}>
							<VStack
								w="xs"
								align="flex-start"
								h="100%"
								borderWidth="1px"
								borderRadius="lg"
								borderColor="gray.700"
								overflow="hidden"
								boxShadow="dark-lg">
								<Box p="4">
									<Heading fontWeight="semibold" as="h4" size="md" lineHeight="tight">
										{workshop.topic}
									</Heading>
									<HStack justify="space-between">
										<Heading as="h5" size="sm" fontWeight="semibold" color="gray.500">
											{workshop.sponsor}
										</Heading>
									</HStack>
								</Box>
								<Spacer />
								<Button
									colorScheme="teal"
									isFullWidth
									borderTopRadius={0}
									m={0}
									color="#181818"
									onClick={() => setWorkshopModalData({ ...workshop, open: true })}>
									{/* { disabledWorkshops.includes(workshop.key) ? "Learn More" : "REGISTER" } */}
									Learn More
								</Button>
							</VStack>
						</WrapItem>
					))}
			</Wrap>
		</Flex>
	);
};

const Workshops = () => {
	const [workshopModalData, setWorkshopModalData] = useState({ open: false });
	const svgSize = useBreakpointValue({ base: "110px", lg: "210px" });

	return (
		<>
			<Flex bg="#181818" color="white">
				{workshopModalData.open && (
					<WorkshopModal
						workshop={workshopModalData}
						isOpen={workshopModalData.open}
						onClose={() => setWorkshopModalData({ open: false })}
					/>
				)}
				<Container pt="2em" pb={{ base: "6em", lg: 200 }} maxW="5xl">
					<Heading size="2xl" textAlign="center" className="heading" mt="1em">
						Workshops
					</Heading>
					<VStack align="flex-start" mt="2em">
						<WorkshopGrid track="Technology" setWorkshopModalData={setWorkshopModalData} />
						<WorkshopGrid track="Business" setWorkshopModalData={setWorkshopModalData} />
						<WorkshopGrid track="Startup" setWorkshopModalData={setWorkshopModalData} />
					</VStack>
				</Container>
			</Flex>
			<div className="shape-divider" data-flip-horizontal="true">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 630 120"
					preserveAspectRatio="none"
					style={{ height: svgSize }}>
					<path
						d="M510.7,2.9c-98.9,21.9-222.3,85.5-322,85.5C80.1,88.4,24.1,56.1,0,36.4V120H630V15.2C602.4,6.9,550.1-5.8,510.7,2.9Z"
						style={{ fill: "#1A202C" }}></path>
				</svg>
			</div>
		</>
	);
};
export default Workshops;
