import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getRoom, getRoomReivews } from "../api";
import { IReview, IRoomDetail } from "../types";
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
  Container,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >(["rooms", roomPk, "reviews"], getRoomReivews);
  const [dates, setDates] = useState<Date>();
  console.log(dates);
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton height={"43px"} width={"25%"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
        <Box mt={1}>
          <HStack>
            <FaStar />
            <Text>{data?.rating}</Text>
            <Link to="#">
              <Text textDecor={"underline"}>Reviews {reviewsData?.length}</Text>
            </Link>
          </HStack>
        </Box>
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
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar />
                <Text>{data?.rating}</Text>
                <Text>・</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size={"md"}
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={setDates}
            prev2Label={null} // 년도 이동 X
            next2Label={null}
            minDetail="month" // 위에 날짜 버튼 클릭해서 원하는 년도 가게 하는게 못하게
            minDate={new Date()} // 최소 예약 날짜는 오늘로부터
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)} // 약6개월 계산 방법 ms로 계산하니 마지막에 1000을 한거
            locale="en"
            selectRange
          />
        </Box>
      </Grid>
    </Box>
  );
}
