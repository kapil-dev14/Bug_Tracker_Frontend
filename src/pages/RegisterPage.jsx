import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bug, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

const initialForm = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  role: "Developer",
};

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-10">
      <div className="panel w-full max-w-sm p-7">
        <div className="mb-6 flex items-center gap-2">
          <Bug size={22} className="text-signal-amber" />
          <span className="font-display text-xl font-semibold">Trackwork</span>
        </div>
        <h2 className="mb-1 text-lg font-semibold text-ink">
          Create an account
        </h2>
        <p className="mb-6 text-sm text-slate-muted">
          Start tracking bugs and tickets.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full name"
            required
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          />
          <Input
            label="Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          <Select
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            options={[
              { value: "Developer", label: "Developer" },
              { value: "Admin", label: "Admin" },
            ]}
          />
          {error && <p className="text-sm text-signal-red">{error}</p>}
          <Button type="submit" isLoading={isLoading} className="mt-1 w-full">
            Create account
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-ink underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
