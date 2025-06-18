import { useUser } from "../api/get-user";

export function Success() {
  const userQuery = useUser();

  console.log(userQuery.data)

  return <div>Logged In</div>;
}
