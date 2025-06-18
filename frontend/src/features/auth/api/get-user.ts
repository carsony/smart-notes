import { getUser } from "@/api/auth";

import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUserQueryOptions = () => {
  return queryOptions({ queryKey: ["user"], queryFn: getUser });
};

export const useUser = () => {
  return useQuery({ ...getUserQueryOptions() });
};
