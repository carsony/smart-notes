import { useGetUser } from "@/api/auth";

export function Success() {
  const userQuery = useGetUser();

  console.log(userQuery.data)

  return <div>Logged In</div>;
}
