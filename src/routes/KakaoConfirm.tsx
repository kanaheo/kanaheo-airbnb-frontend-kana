import { Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { kakaoLogIn } from "../api";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const kakaoLoginStatus = await kakaoLogIn(code);
      if (kakaoLoginStatus === 200) {
        toast({
          status: "success",
          title: " Welcome!!!",
          description: "Happy to have you back!!",
          position: "bottom-right",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      } else {
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt="40">
      <Heading>Processing Log in...</Heading>
      <Text>Don't go anywhere!</Text>
      <Spinner
        size="lg"
        thickness="4px"
        emptyColor="gray.200"
        color="blue.500"
      />
    </VStack>
  );
}
