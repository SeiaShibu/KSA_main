// src/pages/Customer/MyComplaints.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Card from "../../components/UI/Card";
import Select from "../../components/UI/Select";
import Badge from "../../components/UI/Badge";
import Button from "../../components/UI/Button";
import { useComplaints } from "../../hooks/useComplaints";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

const priorityOptions = [
  { value: "all", label: "All Priority" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const MyComplaints: React.FC = () => {
  const user = localStorage.getItem("user");
  const customerId = user ? JSON.parse(user).id : undefined;

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const { complaints, loading, loadComplaints, total } = useComplaints({ customerId });

  useEffect(() => {
    loadComplaints({
      status: statusFilter === "all" ? undefined : statusFilter,
      priority: priorityFilter === "all" ? undefined : priorityFilter,
    });
  }, [statusFilter, priorityFilter]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "open": return "warning";
      case "in-progress": return "info";
      case "resolved": return "success";
      case "closed": return "default";
      default: return "default";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "low": return "default";
      case "medium": return "info";
      case "high": return "warning";
      case "urgent": return "danger";
      default: return "default";
    }
  };

  return (
    <DashboardLayout title="My Complaints">
      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 px-4 sm:px-6 lg:px-8">
        <Card>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h3 className="font-semibold text-gray-800">Filters</h3>
            <p className="text-sm text-gray-600">{total} complaints found</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} options={statusOptions} />
            <Select label="Priority" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} options={priorityOptions} />
          </div>
        </Card>
      </motion.div>

      {/* Complaints List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 sm:px-6 lg:px-8">
        <Card>
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading...</p>
          ) : complaints.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No complaints found</p>
          ) : (
            <div className="space-y-4">
              {complaints.map(c => (
                <div key={c.id} className="border rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{c.title}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-3">{c.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant={getStatusBadgeVariant(c.status)}>{c.status}</Badge>
                      <Badge variant={getPriorityBadgeVariant(c.priority)}>{c.priority}</Badge>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:gap-3">
                    <Button variant="secondary" size="sm" onClick={() => window.alert("View Details clicked")}>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default MyComplaints;
