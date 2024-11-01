import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear(); // Clears all cached queries on logout
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return { logout, isLoading };
}
