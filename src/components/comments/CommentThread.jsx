import { useEffect, useState } from "react";
import { Trash2, Send } from "lucide-react";
import { addCommentApi, deleteCommentApi, getBugCommentsApi } from "../../api/comments.api";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";
import { timeAgo } from "../../utils/formatDate";

export default function CommentThread({ bugId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const load = async () => {
    setIsLoading(true);
    const data = await getBugCommentsApi(bugId);
    setComments(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, [bugId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setIsSending(true);
    try {
      const comment = await addCommentApi(bugId, text.trim());
      setComments((prev) => [comment, ...prev]);
      setText("");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (commentId) => {
    await deleteCommentApi(commentId);
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-ink">Comments</h4>

      <form onSubmit={handleSend} className="mb-4 flex gap-2">
        <input
          className="input"
          placeholder="Add a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSending || !text.trim()}
          className="btn-secondary shrink-0 px-3"
        >
          <Send size={15} />
        </button>
      </form>

      {isLoading ? (
        <p className="text-sm text-slate-muted">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-slate-muted">No comments yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => (
            <li key={comment._id} className="flex gap-2.5">
              <Avatar name={comment.author?.username} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink">
                    {comment.author?.username}
                  </span>
                  <span className="text-xs text-slate-muted">{timeAgo(comment.createdAt)}</span>
                  {comment.author?._id === user?._id && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="ml-auto text-slate-muted hover:text-signal-red"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-slate-text">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
