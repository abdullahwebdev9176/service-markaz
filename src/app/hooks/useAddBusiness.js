import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createBusiness } from "@/app/lib/api/business";
import { useAuth } from "@/app/context/AuthContext";

export function useAddBusiness() {
  const { token } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => createBusiness(data, token),
    onSuccess: () => {
      router.push("/provider-profile");
    },
  });
}
