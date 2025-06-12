import { useUser } from "../api/get-user";

export function Success() {
  const userQuery = useUser();
  const user = userQuery.data;

  if (!user) return null;

  return <div>Logged In</div>;
}
