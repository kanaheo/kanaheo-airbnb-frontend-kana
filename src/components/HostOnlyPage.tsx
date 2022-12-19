import { useEffect } from "react";
import { useNavigate } from "react-router";
import useUser from "../lib/useUser";

// 오로지 host만
export default function useHostOnlyPage() {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [user, userLoading, navigate]);
  return;
}
