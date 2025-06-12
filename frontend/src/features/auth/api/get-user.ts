import { api } from "@/lib/api-client";
import type { User } from "@/types/auth";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUser = (): Promise<{ data: User | null }> => {
  return api.get("/auth/user", { withCredentials: true });
};

export const getUserQueryOptions = () => {
  return queryOptions({ queryKey: ["user"], queryFn: getUser });
};

export const useUser = () => {
  return useQuery({ ...getUserQueryOptions() });
};
