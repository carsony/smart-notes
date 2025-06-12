import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { userLoader } from "./auth/success";

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/login",
      lazy: () =>
        import("./auth/login").then((module) => ({
          Component: module.default,
        })),
    },
    {
      path: "/",
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "/login/success",
          lazy: () =>
            import("./auth/success").then((module) => ({
              Component: module.default,
            })),
          loader: userLoader(queryClient),
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
