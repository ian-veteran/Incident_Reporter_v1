import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); // Cache user data
      toast.success("Login successful! Redirecting..."); // Show success toast
      setTimeout(() => navigate("/dashboard", { replace: true }), 500); // Delayed transition for smoother navigation
    },

    onError: () => {
      toast.error("Provided email or password is incorrect"); // Show error toast
    },
  });

  return { login, isLoading };
}
