import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UserResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const url = "/api/users/me";
  const router = useRouter();
  const { data, error } = useSWR<UserResponse>(
    router.pathname === "/enter" ? null : url
  );

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
