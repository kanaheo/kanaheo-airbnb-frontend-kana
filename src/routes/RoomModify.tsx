import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAmenities, getCategories, getRoom, updateRoom } from "../api";
import {
  IAmenity,
  ICategory,
  IForm,
  IRoomDetail,
  IUpdateRoomVariables,
} from "../types";
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
  InputLeftAddon,
  FormControl,
  FormLabel,
  Container,
  FormHelperText,
  Checkbox,
  Select,
  Textarea,
  Toast,
  useToast,
} from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";

export default function RoomModify() {
  const { roomPk } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: amenities } = useQuery<IAmenity[]>(["amenities"], getAmenities);
  const { data: categories } = useQuery<ICategory[]>(
    ["categories"],
    getCategories
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateRoomVariables>();

  // const selected_amenities = data?.amenities;

  const data_amenities: number[][] = [];
  if (data?.amenities) {
    data_amenities.push(
      data?.amenities.map((amenity) => {
        return amenity.pk;
      })
    );
  }

  const mutation = useMutation(updateRoom, {
    onSuccess: (data: IRoomDetail) => {
      if (!mutation.isLoading) {
        toast({
          status: "success",
          title: "Room Update",
          position: "bottom-right",
        });
        navigate(`/rooms/${data.id}`);
      }
    },
  });

  const onSubmit = (data: IUpdateRoomVariables) => {
    if (roomPk) {
      data["roomPk"] = roomPk;
      mutation.mutate(data);
    }
  };

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
      <Skeleton height={"43px"} isLoaded={!isLoading}>
        <Skeleton isLoaded={!isLoading} height={"43px"}>
          <Heading>
            {data?.owner.name}의 {data?.name}
          </Heading>
          <Container>
            <VStack
              mt={10}
              spacing={5}
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {data ? (
                <>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...register("name", {
                        required: "Please write RoomName",
                      })}
                      defaultValue={data?.name}
                      placeholder="Room Name"
                    />
                    <FormHelperText>
                      Write the name of your room.
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Input
                      {...register("country", {
                        required: "Please write country",
                      })}
                      defaultValue={data?.country}
                      placeholder="Country"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input
                      {...register("city", {
                        required: "Please write City",
                      })}
                      defaultValue={data?.city}
                      placeholder="City"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      {...register("address", {
                        required: "Please write Address",
                      })}
                      defaultValue={data?.address}
                      placeholder="Address"
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children={<FaMoneyBill />} />
                      <Input
                        {...register("price", { required: true })}
                        defaultValue={data?.price}
                        type="number"
                        min={0}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Rooms</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children={<FaBed />} />
                      <Input
                        {...register("rooms", { required: true })}
                        defaultValue={data?.rooms}
                        type="number"
                        min={0}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Toilets</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children={<FaToilet />} />
                      <Input
                        {...register("toilets", { required: true })}
                        defaultValue={data?.toilets}
                        type="number"
                        min={0}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...register("description", { required: true })}
                      defaultValue={data?.description}
                    />
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      {...register("pet_friendly", { required: true })}
                      defaultChecked={data?.pet_friendly}
                    >
                      Pet friendly?
                    </Checkbox>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Kind of room</FormLabel>
                    <Select
                      {...register("kind", { required: true })}
                      placeholder="Choose a kind"
                      defaultValue={data?.kind}
                    >
                      <option value="entire_place">Entire Place</option>
                      <option value="private_room">Private Room</option>
                      <option value="shared_room">Shared Room</option>
                    </Select>
                    <FormHelperText>
                      What kind of room are you renting?
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      {...register("category", { required: true })}
                      placeholder="Choose a category"
                      defaultValue={data?.category.pk}
                    >
                      {categories?.map((category) => (
                        <option key={category.pk} value={category.pk}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText>
                      What category describes your room?
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Amenities</FormLabel>
                    <Grid templateColumns={"1fr 1fr"} gap={5}>
                      {amenities?.map((amenity) => {
                        return (
                          <Box key={amenity.pk}>
                            <Checkbox
                              value={amenity.pk}
                              {...register("amenities", { required: true })}
                              defaultChecked={data_amenities[0].includes(
                                amenity.pk
                              )}
                            >
                              {amenity.name}
                            </Checkbox>
                            <FormHelperText>
                              {amenity.description}
                            </FormHelperText>
                          </Box>
                        );
                      })}
                    </Grid>
                  </FormControl>
                  {mutation.isError ? (
                    <Text color="red.500">Something went wrong</Text>
                  ) : null}
                  <Button
                    type="submit"
                    isLoading={mutation.isLoading}
                    colorScheme={"red"}
                    size="lg"
                    w="100%"
                  >
                    Update Room
                  </Button>
                </>
              ) : null}
            </VStack>
          </Container>
        </Skeleton>
      </Skeleton>
      <Grid
        mt={158}
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
            {/* <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w={"100%"}
                  h={"100%"}
                  src={data?.photos[index]?.file}
                />
              ) : null}
            </Skeleton> */}
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
          </HStack>
        </Box>
      </Grid>
    </Box>
  );
}
