import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel} width="max-w-sm">
      <p className="text-sm text-slate-text">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
