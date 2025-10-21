import api from '../config/api';

/**
 * Request Service
 * Handles client requests to workers
 */

const requestService = {
  /**
   * Create a new request (Client only)
   * @param {Object} requestData
   * @param {number} requestData.worker_id - Worker ID (required)
   * @param {string} requestData.problem_description - Problem description (required, Arabic)
   * @returns {Promise<Object>} Created request
   */
  createRequest: async (requestData) => {
    const response = await api.post('/requests', requestData);
    return response.data;
  },

  /**
   * Get all requests (Admin only)
   * @returns {Promise<Array>} All requests
   */
  getAllRequests: async () => {
    const response = await api.get('/requests');
    return response.data;
  },

  /**
   * Get request by ID
   * @param {number} id - Request ID
   * @returns {Promise<Object>} Request details
   */
  getRequestById: async (id) => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  /**
   * Get requests for a client
   * @param {number} clientId - Client user ID
   * @returns {Promise<Array>} Client's requests
   */
  getClientRequests: async (clientId) => {
    const response = await api.get(`/requests/client/${clientId}`);
    return response.data;
  },

  /**
   * Get requests for a worker
   * @param {number} workerId - Worker ID
   * @returns {Promise<Array>} Worker's requests
   */
  getWorkerRequests: async (workerId) => {
    const response = await api.get(`/requests/worker/${workerId}`);
    return response.data;
  },

  /**
   * Update request
   * @param {number} id - Request ID
   * @param {Object} requestData - Updated data
   * @returns {Promise<Object>} Updated request
   */
  updateRequest: async (id, requestData) => {
    const response = await api.patch(`/requests/${id}`, requestData);
    return response.data;
  },

  /**
   * Update request status
   * @param {number} id - Request ID
   * @param {Object} statusData
   * @param {string} statusData.status - New status (pending|accepted|rejected|completed|cancelled)
   * @param {string} statusData.rejected_reason - Rejection reason (required if status is 'rejected')
   * @returns {Promise<Object>} Updated request
   */
  updateRequestStatus: async (id, statusData) => {
    const response = await api.patch(`/requests/${id}/status`, statusData);
    return response.data;
  },

  /**
   * Accept request (Worker)
   * @param {number} id - Request ID
   * @returns {Promise<Object>} Updated request
   */
  acceptRequest: async (id) => {
    return requestService.updateRequestStatus(id, { status: 'accepted' });
  },

  /**
   * Reject request (Worker)
   * @param {number} id - Request ID
   * @param {string} reason - Rejection reason (Arabic)
   * @returns {Promise<Object>} Updated request
   */
  rejectRequest: async (id, reason) => {
    return requestService.updateRequestStatus(id, {
      status: 'rejected',
      rejected_reason: reason,
    });
  },

  /**
   * Complete request (Worker)
   * @param {number} id - Request ID
   * @returns {Promise<Object>} Updated request
   */
  completeRequest: async (id) => {
    return requestService.updateRequestStatus(id, { status: 'completed' });
  },

  /**
   * Cancel request (Client)
   * @param {number} id - Request ID
   * @returns {Promise<Object>} Updated request
   */
  cancelRequest: async (id) => {
    return requestService.updateRequestStatus(id, { status: 'cancelled' });
  },

  /**
   * Delete request
   * @param {number} id - Request ID
   * @returns {Promise<void>}
   */
  deleteRequest: async (id) => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  },

  /**
   * Filter requests by status
   * @param {Array} requests - Array of requests
   * @param {string} status - Status to filter by
   * @returns {Array} Filtered requests
   */
  filterByStatus: (requests, status) => {
    return requests.filter((request) => request.status === status);
  },

  /**
   * Get pending requests
   * @param {Array} requests - Array of requests
   * @returns {Array} Pending requests
   */
  getPendingRequests: (requests) => {
    return requestService.filterByStatus(requests, 'pending');
  },

  /**
   * Get accepted requests
   * @param {Array} requests - Array of requests
   * @returns {Array} Accepted requests
   */
  getAcceptedRequests: (requests) => {
    return requestService.filterByStatus(requests, 'accepted');
  },

  /**
   * Get completed requests
   * @param {Array} requests - Array of requests
   * @returns {Array} Completed requests
   */
  getCompletedRequests: (requests) => {
    return requestService.filterByStatus(requests, 'completed');
  },

  /**
   * Get rejected requests
   * @param {Array} requests - Array of requests
   * @returns {Array} Rejected requests
   */
  getRejectedRequests: (requests) => {
    return requestService.filterByStatus(requests, 'rejected');
  },

  /**
   * Get cancelled requests
   * @param {Array} requests - Array of requests
   * @returns {Array} Cancelled requests
   */
  getCancelledRequests: (requests) => {
    return requestService.filterByStatus(requests, 'cancelled');
  },

  /**
   * Poll for request status updates
   * @param {number} requestId - Request ID
   * @param {Function} callback - Callback function called with updated request
   * @param {number} interval - Polling interval in milliseconds (default: 15000)
   * @returns {number} Interval ID (use clearInterval to stop)
   */
  pollRequestStatus: (requestId, callback, interval = 15000) => {
    return setInterval(async () => {
      try {
        const request = await requestService.getRequestById(requestId);
        callback(request);
      } catch (error) {
        console.error('Error polling request status:', error);
      }
    }, interval);
  },

  /**
   * Stop polling
   * @param {number} intervalId - Interval ID from pollRequestStatus
   */
  stopPolling: (intervalId) => {
    clearInterval(intervalId);
  },
};

export default requestService;
