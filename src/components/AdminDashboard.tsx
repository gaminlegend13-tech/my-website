import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Trash2, CheckCircle2, Circle, LogOut, Inbox, Clock, UserPlus, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface StaffMember {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"messages" | "staff">("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [staffError, setStaffError] = useState("");
  const [staffMsg, setStaffMsg] = useState("");

  useEffect(() => {
    fetchMessages();
    fetchStaff();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setLoading(false);
      return;
    }

    setMessages((data as ContactMessage[]) ?? []);
    setLoading(false);
  };

  const toggleRead = async (msg: ContactMessage) => {
    const newValue = !msg.is_read;
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, is_read: newValue } : m))
    );
    setSelected((prev) => (prev?.id === msg.id ? { ...prev, is_read: newValue } : prev));

    await supabase.from("contact_messages").update({ is_read: newValue }).eq("id", msg.id);
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);

    await supabase.from("contact_messages").delete().eq("id", id);
  };

  const fetchStaff = async () => {
    const { data, error } = await supabase
      .from("staff_members")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return;
    setStaff((data as StaffMember[]) ?? []);
  };

  const addStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError("");
    setStaffMsg("");

    const email = newStaffEmail.trim().toLowerCase();
    if (!email) return;

    const { error } = await supabase.from("staff_members").insert({ email });
    if (error) {
      setStaffError(error.message.includes("duplicate") ? "This email is already on the list." : error.message);
      return;
    }

    setStaffMsg(`${email} can now create a staff account.`);
    setNewStaffEmail("");
    fetchStaff();
  };

  const removeStaff = async (id: string, email: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    await supabase.from("staff_members").delete().eq("id", id);
    setStaffMsg(`${email} removed from authorized staff.`);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const filtered = filter === "unread" ? messages.filter((m) => !m.is_read) : messages;
  const unreadCount = messages.filter((m) => !m.is_read).length;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
              <Inbox className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-extrabold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-xs text-slate-500">G2 Pharmacy — Management Console</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-1 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setTab("messages")}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === "messages"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Inbox className="h-4 w-4" />
            Messages
          </button>
          <button
            onClick={() => setTab("staff")}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === "staff"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users className="h-4 w-4" />
            Staff Access
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {tab === "staff" ? (
          <div>
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-slate-900">Staff Access</h2>
              <p className="mt-1 text-sm text-slate-500">
                Only emails on this list can create a staff account. Add or remove authorized people below.
              </p>
            </div>

            {/* Add staff form */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
              <form onSubmit={addStaff} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Authorize new email
                  </label>
                  <div className="relative">
                    <UserPlus className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={newStaffEmail}
                      onChange={(e) => setNewStaffEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-base text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                      placeholder="newstaff@g2pharmacy.com"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg"
                >
                  <UserPlus className="h-4 w-4" />
                  Add to List
                </button>
              </form>
              {staffError && (
                <p className="mt-3 text-sm font-medium text-error-600">{staffError}</p>
              )}
              {staffMsg && (
                <p className="mt-3 text-sm font-medium text-success-600">{staffMsg}</p>
              )}
            </div>

            {/* Staff list */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60">
              <div className="border-b border-slate-100 px-6 py-4">
                <h3 className="font-display text-base font-bold text-slate-900">
                  Authorized Emails ({staff.length})
                </h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {staff.map((s) => (
                  <li key={s.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
                        <Mail className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-900">{s.email}</span>
                    </div>
                    <button
                      onClick={() => removeStaff(s.id, s.email)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-error-200 px-3 py-1.5 text-xs font-medium text-error-600 transition-colors hover:bg-error-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </li>
                ))}
                {staff.length === 0 && (
                  <li className="px-6 py-10 text-center text-sm text-slate-400">
                    No authorized emails yet.
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
        <>
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                <Mail className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Messages</p>
                <p className="font-display text-xl font-bold text-slate-900">{messages.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100">
                <Circle className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Unread</p>
                <p className="font-display text-xl font-bold text-slate-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 sm:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-100">
                <CheckCircle2 className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Read</p>
                <p className="font-display text-xl font-bold text-slate-900">
                  {messages.length - unreadCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-primary-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === "unread"
                ? "bg-primary-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading messages...</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-sm ring-1 ring-slate-200/60">
            <Inbox className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <p className="text-lg font-medium text-slate-500">No messages yet</p>
            <p className="mt-1 text-sm text-slate-400">
              Contact form submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Message list */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {filtered.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => {
                      setSelected(msg);
                      if (!msg.is_read) toggleRead(msg);
                    }}
                    className={`w-full rounded-2xl bg-white p-5 text-left shadow-sm ring-1 transition-all hover:shadow-md ${
                      selected?.id === msg.id
                        ? "ring-2 ring-primary-500"
                        : "ring-slate-200/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {!msg.is_read && (
                            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />
                          )}
                          <p className="truncate font-semibold text-slate-900">{msg.name}</p>
                        </div>
                        <p className="mt-0.5 truncate text-sm text-slate-500">{msg.email}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs text-slate-400">
                        {formatDate(msg.created_at)}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{msg.message}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-3">
              {selected ? (
                <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl font-bold text-slate-900">
                        {selected.name}
                      </h2>
                      <a
                        href={`mailto:${selected.email}`}
                        className="mt-1 inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
                      >
                        <Mail className="h-4 w-4" />
                        {selected.email}
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleRead(selected)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                      >
                        {selected.is_read ? (
                          <>
                            <Circle className="h-4 w-4" />
                            Mark Unread
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Mark Read
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteMessage(selected.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-error-200 px-3 py-2 text-sm font-medium text-error-600 transition-colors hover:bg-error-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="h-4 w-4" />
                    {formatDate(selected.created_at)}
                  </div>

                  <div className="mt-6 rounded-xl bg-slate-50 p-5">
                    <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                      {selected.message}
                    </p>
                  </div>

                  <a
                    href={`mailto:${selected.email}?subject=Re: Your message to G2 Pharmacy`}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg"
                  >
                    <Mail className="h-4 w-4" />
                    Reply via Email
                  </a>
                </div>
              ) : (
                <div className="hidden rounded-2xl bg-white py-20 text-center shadow-sm ring-1 ring-slate-200/60 lg:block">
                  <Mail className="mx-auto mb-4 h-12 w-12 text-slate-300" />
                  <p className="text-lg font-medium text-slate-500">Select a message to read</p>
                </div>
              )}
            </div>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
