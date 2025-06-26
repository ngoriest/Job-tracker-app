import axios from 'axios'

const API_URL = '/users'

export default {
  /**
   * Get all users (admin only)
   * @param {string} token - JWT token
   * @returns {Promise} - Array of users
   */
  getAll: (token) => axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  }),

  /**
   * Get user by ID
   * @param {number} userId 
   * @param {string} token - JWT token
   * @returns {Promise} - User object
   */
  getById: (userId, token) => axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),

  /**
   * Update user profile
   * @param {number} userId 
   * @param {object} userData - { username?, email? }
   * @param {string} token - JWT token
   * @returns {Promise} - Updated user
   */
  update: (userId, userData, token) => axios.patch(`${API_URL}/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  }),

  /**
   * Delete user account
   * @param {number} userId 
   * @param {string} token - JWT token
   * @returns {Promise}
   */
  delete: (userId, token) => axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),

  /**
   * Admin update user status
   * @param {number} userId 
   * @param {object} data - { is_blocked?, is_admin? }
   * @param {string} token - JWT token
   * @returns {Promise}
   */
  adminUpdate: (userId, data, token) => axios.put(`${API_URL}/admin/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}