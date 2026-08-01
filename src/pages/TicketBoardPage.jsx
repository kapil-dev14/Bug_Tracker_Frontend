import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, ListChecks } from "lucide-react";
import {
  getProjectTicketsApi,
  createTicketApi,
  updateTicketApi,
  deleteTicketApi,
} from "../api/tickets.api";
import Topbar from "../components/layout/Topbar";
import TicketFilters from "../components/tickets/TicketFilters";
import TicketCard from "../components/tickets/TicketCard";
import TicketFormModal from "../components/tickets/TicketFormModal";
import TicketDetailDrawer from "../components/tickets/TicketDetailDrawer";
import Pagination from "../components/ui/Pagination";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
import Button from "../components/ui/Button";

const initialFilters = { status: "", priority: "", page: 1 };

export default function TicketBoardPage() {
  const { projectId } = useParams();
  const [filters, setFilters] = useState(initialFilters);

  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    const result = await getProjectTicketsApi(projectId, {
      page: filters.page,
      limit: 12,
      status: filters.status || undefined,
      priority: filters.priority || undefined,
    });
    setTickets(result.tickets);
    setPagination({
      currentPage: result.pagination.page,
      totalPages: result.pagination.totalPages,
      hasNextPage: result.pagination.page < result.pagination.totalPages,
      hasPrevPage: result.pagination.page > 1,
    });
    setIsLoading(false);
  }, [projectId, filters.page, filters.status, filters.priority]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleCreate = async (payload) => {
    await createTicketApi(projectId, payload);
    setFilters(initialFilters);
    loadTickets();
  };

  const handleUpdate = async (ticketId, patch) => {
    const updated = await updateTicketApi(ticketId, patch);
    setTickets((prev) => prev.map((t) => (t._id === ticketId ? updated : t)));
    setActiveTicket((prev) => (prev && prev._id === ticketId ? updated : prev));
  };

  const handleDelete = async (ticketId) => {
    await deleteTicketApi(ticketId);
    setTickets((prev) => prev.filter((t) => t._id !== ticketId));
  };

  return (
    <>
      <Topbar
        title="Ticket board"
        subtitle="General work items and tasks, can be assigned to multiple people"
        actions={
          <Button onClick={() => setShowForm(true)}>
            <Plus size={15} />
            New ticket
          </Button>
        }
      />

      <div className="p-6">
        <div className="mb-5">
          <TicketFilters filters={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : tickets.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            title="No tickets found"
            subtitle="Nothing matches your filters, or nothing's been created yet."
            action={
              <Button onClick={() => setShowForm(true)}>Create a ticket</Button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket._id}
                  ticket={ticket}
                  onClick={() => setActiveTicket(ticket)}
                />
              ))}
            </div>
            {pagination && (
              <Pagination
                {...pagination}
                page={pagination.currentPage}
                onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              />
            )}
          </>
        )}
      </div>

      {showForm && (
        <TicketFormModal
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}

      {activeTicket && (
        <TicketDetailDrawer
          ticket={activeTicket}
          onClose={() => setActiveTicket(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
