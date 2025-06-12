import { NotebookPen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "@/components/icons/google-icon";

interface LoginFormProps extends React.ComponentProps<"div"> {
  text?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/login`, "_self");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <NotebookPen className="size-6" />
            </div>
            <span className="sr-only">Smart Notes</span>
          </a>
          <h1 className="text-xl font-bold">Welcome to Smart Notes</h1>
        </div>
        <div className="">
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleLogin}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
