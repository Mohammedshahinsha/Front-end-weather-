import { LoginForm } from "@/components/login-form";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <LoginForm onLogin={onLogin} />
    </div>
  );
}
