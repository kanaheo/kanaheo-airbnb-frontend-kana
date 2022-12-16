import {
  Button,
  Image,
  Grid,
  Box,
  VStack,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const grayToggle = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={2} rounded={"3xl"}>
        <Image
          minH="280"
          src="https://a0.muscache.com/im/pictures/miso/Hosting-50962937/original/f4b5ac73-9d22-4285-9b95-8b5ef9c99a7e.jpeg?im_w=720"
        />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart size={"20px"} />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text as="b" noOfLines={1} fontSize="md">
            마키야 숙박은 고조, 기온, 교토역 근처입니다.
          </Text>
          <HStack spacing={1}>
            <FaStar size={15} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={grayToggle}>
          Seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize={"sm"} color={grayToggle}>
        <Text as="b">72$</Text> / night
      </Text>
    </VStack>
  );
}
