import { Text, HStack, Image, VStack, Icon, IconButton, Flex, LightMode } from "@chakra-ui/react";
import {
	FaEnvelope,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaPhone,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";

const Footer = () => {
	return (
		<Flex
			p="12"
			justify="space-around"
			wrap={{ base: "wrap", lg: "nowrap" }}
			align="center"
			bg="white"
			mt="20px"
		>
			<Image src="https://esummitiitm.org/images/logos/e-cell_logo.png" maxW="250px" />
			<VStack w={{ base: "100%", lg: "auto" }} mt={{ base: "2em", lg: 0 }} align="flex-start">
				<Text fontSize="xl" fontWeight={600} color="gray.800">
					Content Creation Masterclasses
				</Text>
				<Text fontSize="lg" fontWeight="400" color="gray.600" w="100%">
					<Icon as={FaEnvelope} />{" "}
					<a href="eclub@smail.iitm.ac.in">eclub@smail.iitm.ac.in</a>
					<br />
					<Icon as={FaPhone} /> +91 9820233220{" "}
					<span style={{ fontWeight: "bold" }}>(Sukheth)</span>
				</Text>
				<br />
				<Text fontSize="xl" fontWeight={600} color="gray.800">
					Startup Masterclasses
				</Text>
				<Text fontSize="lg" fontWeight="400" color="gray.600" w="100%">
					<Icon as={FaEnvelope} />{" "}
					<a href="services_ecell@smail.iitm.ac.in">services_ecell@smail.iitm.ac.in</a>
					<br />
					<Icon as={FaPhone} /> +91 9997677804{" "}
					<span style={{ fontWeight: "bold" }}>(Akshat)</span>
				</Text>
				<br />
				<Text fontSize="xl" fontWeight={600} color="gray.800">
					Product & Growth Masterclasses
				</Text>
				<Text fontSize="lg" fontWeight="400" color="gray.600" w="100%">
					<Icon as={FaEnvelope} />{" "}
					<a href="events_ecell@smail.iitm.ac.in">events_ecell@smail.iitm.ac.in</a>
					<br />
					<Icon as={FaPhone} /> +91 85300 81736{" "}
					<span style={{ fontWeight: "bold" }}>(Abhishek)</span>
				</Text>
			</VStack>
			<VStack mt={{ base: "2em", lg: 0 }}>
				<Text fontSize="1.2em" fontWeight="semibold" color="gray.800">
					We are social
				</Text>
				<LightMode>
					<HStack justify="center" w={{ base: "100%", lg: "auto" }}>
						<br />
						<IconButton
							as="a"
							icon={<Icon as={FaFacebook} />}
							href="https://www.facebook.com/ECELLIITM/"
							size="sm"
							borderRadius="100%"
							colorScheme="facebook"
						/>
						<IconButton
							as="a"
							icon={<Icon as={FaInstagram} />}
							href="https://www.instagram.com/ecell_iitm/?hl=en"
							size="sm"
							borderRadius="100%"
							colorScheme="blue"
						/>
						<IconButton
							as="a"
							icon={<Icon as={FaLinkedin} />}
							href="https://www.linkedin.com/company/e-cell-iitm/?originalSubdomain=in"
							size="sm"
							borderRadius="100%"
							colorScheme="linkedin"
						/>
						<IconButton
							as="a"
							icon={<Icon as={FaYoutube} />}
							href="https://www.youtube.com/channel/UCtPazFT8VSfAeREcgag4zMw"
							size="sm"
							borderRadius="100%"
							colorScheme="red"
						/>
						<IconButton
							as="a"
							icon={<Icon as={FaTwitter} />}
							href="https://twitter.com/ecelliitm"
							size="sm"
							borderRadius="100%"
							colorScheme="twitter"
						/>
					</HStack>
				</LightMode>
			</VStack>
		</Flex>
	);
};
export default Footer;
