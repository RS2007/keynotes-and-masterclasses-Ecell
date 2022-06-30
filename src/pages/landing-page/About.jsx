import { Heading, Container, VStack, Wrap, WrapItem, Icon, Box, Text } from "@chakra-ui/react";
import {
	FaCertificate,
	FaHandshake,
	FaLightbulb,
	FaTicketAlt,
	FaUserTie,
	FaPhotoVideo,
} from "react-icons/fa";

const AboutSection = () => {
	return (
		<Box w="100%" bg="white" bgGradient="linear(180deg,background1,background2)">
			<Container
				pt="2em"
				pb={{ base: "8em", lg: 200 }}
				maxW="6xl"
				marginTop="20px"
				bgGradient="linear(180deg,background1,background2)"
			>
				<VStack spacing={16} mt="16" alignSelf="center">
					<Heading
						color="wheat"
						fontSize={{ base: "16vw", md: "5vw" }}
						textAlign="center"
					>
						Why register?
					</Heading>
					<Wrap justify="center" color="white" spacing={12}>
						<WrapItem w="xs">
							<VStack>
								<Icon as={FaCertificate} boxSize="6em" />
								<Text textAlign="center" fontSize="1.2rem">
									E-Certificates from E-Cell IIT Madras
								</Text>
							</VStack>
						</WrapItem>
						<WrapItem w="xs">
							<VStack>
								<Icon as={FaUserTie} boxSize="6em" />
								<Text textAlign="center" fontSize="1.2rem">
									Upskill and gain industry knowledge from the experts
								</Text>
							</VStack>
						</WrapItem>
						<WrapItem w="xs">
							<VStack>
								<Icon as={FaHandshake} boxSize="6em" />
								<Text textAlign="center" fontSize="1.2rem">
									Access to E-Summit Virtual platform open for networking with
									entrepreneurs
								</Text>
							</VStack>
						</WrapItem>
						<WrapItem w="xs">
							<VStack>
								<Icon as={FaTicketAlt} boxSize="6em" />
								<Text textAlign="center" fontSize="1.2rem">
									Chance to win exciting coupons and incentives from our Sponsorss
								</Text>
							</VStack>
						</WrapItem>
						<WrapItem w="xs">
							<VStack>
								<Icon as={FaLightbulb} boxSize="6em" />
								<Text textAlign="center" fontSize="1.2rem">
									Access to Idea Validation Meet-up: validate startup ideas 1 on 1
									with experts
								</Text>
							</VStack>
						</WrapItem>
						<WrapItem w="xs">
							<VStack>
								<Icon as={FaPhotoVideo} boxSize="6em" />
								<Text textAlign="center" fontSize="1.2rem">
									Access to all the recorded keynotes, panels and masterclasses
								</Text>
							</VStack>
						</WrapItem>
					</Wrap>
				</VStack>
			</Container>
		</Box>
	);
};
export default AboutSection;
