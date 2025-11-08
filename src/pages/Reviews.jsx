import { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Calendar, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to write a review');
      return;
    }

    setSubmitLoading(true);
    try {
      await api.post('/reviews', formData);
      alert('Review submitted successfully! It will be visible after admin approval.');
      setFormData({ rating: 5, title: '', content: '' });
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Reviews</h1>
          <p className="text-xl text-primary-100">
            See what our customers say about RB Hardware And Sanitary House
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Write Review Button */}
        <div className="text-center mb-8">
          {isAuthenticated ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary inline-flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Write a Review
            </button>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-blue-800 font-medium mb-2">Want to write a review?</p>
              <p className="text-blue-600 mb-4">Please login to share your experience with us</p>
              <a href="/login" className="btn-primary">
                Login to Review
              </a>
            </div>
          )}
        </div>

        {/* Review Form */}
        {showForm && isAuthenticated && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`text-2xl ${
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Summarize your experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us about your experience with RB Hardware..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="btn-primary disabled:opacity-50"
                >
                  {submitLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{review.title}</h3>
                <p className="text-gray-600 leading-relaxed">{review.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your experience with RB Hardware And Sanitary House
              </p>
              {isAuthenticated ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Write First Review
                </button>
              ) : (
                <a href="/login" className="btn-primary">
                  Login to Write Review
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;