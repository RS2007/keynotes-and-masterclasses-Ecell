import { Flex, Heading, VStack, Image, Divider, Button, HStack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addItem } from "../../state/cartReducer";

import passes from "../../state/passes.json";

export function Combos() {
	const dispatch = useDispatch();
	return (
		<VStack
			w="100vw"
			bgGradient="linear(180deg,background1,background2)"
			color="white"
			marginTop="20px"
			paddingTop="10vh"
			paddingBottom="10vh"
		>
			<VStack>
				<Heading color="wheat" fontSize={{ base: "16vw", md: "5vw" }}>
					Best of Both Worlds
				</Heading>
				<Text textAlign="center" fontSize="2xl" fontWeight="bold">
					Give yourself a headstart by availing these specially made passes
				</Text>
			</VStack>

			<Flex w={{ md: "70%", base: "80%" }} flexWrap="wrap" justify="space-between">
				{passes.map((pass) => (
					<Flex
						key={pass.key}
						direction="column"
						color="white"
						w={{ md: "45%", base: "100%" }}
						marginTop="20px"
						minWidth="200px"
						fontFamily="Inter"
					>
						<Image
							w="100%"
							src={`/passes-logos/${pass.img}.png`}
							borderRadius="12px"
							marginBottom="6"
						/>
						<Heading marginBottom="10px" fontFamily="Inter">
							{pass.title}
						</Heading>
						{pass.items.map((item) => (
							<HStack key={item.key} justify="space-between" mb="3" fontSize="lg">
								<Text>{item.title}</Text>
								<Text>₹ {item.price} /-</Text>
							</HStack>
						))}
						{pass.title === "Unicorn Pass" ? (
							<Text color="grey" fontSize="xl">
								(Get access to all 20+ recordings)
							</Text>
						) : (
							""
						)}
						<Divider mt="auto" pt="3" />
						<HStack justify="space-between" my="3" fontSize="lg" color="inactive">
							<Text>Total</Text>
							<Text textDecoration="line-through">₹ {pass.total} /-</Text>
						</HStack>
						<HStack
							justify="space-between"
							marginBottom="8"
							fontSize="xl"
							fontWeight={800}
						>
							<Text>{pass.title} Offer</Text>
							<Text>₹ {pass.price} /-</Text>
						</HStack>
						<Button
							variant="pink"
							w="100%"
							onClick={() =>
								dispatch(
									addItem({
										key: pass.key,
										title: pass.title,
										price: pass.price,
										oneLiner: pass.oneLiner,
									})
								)
							}
						>
							Add to Cart
						</Button>
					</Flex>
				))}
			</Flex>
		</VStack>
	);
}
