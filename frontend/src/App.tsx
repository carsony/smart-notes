import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { AppRouter } from "./routes/router";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60,
          },
        },
      }),
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
