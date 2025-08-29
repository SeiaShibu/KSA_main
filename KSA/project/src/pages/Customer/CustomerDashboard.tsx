// src/pages/Customer/CustomerDashboard.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useComplaints } from '../../hooks/useComplaints';
import Select from '../../components/UI/Select';
import Badge from '../../components/UI/Badge';
import { FileText, Calendar, Eye, Filter } from 'lucide-react';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' }
];

const priorityOptions = [
  { value: 'all', label: 'All Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

const CustomerDashboard: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const { complaints, loading, loadComplaints, total } = useComplaints({ autoLoad: false, pageSize: 5 });

  useEffect(() => {
    loadComplaints({
      status: statusFilter === 'all' ? undefined : statusFilter,
      priority: priorityFilter === 'all' ? undefined : priorityFilter,
      page: 1
    });
  }, [statusFilter, priorityFilter]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'open': return 'warning';
      case 'in-progress': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'low': return 'default';
      case 'medium': return 'info';
      case 'high': return 'warning';
      case 'urgent': return 'danger';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout title="My Complaints">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2 sm:gap-0">
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Filters</h3>
              </div>
              <p className="text-sm text-gray-600">{total} complaints found</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={statusOptions}
              />
              <Select
                label="Priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                options={priorityOptions}
              />
            </div>
          </Card>
        </motion.div>

        {/* Complaints List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-400 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading complaints...</p>
              </div>
            ) : complaints.length > 0 ? (
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{complaint.title}</h3>
                      <p className="text-gray-600 mb-3">
                        {complaint.description.length > 100
                          ? `${complaint.description.substring(0, 100)}...`
                          : complaint.description
                        }
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </div>
                        <span>Category: {complaint.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end justify-between space-y-2 sm:space-y-0 sm:space-x-0">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={getStatusBadgeVariant(complaint.status)}>
                          {complaint.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant={getPriorityBadgeVariant(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </div>
                      <Button variant="secondary" className="text-sm mt-2 sm:mt-0 w-full sm:w-auto">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No complaints found</h3>
                <p className="text-gray-500 mb-6">
                  {statusFilter !== 'all' || priorityFilter !== 'all'
                    ? 'Try adjusting your filters to see more results'
                    : 'You haven’t submitted any complaints yet'}
                </p>
                <Button onClick={() => window.location.href = '/customer/new-complaint'} className="w-full sm:w-auto">
                  Submit New Complaint
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
