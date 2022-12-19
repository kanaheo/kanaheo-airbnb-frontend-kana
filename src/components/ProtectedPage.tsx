import { useEffect } from "react";
import { useNavigate } from "react-router";
import useUser from "../lib/useUser";

// 로그인 안됐으면 홈으로
export default function useProtectedPage() {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [isLoggedIn, userLoading, navigate]);
  return;
}
