import { LoginForm } from "@/features/auth/components/login";

function LoginRoute() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginRoute;
