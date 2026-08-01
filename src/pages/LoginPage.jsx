import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bug, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(form);
      navigate("/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="panel w-full max-w-sm p-7">
        <div className="mb-6 flex items-center gap-2">
          <Bug size={22} className="text-signal-amber" />
          <span className="font-display text-xl font-semibold">Trackwork</span>
        </div>
        <h2 className="mb-1 text-lg font-semibold text-ink">Welcome back</h2>
        <p className="mb-6 text-sm text-slate-muted">
          Log in to see your projects.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username or email"
            required
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          />
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-[34px] text-slate-muted hover:text-ink"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-sm text-signal-red">{error}</p>}
          <Button type="submit" isLoading={isLoading} className="mt-1 w-full">
            Log in
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-muted">
          No account?{" "}
          <Link to="/register" className="font-medium text-ink underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
