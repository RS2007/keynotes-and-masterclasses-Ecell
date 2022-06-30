import {
	Button,
	VStack,
	HStack,
	Heading,
	Text,
	Spacer,
	IconButton,
	Icon,
	Divider,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "wouter";
import { removeItem, clearCart } from "../../state/cartReducer";

const CheckoutCart = () => {
	const itemsInCart = useSelector(({ cart }) => cart.items);
	const dispatch = useDispatch();

	if (itemsInCart.length === 0) {
		return (
			<VStack align="flex-start">
				<Heading size="lg" color="purple">
					Your Cart
				</Heading>
				<Spacer />
				<Text color="gray.300">
					You haven&apos;t added anything to your cart yet.
					<br /> Please go to the homepage to add some!
				</Text>
				<Text color="wheat" as={Link} to="/">
					Masterclasses & Inspirit
				</Text>
				<Spacer />
			</VStack>
		);
	}

	return (
		<VStack spacing={4} align="start" w="100%">
			<HStack w="100%">
				<Heading color="purple" size="lg">
					Your Cart
				</Heading>
				<Spacer />
				<Button color="purple" onClick={() => dispatch(clearCart())}>
					Clear
				</Button>
			</HStack>
			<Divider />
			{itemsInCart.map(({ key, title, oneLiner, price }) => {
				return (
					<HStack key={key} w="100%">
						<VStack w="100%" align="flex-start">
							<HStack w="100%">
								<Text size="lg" fontSize="xl" color="gray.100">
									{title}
								</Text>
								<Spacer />
								<IconButton
									icon={<Icon as={FaTrash} color="purple" />}
									size="sm"
									onClick={() => dispatch(removeItem(key))}
								/>
							</HStack>
							<HStack w="100%">
								<Text size="xs" color="gray.400" fontWeight="semibold">
									{oneLiner}
								</Text>
								<Spacer />
								<Text fontSize="lg" color="gray.300" fontWeight="semibold">
									{/* {discounts.some(
										({ key: discountKey }) => discountKey === key
									) ? (
										<>
											<strike>₹ {price}</strike>{" "}
											<Badge colorScheme="cyan">Free</Badge>
										</>
									) : (
										<>₹ {price}</>
									)} */}
									₹ {price}
								</Text>
							</HStack>
						</VStack>
					</HStack>
				);
			})}
		</VStack>
	);
};

export default CheckoutCart;
