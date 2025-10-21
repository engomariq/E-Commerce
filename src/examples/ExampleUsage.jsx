/**
 * Example Usage Component
 * Demonstrates how to use the API services in React components
 * This is a reference file - copy patterns from here to your actual components
 */

import React, { useState, useEffect } from 'react';
import {
  authService,
  workerService,
  requestService,
  reviewService,
  favoriteService,
  professionService,
  neighborhoodService,
} from '../services';
import {
  formatDate,
  formatPhoneNumber,
  formatRatingStars,
  formatRequestStatus,
  getErrorMessage,
  isValidPhone,
  validateRegistrationForm,
} from '../utils';

// ============================================
// Example 1: Authentication
// ============================================
function LoginExample() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.login({ phone, password });
      console.log('تم تسجيل الدخول:', result.user);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>تسجيل الدخول</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <input
        type="tel"
        placeholder="رقم الهاتف"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
      </button>
    </form>
  );
}

// ============================================
// Example 2: Worker Search with Filters
// ============================================
function WorkerSearchExample() {
  const [workers, setWorkers] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    profession_id: '',
    neighborhood_id: '',
    area: '',
    is_available: true,
    min_rating: 0,
    search: '',
    sort: 'rating',
    order: 'DESC',
    page: 1,
    limit: 10,
  });
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    searchWorkers();
  }, [filters]);

  const loadInitialData = async () => {
    try {
      const [professionsData, neighborhoodsData] = await Promise.all([
        professionService.getProfessionsWithCache(),
        neighborhoodService.getNeighborhoodsWithCache(),
      ]);
      setProfessions(professionsData);
      setNeighborhoods(neighborhoodsData);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const searchWorkers = async () => {
    try {
      setLoading(true);
      // Remove empty filters
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== null)
      );
      
      const result = await workerService.searchWorkers(cleanFilters);
      setWorkers(result.data);
      setMeta(result.meta);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div>
      <h2>البحث عن العمال</h2>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <select
          value={filters.profession_id}
          onChange={(e) => handleFilterChange('profession_id', e.target.value)}
        >
          <option value="">كل المهن</option>
          {professions.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))}
        </select>

        <select
          value={filters.area}
          onChange={(e) => handleFilterChange('area', e.target.value)}
        >
          <option value="">كل المناطق</option>
          <option value="الساحل الأيمن">الساحل الأيمن</option>
          <option value="الساحل الأيسر">الساحل الأيسر</option>
        </select>

        <input
          type="text"
          placeholder="بحث..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={filters.is_available}
            onChange={(e) => handleFilterChange('is_available', e.target.checked)}
          />
          متاح فقط
        </label>
      </div>

      {/* Results */}
      {loading && <div>جاري التحميل...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        {workers.map((worker) => (
          <div key={worker.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{worker.user.name}</h3>
            <p>{worker.profession.name}</p>
            <p>{formatRatingStars(worker.average_rating, true)}</p>
            <p>عدد الأعمال: {worker.total_jobs}</p>
            <p>الخبرة: {worker.experience_years} سنوات</p>
            <p>{worker.is_available ? '✅ متاح' : '❌ غير متاح'}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {meta && (
        <div>
          <button
            disabled={!meta.hasPrev}
            onClick={() => handlePageChange(meta.page - 1)}
          >
            السابق
          </button>
          <span>
            صفحة {meta.page} من {meta.totalPages}
          </span>
          <button
            disabled={!meta.hasNext}
            onClick={() => handlePageChange(meta.page + 1)}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// Example 3: Create Request
// ============================================
function CreateRequestExample({ workerId }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const request = await requestService.createRequest({
        worker_id: workerId,
        problem_description: description,
      });
      
      console.log('تم إنشاء الطلب:', request);
      setSuccess(true);
      setDescription('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>إنشاء طلب جديد</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>تم إنشاء الطلب بنجاح!</div>}

      <textarea
        placeholder="اشرح المشكلة بالتفصيل..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
      </button>
    </form>
  );
}

// ============================================
// Example 4: My Requests (Client)
// ============================================
function MyRequestsExample() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, accepted, completed

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const user = authService.getCurrentUser();
      const data = await requestService.getClientRequests(user.id);
      setRequests(data);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRequests = () => {
    switch (filter) {
      case 'pending':
        return requestService.getPendingRequests(requests);
      case 'accepted':
        return requestService.getAcceptedRequests(requests);
      case 'completed':
        return requestService.getCompletedRequests(requests);
      default:
        return requests;
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await requestService.cancelRequest(requestId);
      loadRequests(); // Reload
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const filteredRequests = getFilteredRequests();

  return (
    <div>
      <h2>طلباتي</h2>

      {/* Filter tabs */}
      <div>
        <button onClick={() => setFilter('all')}>الكل ({requests.length})</button>
        <button onClick={() => setFilter('pending')}>
          قيد الانتظار ({requestService.getPendingRequests(requests).length})
        </button>
        <button onClick={() => setFilter('accepted')}>
          مقبول ({requestService.getAcceptedRequests(requests).length})
        </button>
        <button onClick={() => setFilter('completed')}>
          مكتمل ({requestService.getCompletedRequests(requests).length})
        </button>
      </div>

      {/* Requests list */}
      <div>
        {filteredRequests.map((request) => (
          <div key={request.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>طلب #{request.id}</h4>
            <p><strong>العامل:</strong> {request.worker.name}</p>
            <p><strong>الحالة:</strong> {formatRequestStatus(request.status)}</p>
            <p><strong>الوصف:</strong> {request.problem_description}</p>
            <p><strong>التاريخ:</strong> {formatDate(request.created_at)}</p>
            
            {request.status === 'pending' && (
              <button onClick={() => handleCancelRequest(request.id)}>
                إلغاء الطلب
              </button>
            )}
            
            {request.status === 'completed' && (
              <button onClick={() => {/* Navigate to review form */}}>
                كتابة تقييم
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Example 5: Worker Profile with Reviews
// ============================================
function WorkerProfileExample({ workerId }) {
  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWorkerData();
  }, [workerId]);

  const loadWorkerData = async () => {
    try {
      setLoading(true);
      const [workerData, reviewsData, portfolioData] = await Promise.all([
        workerService.getWorkerById(workerId),
        reviewService.getWorkerReviews(workerId),
        portfolioService.getWorkerPortfolio(workerId),
      ]);
      
      setWorker(workerData);
      setReviews(reviewsData);
      setPortfolio(portfolioData);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!worker) return <div>العامل غير موجود</div>;

  const avgRating = reviewService.calculateAverageRating(reviews);
  const distribution = reviewService.getRatingDistribution(reviews);

  return (
    <div>
      {/* Worker Info */}
      <div>
        {worker.profile_image && (
          <img
            src={workerService.getProfileImageUrl(worker.profile_image)}
            alt={worker.user.name}
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        )}
        <h2>{worker.user.name}</h2>
        <p>{worker.profession.name}</p>
        <p>{worker.bio}</p>
        <p>الخبرة: {worker.experience_years} سنوات</p>
        <p>عدد الأعمال: {worker.total_jobs}</p>
        <p>{formatRatingStars(worker.average_rating, true)}</p>
        <p>الهاتف: {formatPhoneNumber(worker.contact_phone)}</p>
        {worker.is_available ? '✅ متاح' : '❌ غير متاح'}
      </div>

      {/* Portfolio */}
      <div>
        <h3>معرض الأعمال</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {portfolio.map((item) => (
            <img
              key={item.id}
              src={portfolioService.getPortfolioImageUrl(item.image_url)}
              alt={item.description}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h3>التقييمات ({reviews.length})</h3>
        <p>متوسط التقييم: {avgRating}</p>
        
        {/* Rating distribution */}
        <div>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating}>
              {rating} نجوم: {distribution[rating]}%
            </div>
          ))}
        </div>

        {/* Reviews list */}
        <div>
          {reviews.map((review) => (
            <div key={review.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p>{formatRatingStars(review.rating)}</p>
              <p>{review.comment}</p>
              <p><small>{review.client.name} - {formatDate(review.created_at)}</small></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Example 6: Image Upload
// ============================================
function ImageUploadExample({ workerId }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file, 5);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      const result = await workerService.uploadProfileImage(workerId, file);
      console.log('تم رفع الصورة:', result);
      alert('تم رفع الصورة بنجاح!');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h3>رفع صورة الملف الشخصي</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      
      {uploading && <div>جاري الرفع...</div>}
    </div>
  );
}

// Export all examples
export {
  LoginExample,
  WorkerSearchExample,
  CreateRequestExample,
  MyRequestsExample,
  WorkerProfileExample,
  ImageUploadExample,
};
