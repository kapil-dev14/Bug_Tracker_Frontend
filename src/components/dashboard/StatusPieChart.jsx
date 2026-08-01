import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  Open: "#3E6FE0",
  "In Progress": "#E8A33D",
  Resolved: "#2F8F7D",
};

export default function StatusPieChart({ summary }) {
  const data = [
    { name: "Open", value: summary.openBugs },
    { name: "In Progress", value: summary.inProgressBugs },
    { name: "Resolved", value: summary.resolvedBugs },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-slate-muted">
        No bugs logged yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={192}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
