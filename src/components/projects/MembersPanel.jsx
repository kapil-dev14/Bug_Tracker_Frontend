import { useState } from "react";
import { UserMinus, UserPlus } from "lucide-react";
import Avatar from "../ui/Avatar";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function MembersPanel({
  project,
  isOwner,
  onAddMember,
  onRemoveMember,
}) {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await onAddMember(identifier.trim());
      setIdentifier("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="panel p-5">
      <h3 className="mb-1 font-display text-base font-semibold">Members</h3>
      <p className="mb-4 text-sm text-slate-muted">
        {project.members?.length || 0} people have access to this project.
      </p>

      <ul className="mb-5 flex flex-col divide-y divide-slate-line">
        {project.members?.map((member) => {
          const isOwnerAccount = member._id === project.owner?._id;
          return (
            <li
              key={member._id}
              className="flex items-center justify-between py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <Avatar name={member.username || member.fullname} />
                <div>
                  <p className="text-sm font-medium text-ink">
                    {member.fullname || member.username}
                  </p>
                  <p className="text-xs text-slate-muted">
                    {member.email} {isOwnerAccount && "· Owner"}
                  </p>
                </div>
              </div>
              {isOwner && !isOwnerAccount && (
                <button
                  onClick={() => onRemoveMember(member._id)}
                  className="rounded p-1.5 text-slate-muted hover:bg-paper hover:text-signal-red"
                  title="Remove member"
                >
                  <UserMinus size={15} />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {isOwner && (
        <form onSubmit={handleAdd} className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              label="Add member by username or email"
              placeholder="e.g. kapil32 or kapil123@gmail.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <Button type="submit" isLoading={isSubmitting} className="shrink-0">
            <UserPlus size={15} />
            Add
          </Button>
        </form>
      )}
      {error && <p className="mt-2 text-xs text-signal-red">{error}</p>}
    </div>
  );
}
