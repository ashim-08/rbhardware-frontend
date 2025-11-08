import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Check, X, Star, User, Calendar } from 'lucide-react';
import api from '../utils/api';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const statuses = ['all', 'pending', 'approved', 'rejected'];

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm, statusFilter]);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews/admin');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      alert('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const filterReviews = () => {
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'pending') {
        filtered = filtered.filter(review => !review.isApproved && review.isActive);
      } else if (statusFilter === 'approved') {
        filtered = filtered.filter(review => review.isApproved && review.isActive);
      } else if (statusFilter === 'rejected') {
        filtered = filtered.filter(review => !review.isActive);
      }
    }

    setFilteredReviews(filtered);
  };

  const handleApprove = async (reviewId) => {
    try {
      await api.put(`/reviews/${reviewId}/approve`, { isApproved: true });
      fetchReviews();
      alert('Review approved successfully!');
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Failed to approve review');
    }
  };

  const handleReject = async (reviewId) => {
    if (window.confirm('Are you sure you want to reject this review?')) {
      try {
        await api.put(`/reviews/${reviewId}/approve`, { isApproved: false });
        fetchReviews();
        alert('Review rejected successfully!');
      } catch (error) {
        console.error('Error rejecting review:', error);
        alert('Failed to reject review');
      }
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review permanently?')) {
      try {
        await api.delete(`/reviews/${reviewId}`);
        fetchReviews();
        alert('Review deleted successfully!');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review');
      }
    }
  };

  const getStatusInfo = (review) => {
    if (!review.isActive) {
      return { status: 'Rejected', color: 'bg-red-100 text-red-800' };
    } else if (review.isApproved) {
      return { status: 'Approved', color: 'bg-green-100 text-green-800' };
    } else {
      return { status: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Review Management</h1>
        <p className="text-gray-600">Manage customer reviews and feedback</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800">{reviews.length}</p>
            </div>
            <Star className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {reviews.filter(r => r.isApproved && r.isActive).length}
              </p>
            </div>
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {reviews.filter(r => !r.isApproved && r.isActive).length}
              </p>
            </div>
            <Eye className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-purple-600">
                {reviews.length > 0 
                  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews by customer name, title, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Reviews' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => {
                const statusInfo = getStatusInfo(review);
                return (
                  <tr key={review._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{review.userName}</div>
                          <div className="text-sm text-gray-500">{review.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium line-clamp-1">{review.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">{review.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                        {statusInfo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {!review.isApproved && review.isActive && (
                          <button
                            onClick={() => handleApprove(review._id)}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Approve Review"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        {review.isActive && (
                          <button
                            onClick={() => handleReject(review._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Reject Review"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Details Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Review Details</h2>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-600 hover:text-gray-800 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedReview.userName}</h3>
                    <p className="text-gray-600">{selectedReview.userEmail}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(selectedReview.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Rating</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(selectedReview.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600">
                      {selectedReview.rating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Review Title</h4>
                  <p className="text-gray-700 font-medium">{selectedReview.title}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Review Content</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedReview.content}</p>
                </div>

                {/* Status */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Status</h4>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusInfo(selectedReview).color}`}>
                    {getStatusInfo(selectedReview).status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  {!selectedReview.isApproved && selectedReview.isActive && (
                    <button
                      onClick={() => {
                        handleApprove(selectedReview._id);
                        setSelectedReview(null);
                      }}
                      className="btn-primary inline-flex items-center"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </button>
                  )}
                  {selectedReview.isActive && (
                    <button
                      onClick={() => {
                        handleReject(selectedReview._id);
                        setSelectedReview(null);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;