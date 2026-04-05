import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/app/lib/api/business";
import { useAuth } from "@/app/context/AuthContext";

export function useImageUpload(folder = "service-markaz/businesses") {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (file) => uploadImage(file, folder, token),
  });
}
