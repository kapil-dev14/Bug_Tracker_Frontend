import { Loader2 } from "lucide-react";

export default function Spinner({ size = 22 }) {
  return <Loader2 size={size} className="animate-spin text-slate-muted" />;
}
