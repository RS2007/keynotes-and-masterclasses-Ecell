import { Flex, Grid, GridItem, SlideFade } from "@chakra-ui/react";

import UserDetails from "./UserDetails";
import CheckoutCart from "./CheckoutCart";

const CheckoutPage = () => {
	return (
		<Flex
			align="center"
			justify="center"
			wrap="wrap"
			p="1em"
			mb="16"
			zIndex={999}
			background="background2"
			minH={{ base: "65vh", md: "auto" }}
		>
			<SlideFade in={true} offsetY="20px">
				<Grid templateColumns="repeat(12, 1fr)" gap={0} minW={{ base: "90vw", lg: "70vw" }}>
					<GridItem
						colSpan={{ base: 0, md: 1 }}
						display={{ base: "none", md: "revert" }}
					/>
					<GridItem colSpan={{ base: 12, md: 5 }} p="1em">
						<CheckoutCart />
					</GridItem>
					<GridItem colSpan={1} display={{ base: "none", md: "revert" }} />
					<GridItem colSpan={{ base: 12, md: 4 }} p="1em">
						<UserDetails />
					</GridItem>
				</Grid>
			</SlideFade>
		</Flex>
	);
};

export default CheckoutPage;
