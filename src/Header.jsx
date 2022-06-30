import { Link, useRoute } from "wouter";
import {
	Flex,
	Box,
	Button,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	HStack,
	MenuGroup,
	Divider,
	useBreakpointValue,
	MenuItem,
	Img,
	Spacer,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import getUser, { logOut } from "./utils/getSummitID";

const ConclaveList = () => (
	<>
		<MenuItem
			as="a"
			target="_blank"
			rel="noreferer"
			fontWeight="light"
			href="https://esummitiitm.org/youth-conclave"
		>
			YOUTH CONCLAVE
		</MenuItem>
		<MenuItem
			as="a"
			target="_blank"
			rel="noreferer"
			fontWeight="light"
			href="https://esummitiitm.org/innovators-conclave"
		>
			INNOVATORS CONCLAVE
		</MenuItem>
		<MenuItem
			as="a"
			target="_blank"
			rel="noreferer"
			fontWeight="light"
			href="https://esummitiitm.org/startup-conclave"
		>
			STARTUP CONCLAVE
		</MenuItem>
		<MenuItem
			as="a"
			target="_blank"
			rel="noreferer"
			fontWeight="light"
			href="https://esummitiitm.org/sustainability-conclave"
		>
			SUSTAINABILITY CONCLAVE
		</MenuItem>
	</>
);

export const Header = ({ sectionRefs }) => {
	const isHeaderFull = useBreakpointValue({ base: false, md: true });

	const [isHomePage] = useRoute("/");

	const headerStyles = isHomePage && {
		position: "fixed",
		bg: "background2",
		boxShadow: "lg",
	};
	const executeScroll = (sectionKey) => {
		const section = sectionRefs[sectionKey];
		if (window.scrollTo && section.current) {
			window.scrollTo(0, section.current.offsetTop - 60);
		} else if (section.current && section.current.scrollIntoView) {
			section.current.scrollIntoView();
		}
	};

	return (
		<Box top={0} left={0} w="100%" zIndex={100} {...headerStyles}>
			<Flex p="4" justify={{ base: "space-between", lg: "space-around" }}>
				<Box w="70px">
					{isHomePage ? (
						<a href="https://esummitiitm.org">
							<Img
								src="https://esummitiitm.org/images/logos/esummit_clean.png"
								alt="E-Summit Logo"
							/>
						</a>
					) : (
						<Button
							as={Link}
							to="/"
							leftIcon={<Icon as={FaArrowLeft} />}
							ml={{ base: "1em", lg: 0 }}
							px="12"
							color="purple"
						>
							Back
						</Button>
					)}
				</Box>

				<Spacer />
				{!isHomePage && getUser().summitID && (
					<Box>
						<Button
							type="primary"
							background="pink"
							onClick={logOut}
							_hover={{ background: "darkPink" }}
						>
							Log Out
						</Button>
					</Box>
				)}
				{isHomePage &&
					(isHeaderFull ? (
						<>
							<HStack mr="1em" spacing={6}>
								<Button
									variant="link"
									onClick={() => executeScroll("about")}
									color="white"
								>
									ABOUT
								</Button>
								{/* <Button
									variant="link"
									onClick={() => executeScroll("combos")}
									color="white"
								>
									COMBOS
								</Button> */}
								<Button
									variant="link"
									onClick={() => executeScroll("workshops")}
									color="white"
								>
									MASTERCLASSES
								</Button>
								{/* <Button
									variant="link"
									onClick={() => executeScroll("faq")}
									color="white"
								>
									FAQs
								</Button> */}
								<Button
									variant="link"
									onClick={() => executeScroll("contact")}
									color="white"
								>
									CONTACT
								</Button>
							</HStack>
							<Menu>
								<MenuButton
									as={Button}
									aria-label="conclaves"
									rightIcon={<Icon as={FaChevronDown} />}
									color="white"
									variant="ghost"
									_hover={{ bg: "pink" }}
									_expanded={{ bg: "pink" }}
								>
									CONCLAVES
								</MenuButton>
								<MenuList>
									<ConclaveList />
								</MenuList>
							</Menu>
						</>
					) : (
						<>
							<Menu>
								<MenuButton
									as={IconButton}
									aria-label="Conclaves"
									icon={<Icon as={GiHamburgerMenu} color="purple" />}
									size="lg"
								/>
								<MenuList>
									<MenuGroup
										title="On This page"
										fontSize="lg"
										fontWeight="semibold"
									>
										<MenuItem
											as="a"
											variant="link"
											onClick={() => executeScroll("about")}
											fontWeight="light"
										>
											ABOUT
										</MenuItem>
										{/* <MenuItem
											as="a"
											variant="link"
											onClick={() => executeScroll("combos")}
											fontWeight="light"
										>
											COMBOS
										</MenuItem> */}
										<MenuItem
											as="a"
											variant="link"
											onClick={() => executeScroll("workshops")}
											fontWeight="light"
										>
											MASTERCLASSES
										</MenuItem>
										{/* <MenuItem
											as="a"
											variant="link"
											onClick={() => executeScroll("faq")}
											fontWeight="light"
										>
											FAQS
										</MenuItem> */}
										<MenuItem
											as="a"
											variant="link"
											onClick={() => executeScroll("contact")}
											fontWeight="light"
										>
											CONTACT
										</MenuItem>
									</MenuGroup>
									<Divider />
									<MenuGroup
										title="Other Conclaves"
										fontSize="lg"
										fontWeight="semibold"
									>
										<ConclaveList />
									</MenuGroup>
								</MenuList>
							</Menu>
						</>
					))}
			</Flex>
		</Box>
	);
};
