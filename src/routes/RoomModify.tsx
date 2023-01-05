import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

interface IRoomModify {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
}

export default function RoomModify() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRoomModify>();

  console.log("data");
  console.log(data);

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name + " Edit" : "Loadnig..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width={"100%"} isLoaded={!isLoading}>
        <Skeleton isLoaded={!isLoading} height={"43px"}>
          <Heading>{data?.name}</Heading>
          <VStack mt={10}>
            <Input
              {...register("name", {
                required: "Please write RoomName",
              })}
              defaultValue={data?.name}
              variant={"filled"}
              placeholder="Room ame"
              w={"25%"}
            />
            <Input
              {...register("country", {
                required: "Please write Name",
              })}
              defaultValue={data?.country}
              variant={"filled"}
              placeholder="Country"
              w={"25%"}
              mt={10}
            />
          </VStack>
        </Skeleton>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={3}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w={"100%"}
                  h={"100%"}
                  src={data?.photos[index]?.file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={60} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"2xl"}>
                  House Hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>・</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
        </Box>
      </Grid>
    </Box>
  );
}
