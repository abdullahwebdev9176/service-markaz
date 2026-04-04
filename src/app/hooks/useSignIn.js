import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/lib/api/auth";
import { useAuth } from "@/app/context/AuthContext";

export function useSignIn() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      login(data);
      router.push("/");
    },
  });
}
