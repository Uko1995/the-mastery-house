import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Enrollment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  ageBand: string;
  createdAt: string;
  [key: string]: unknown;
}

interface WaitingListEntry {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  ageBand: string;
  message?: string;
  createdAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type TabType = "enrollments" | "waiting-list";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("enrollments");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [waitingList, setWaitingList] = useState<WaitingListEntry[]>([]);
  const [enrollmentsPagination, setEnrollmentsPagination] =
    useState<PaginationInfo | null>(null);
  const [waitingListPagination, setWaitingListPagination] =
    useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<Enrollment | null>(null);

  const navigate = useNavigate();
  const apiKey = sessionStorage.getItem("adminApiKey");

  const fetchEnrollments = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `/api/admin/enrollments?page=${page}&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        if (response.status === 401) {
          sessionStorage.removeItem("adminApiKey");
          navigate("/admin");
          return;
        }

        const data = await response.json();
        if (data.success) {
          setEnrollments(data.data);
          setEnrollmentsPagination(data.pagination);
        }
      } catch {
        setError("Failed to fetch enrollments");
      }
    },
    [apiKey, navigate]
  );

  const fetchWaitingList = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `/api/admin/waiting-list?page=${page}&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        if (response.status === 401) {
          sessionStorage.removeItem("adminApiKey");
          navigate("/admin");
          return;
        }

        const data = await response.json();
        if (data.success) {
          setWaitingList(data.data);
          setWaitingListPagination(data.pagination);
        }
      } catch {
        setError("Failed to fetch waiting list");
      }
    },
    [apiKey, navigate]
  );

  useEffect(() => {
    if (!apiKey) {
      navigate("/admin");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchEnrollments(), fetchWaitingList()]);
      setLoading(false);
    };

    fetchData();
  }, [apiKey, navigate, fetchEnrollments, fetchWaitingList]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminApiKey");
    navigate("/admin");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1f3d2b] text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-serif font-bold">
            The Mastery House - Admin
          </h1>
          <button
            onClick={handleLogout}
            className="bg-[#b59a5b] px-4 py-2 rounded-lg text-sm hover:bg-[#a08945] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Enrollments
            </h3>
            <p className="text-3xl font-bold text-[#1f3d2b]">
              {enrollmentsPagination?.total || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">
              Waiting List Entries
            </h3>
            <p className="text-3xl font-bold text-[#b59a5b]">
              {waitingListPagination?.total || 0}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("enrollments")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "enrollments"
                    ? "border-[#1f3d2b] text-[#1f3d2b]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Enrollments ({enrollmentsPagination?.total || 0})
              </button>
              <button
                onClick={() => setActiveTab("waiting-list")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "waiting-list"
                    ? "border-[#1f3d2b] text-[#1f3d2b]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Waiting List ({waitingListPagination?.total || 0})
              </button>
            </nav>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {activeTab === "enrollments" ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Child
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age Band
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {enrollment.firstName} {enrollment.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {enrollment.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {enrollment.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {enrollment.childName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Age: {enrollment.childAge}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-[#1f3d2b] text-white rounded-full">
                          {enrollment.ageBand}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(enrollment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedEntry(enrollment)}
                          className="text-[#b59a5b] hover:text-[#8a7444] font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Child
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age Band
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waitingList.map((entry) => (
                    <tr key={entry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {entry.firstName} {entry.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.childName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Age: {entry.childAge}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-[#b59a5b] text-white rounded-full">
                          {entry.ageBand}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {entry.message || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(entry.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {activeTab === "enrollments" && enrollmentsPagination && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Page {enrollmentsPagination.page} of{" "}
                {enrollmentsPagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    fetchEnrollments(enrollmentsPagination.page - 1)
                  }
                  disabled={enrollmentsPagination.page === 1}
                  className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    fetchEnrollments(enrollmentsPagination.page + 1)
                  }
                  disabled={
                    enrollmentsPagination.page ===
                    enrollmentsPagination.totalPages
                  }
                  className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {activeTab === "waiting-list" && waitingListPagination && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Page {waitingListPagination.page} of{" "}
                {waitingListPagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    fetchWaitingList(waitingListPagination.page - 1)
                  }
                  disabled={waitingListPagination.page === 1}
                  className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    fetchWaitingList(waitingListPagination.page + 1)
                  }
                  disabled={
                    waitingListPagination.page ===
                    waitingListPagination.totalPages
                  }
                  className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#1f3d2b]">
                Enrollment Details
              </h2>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(selectedEntry).map(([key, value]) => {
                if (key === "_id") return null;
                return (
                  <div key={key} className="grid grid-cols-3 gap-4">
                    <div className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="col-span-2 text-sm text-gray-900">
                      {Array.isArray(value)
                        ? value.join(", ")
                        : key === "createdAt"
                        ? formatDate(value as string)
                        : String(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
