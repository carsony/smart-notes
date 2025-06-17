import type { QueryClient } from "@tanstack/react-query";
import { Success } from "@/features/auth/components/success";
import { getGetUserQueryOptions } from "@/api/auth";
// import { getUserQueryOptions } from "@/features/auth/api/get-user";

export const userLoader = (queryClient: QueryClient) => async () => {
  const query = getGetUserQueryOptions();
  return await queryClient.ensureQueryData(query);
};

function SuccessRoute() {
  return <Success />;
}

export default SuccessRoute;
