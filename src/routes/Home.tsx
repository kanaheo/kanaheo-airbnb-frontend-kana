import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        sm: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      <Box>
        <Skeleton height={280} rounded={"2xl"} mb={7} />
        <SkeletonText w="80%" noOfLines={2} mb={7} />
        <SkeletonText w="40%" noOfLines={1} />
      </Box>
      <Room />
    </Grid>
  );
}
