import { Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { githubLogIn } from "../api";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation(githubLogIn, {
    onSuccess: (data) => {
      toast({
        status: "success",
        title: " Welcome!!!",
        description: "Happy to have you back!!",
        position: "bottom-right",
      });
      reset();
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    onError: (error) => {
      console.log("error");
      toast({
        status: "error",
        title: "Login fail",
        description: "Check your Github information",
        position: "bottom-right",
      });
    },
  });

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
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
