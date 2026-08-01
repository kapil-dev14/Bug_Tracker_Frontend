import { useState } from "react";
import { Paperclip } from "lucide-react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { BUG_PRIORITIES } from "../../utils/constants";

export default function BugFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    assignedTo: "",
  });
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await onSubmit({ ...form, files });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not report bug");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Report a bug" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Title"
          required
          minLength={3}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          label="Description"
          required
          minLength={10}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Select
          label="Priority"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          options={BUG_PRIORITIES.map((p) => ({ value: p, label: p }))}
        />
        <Input
          label="Assign to (username or email, optional)"
          placeholder="e.g. kapil32 or kapil123@gmail.com"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        />
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
            <Paperclip size={14} />
            Attachments (up to 5)
          </span>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 5))}
            className="block w-full text-sm text-slate-muted file:mr-3 file:rounded-lg file:border-0 file:bg-paper file:px-3 file:py-1.5 file:text-sm file:font-medium"
          />
        </label>
        {error && <p className="text-sm text-signal-red">{error}</p>}
        <div className="mt-1 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Report bug
          </Button>
        </div>
      </form>
    </Modal>
  );
}
