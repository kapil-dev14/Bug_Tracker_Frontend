import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { TICKET_PRIORITIES } from "../../utils/constants";

export default function TicketFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create ticket");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="New ticket" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          label="Description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Select
          label="Priority"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          options={TICKET_PRIORITIES.map((p) => ({ value: p, label: p }))}
        />
        <p className="text-xs text-slate-muted">
          Note: you must be a member of this project to create tickets in it.
        </p>
        {error && <p className="text-sm text-signal-red">{error}</p>}
        <div className="mt-1 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create ticket
          </Button>
        </div>
      </form>
    </Modal>
  );
}
