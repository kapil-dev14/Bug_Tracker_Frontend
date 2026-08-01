import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
  ghost: "btn-ghost",
};

export default function Button({
  variant = "primary",
  isLoading = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={`${VARIANTS[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}
