import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

export default function ProjectModal({ project, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: project?.name || "",
    description: project?.description || "",
  });
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
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title={project ? "Edit project" : "New project"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Project name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {error && <p className="text-sm text-signal-red">{error}</p>}
        <div className="mt-1 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {project ? "Save changes" : "Create project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
