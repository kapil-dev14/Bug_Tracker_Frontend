import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Bug as BugIcon } from "lucide-react";
import {
  getProjectBugsApi,
  createBugApi,
  updateBugApi,
  deleteBugApi,
} from "../api/bugs.api";
import { useDebounce } from "../hooks/useDebounce";
import Topbar from "../components/layout/Topbar";
import BugFilters from "../components/bugs/BugFilters";
import BugCard from "../components/bugs/BugCard";
import BugFormModal from "../components/bugs/BugFormModal";
import BugDetailDrawer from "../components/bugs/BugDetailDrawer";
import Pagination from "../components/ui/Pagination";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
import Button from "../components/ui/Button";

const initialFilters = { search: "", status: "", priority: "", page: 1 };

export default function BugBoardPage() {
  const { projectId } = useParams();
  const [filters, setFilters] = useState(initialFilters);
  const debouncedSearch = useDebounce(filters.search);

  const [bugs, setBugs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeBug, setActiveBug] = useState(null);

  const loadBugs = useCallback(async () => {
    setIsLoading(true);
    const result = await getProjectBugsApi(projectId, {
      page: filters.page,
      limit: 12,
      status: filters.status || undefined,
      priority: filters.priority || undefined,
      search: debouncedSearch || undefined,
    });
    setBugs(result.bugs);
    setPagination(result.pagination);
    setIsLoading(false);
  }, [
    projectId,
    filters.page,
    filters.status,
    filters.priority,
    debouncedSearch,
  ]);

  useEffect(() => {
    loadBugs();
  }, [loadBugs]);

  const handleCreate = async (payload) => {
    await createBugApi(projectId, payload);
    setFilters(initialFilters);
    loadBugs();
  };

  const handleUpdate = async (bugId, patch) => {
    const updated = await updateBugApi(bugId, patch);
    setBugs((prev) => prev.map((b) => (b._id === bugId ? updated : b)));
    setActiveBug((prev) => (prev && prev._id === bugId ? updated : prev));
  };

  const handleDelete = async (bugId) => {
    await deleteBugApi(bugId);
    setBugs((prev) => prev.filter((b) => b._id !== bugId));
  };

  return (
    <>
      <Topbar
        title="Bug board"
        subtitle="Defect reports with attachments, comments and a single assignee"
        actions={
          <Button onClick={() => setShowForm(true)}>
            <Plus size={15} />
            Report bug
          </Button>
        }
      />

      <div className="p-6">
        <div className="mb-5">
          <BugFilters filters={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : bugs.length === 0 ? (
          <EmptyState
            icon={BugIcon}
            title="No bugs found"
            subtitle="Nothing matches your filters, or nothing's been reported yet."
            action={
              <Button onClick={() => setShowForm(true)}>Report a bug</Button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bugs.map((bug) => (
                <BugCard
                  key={bug._id}
                  bug={bug}
                  onClick={() => setActiveBug(bug)}
                />
              ))}
            </div>
            {pagination && (
              <Pagination
                page={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              />
            )}
          </>
        )}
      </div>

      {showForm && (
        <BugFormModal
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}

      {activeBug && (
        <BugDetailDrawer
          bug={activeBug}
          onClose={() => setActiveBug(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
