import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { watch } from "fs";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  useHostOnlyPage();
  ProtectedPage();
  const { register, watch, handleSubmit, reset } = useForm<IForm>();
  const { roomPk } = useParams();
  const toast = useToast();
  // uploadImageMutation 이게 끝나고 마지막 작업으로 백엔드 photo에 올리기
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
      reset();
    },
  });
  // uploadURLMutation 이게 끝나고 이미지 업로드 하기 !
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "I love react",
          file: `https://imagedelivery.net/7VbZB4oVIlSndB1f5dV2Pw/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  // 이건 처음에 이미지 업로드 할 곳을 받아오기 ! ( cloudflare에 올릴라면 1회용 url을 획득해야한다 ! )
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const onSubmit = () => {
    uploadURLMutation.mutate();
  };
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Container>
        <Heading textAlign={"center"}>Upload a Photo</Heading>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
          <FormControl>
            <Input {...register("file")} type="file" accept="image/*" />
          </FormControl>
          <Button
            isLoading={
              createPhotoMutation.isLoading ||
              uploadImageMutation.isLoading ||
              uploadURLMutation.isLoading
            }
            type="submit"
            w="full"
            colorScheme={"red"}
          >
            Upload photos
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
