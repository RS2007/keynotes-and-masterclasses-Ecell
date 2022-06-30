import {
  HStack,
  Image,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  useMediaQuery,
  VStack,
  Center,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

const Keynote = (props) => {
  const [breakCard] = useMediaQuery("(max-width:580px)");

  if (breakCard) {
    return (
      <VStack color="white">
        <Image
          w="60%"
          borderRadius="50%"
          src="https://randomuser.me/api/portraits/men/31.jpg"
        />
        <Heading as="h3" size="md" fontFamily="Inter">
          {props.keynote.title}
        </Heading>
        <Heading as="h4" size={{ md: "md", sm: "sm" }} fontFamily="Inter">
          {props.keynote.lecturerName}
        </Heading>
        <Text> {props.keynote.lecturerDesignation}</Text>
        <Center w="100%">
          <Text fontSize="0.8rem">{props.keynote.timeAndDate}</Text>
        </Center>
        <Center w="100%" textAlign="center">
          <Text> {props.keynote.description}</Text>
        </Center>
      </VStack>
    );
  }
  return (
    <Grid
      width="45%"
      height="auto"
      templateColumns="1fr 2fr"
      gap="10%"
      minWidth="505px"
      margin="5% 10px"
    >
      <GridItem>
        <Image
          w="100%"
          borderRadius="50%"
          src="https://randomuser.me/api/portraits/men/31.jpg"
        />
      </GridItem>
      <GridItem color="white" marginLeft="5%">
        <Flex flexDir="column">
          <Heading as="h3" size="lg" fontFamily="Inter" marginBottom="10px">
            {props.keynote.title}
          </Heading>
          <HStack marginBottom="8px">
            <Heading as="h4" size="md" fontFamily="Inter">
              {props.keynote.lecturerName}
            </Heading>
            <Text>| {props.keynote.lecturerDesignation}</Text>
          </HStack>
          <Grid templateColumns="10% 90%" w="100%" marginBottom="20px">
            <GridItem>
              <CalendarIcon fontSize="1.6rem" />
            </GridItem>
            <GridItem>
              <Text fontSize="1.3rem">{props.keynote.timeAndDate}</Text>
            </GridItem>
          </Grid>
          <Flex>{props.keynote.description}</Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Keynote;
