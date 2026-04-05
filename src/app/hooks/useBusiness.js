import { useQuery } from "@tanstack/react-query";
import { getMyBusiness } from "@/app/lib/api/business";
import { useAuth } from "@/app/context/AuthContext";

export function useBusiness() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["my-business"],
    queryFn: () => getMyBusiness(token),
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
