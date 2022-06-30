import { Link, Route, useRoute } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, selectWorkshopsCount } from "./state/cartReducer";
import {
	Box,
	Button,
	Icon,
	Text,
	IconButton,
	Fade,
	Menu,
	MenuButton,
	MenuList,
	HStack,
	MenuGroup,
	Divider,
} from "@chakra-ui/react";

import { FaShoppingCart, FaTrash } from "react-icons/fa";

import LandingPage from "./pages/landing-page";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { useRef } from "react";
import CheckoutPage from "./pages/checkout-page";

const CartWidget = () => {
	const dispatch = useDispatch();
	const numItems = useSelector(selectWorkshopsCount);
	const cart = useSelector(({ cart }) => cart);

	return (
		<Box bottom="4em" right="4em" position="fixed">
			<Fade in={numItems > 0} unmountOnExit>
				<Menu placement="bottom-end">
					<MenuButton
						aria-label="Cart Button"
						aria-describedby="Go to your cart"
						as={IconButton}
						icon={<Icon as={FaShoppingCart} color="darkPink" />}
						to="/checkout"
						_focus={{ outline: "none", border: "none" }}
						// background="purple"
						size="lg"
						borderRadius="full"
						border="2px solid"
						borderColor="walnut"
						_after={{
							content: `'${numItems.toString()}'`,
							h: 8,
							w: 8,
							borderRadius: "100%",
							bg: "darkPink",
							position: "absolute",
							right: -3,
							top: -3,
							lineHeight: 6,
							border: "2px solid",
							borderColor: "walnut",
							textAlign: "center",
						}}
					/>

					<MenuList isFocusable={false} minW="sm" pb={0}>
						<MenuGroup title="Cart" fontSize="xl" />
						{cart.items.length > 0 && <Divider m="1em 0 1em 0" />}
						{cart.items.map((item) => (
							<HStack justify="space-between" w="100%" key={item.key} p="4" pt={0}>
								<Text>{item.title}</Text>
								<IconButton
									icon={<Icon as={FaTrash} color="purple" />}
									color
									onClick={() => dispatch(removeItem(item.key))}
								/>
							</HStack>
						))}

						<Divider />
						<Button
							as={Link}
							to="/checkout"
							textAlign="right"
							w="100%"
							color="background1"
							borderTopRadius={0}
						>
							Proceed to Checkout
						</Button>
					</MenuList>
				</Menu>
			</Fade>
		</Box>
	);
};

const App = () => {
	const [isHomePage] = useRoute("/");

	const aboutSectionRef = useRef(null);
	const comboSectionRef = useRef(null);
	const workshopSectionRef = useRef(null);
	const faqSectionRef = useRef(null);
	const contactSectionRef = useRef(null);
	const speakerSectionRef = useRef(null);

	const sectionRefs = {
		about: aboutSectionRef,
		combos: comboSectionRef,
		workshops: workshopSectionRef,
		faq: faqSectionRef,
		contact: contactSectionRef,
		speakers: speakerSectionRef,
	};

	return (
		<div className="body-inner" style={{ minHeight: "100vh" }}>
			<Header sectionRefs={sectionRefs} />
			<Route path="/checkout" component={CheckoutPage} />
			<Route path="/">
				<LandingPage sectionRefs={sectionRefs} />
			</Route>
			<Footer />
			{isHomePage && <CartWidget />}
		</div>
	);
};

export default App;
