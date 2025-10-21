# API Integration Guide - Craft Mosul Frontend

## 📋 Overview

This document provides a quick reference for using the integrated API services in your React components.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 2. Import Services

```javascript
// Import specific services
import { authService, workerService, requestService } from './services';

// Or import utilities
import { formatDate, getErrorMessage, isValidPhone } from './utils';
```

## 🔐 Authentication Examples

### Register User

```javascript
import { authService } from './services';
import { getErrorMessage } from './utils';

const handleRegister = async (formData) => {
  try {
    const result = await authService.register({
      name: 'أحمد علي محمد',
      phone: '07901234567',
      password: 'password123',
      role: 'client',
      neighborhood_id: 1
    });
    
    console.log('Registered:', result.user);
    // Token is automatically stored in localStorage
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Login User

```javascript
const handleLogin = async (phone, password) => {
  try {
    const result = await authService.login({ phone, password });
    console.log('Logged in:', result.user);
    // Redirect to dashboard
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Check Authentication

```javascript
import { authService } from './services';

// In your component
const isLoggedIn = authService.isAuthenticated();
const currentUser = authService.getCurrentUser();
const isClient = authService.hasRole('client');
```

## 👷 Worker Service Examples

### Search Workers

```javascript
import { workerService } from './services';

const searchWorkers = async () => {
  try {
    const result = await workerService.searchWorkers({
      profession_id: 1,
      area: 'الساحل الأيمن',
      is_available: true,
      min_rating: 4.0,
      sort: 'rating',
      order: 'DESC',
      page: 1,
      limit: 10
    });
    
    console.log('Workers:', result.data);
    console.log('Total:', result.meta.total);
    console.log('Has next page:', result.meta.hasNext);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Get Worker Details

```javascript
const getWorkerDetails = async (workerId) => {
  try {
    const worker = await workerService.getWorkerById(workerId);
    console.log('Worker:', worker);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Upload Profile Image

```javascript
const handleImageUpload = async (workerId, file) => {
  try {
    const result = await workerService.uploadProfileImage(workerId, file);
    console.log('Image uploaded:', result.profile_image);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};

// In your component
<input 
  type="file" 
  accept="image/*"
  onChange={(e) => handleImageUpload(workerId, e.target.files[0])}
/>
```

## 📝 Request Service Examples

### Create Request

```javascript
import { requestService } from './services';

const createRequest = async (workerId, description) => {
  try {
    const request = await requestService.createRequest({
      worker_id: workerId,
      problem_description: description
    });
    
    console.log('Request created:', request);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Get Client Requests

```javascript
const getMyRequests = async (clientId) => {
  try {
    const requests = await requestService.getClientRequests(clientId);
    
    // Filter by status
    const pending = requestService.getPendingRequests(requests);
    const accepted = requestService.getAcceptedRequests(requests);
    const completed = requestService.getCompletedRequests(requests);
    
    console.log('Pending:', pending);
    console.log('Accepted:', accepted);
    console.log('Completed:', completed);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Accept/Reject Request (Worker)

```javascript
const handleAcceptRequest = async (requestId) => {
  try {
    await requestService.acceptRequest(requestId);
    console.log('Request accepted');
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};

const handleRejectRequest = async (requestId, reason) => {
  try {
    await requestService.rejectRequest(requestId, reason);
    console.log('Request rejected');
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Poll for Status Updates

```javascript
import { requestService } from './services';
import { useEffect, useState } from 'react';

function RequestStatus({ requestId }) {
  const [request, setRequest] = useState(null);
  
  useEffect(() => {
    // Start polling
    const intervalId = requestService.pollRequestStatus(
      requestId,
      (updatedRequest) => {
        setRequest(updatedRequest);
        
        // Stop polling if status is final
        if (['completed', 'cancelled', 'rejected'].includes(updatedRequest.status)) {
          requestService.stopPolling(intervalId);
        }
      },
      15000 // Poll every 15 seconds
    );
    
    // Cleanup
    return () => requestService.stopPolling(intervalId);
  }, [requestId]);
  
  return <div>Status: {request?.status}</div>;
}
```

## ⭐ Review Service Examples

### Create Review

```javascript
import { reviewService } from './services';

const createReview = async (requestId, rating, comment) => {
  try {
    const review = await reviewService.createReview({
      request_id: requestId,
      rating: rating,
      comment: comment
    });
    
    console.log('Review created:', review);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Get Worker Reviews

```javascript
const getWorkerReviews = async (workerId) => {
  try {
    const reviews = await reviewService.getWorkerReviews(workerId);
    
    // Calculate statistics
    const avgRating = reviewService.calculateAverageRating(reviews);
    const distribution = reviewService.getRatingDistribution(reviews);
    const recent = reviewService.getRecentReviews(reviews, 5);
    
    console.log('Average rating:', avgRating);
    console.log('Distribution:', distribution);
    console.log('Recent reviews:', recent);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

## ❤️ Favorite Service Examples

### Toggle Favorite

```javascript
import { favoriteService } from './services';

const toggleFavorite = async (clientId, workerId) => {
  try {
    const result = await favoriteService.toggleFavorite(clientId, workerId);
    
    if (result.action === 'added') {
      console.log('Added to favorites');
    } else {
      console.log('Removed from favorites');
    }
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Get Client Favorites

```javascript
const getMyFavorites = async (clientId) => {
  try {
    const favorites = await favoriteService.getClientFavorites(clientId);
    
    // Filter available workers only
    const available = favoriteService.getAvailableFavorites(favorites);
    
    console.log('Favorites:', favorites);
    console.log('Available:', available);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

## 🗺️ Professions & Neighborhoods

### Get Professions with Caching

```javascript
import { professionService } from './services';

const getProfessions = async () => {
  try {
    // Uses cache if available (1 hour expiry)
    const professions = await professionService.getProfessionsWithCache();
    console.log('Professions:', professions);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

### Get Neighborhoods by Area

```javascript
import { neighborhoodService } from './services';

const getNeighborhoods = async () => {
  try {
    const rightSide = await neighborhoodService.getRightSideNeighborhoods();
    const leftSide = await neighborhoodService.getLeftSideNeighborhoods();
    
    console.log('Right side:', rightSide);
    console.log('Left side:', leftSide);
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};
```

## 🎨 Using Formatters

```javascript
import { formatDate, formatPhoneNumber, formatRatingStars, formatRequestStatus } from './utils';

// Format date
const formattedDate = formatDate(new Date()); // "٢٠ أكتوبر ٢٠٢٥"

// Format phone
const formattedPhone = formatPhoneNumber('07901234567'); // "0790 123 4567"

// Format rating
const stars = formatRatingStars(4.5, true); // "★★★★⯨ (4.5)"

// Format status
const status = formatRequestStatus('pending'); // "قيد الانتظار"
```

## ✅ Using Validators

```javascript
import { isValidPhone, validateImageFile, validateRegistrationForm } from './utils';

// Validate phone
if (!isValidPhone('07901234567')) {
  console.error('Invalid phone number');
}

// Validate image
const imageValidation = validateImageFile(file, 5); // 5MB max
if (!imageValidation.isValid) {
  console.error(imageValidation.error);
}

// Validate form
const validation = validateRegistrationForm(formData);
if (!validation.isValid) {
  console.error(validation.errors);
}
```

## 🛡️ Error Handling

```javascript
import { getErrorMessage, isAuthError, createErrorHandler } from './utils';

// Basic error handling
try {
  await someApiCall();
} catch (error) {
  const message = getErrorMessage(error);
  console.error(message);
  
  // Check error type
  if (isAuthError(error)) {
    // Redirect to login
  }
}

// With React state
const [error, setError] = useState('');
const handleError = createErrorHandler(setError);

try {
  await someApiCall();
} catch (error) {
  handleError(error);
}
```

## 📱 Complete Component Example

```javascript
import React, { useState, useEffect } from 'react';
import { workerService, favoriteService } from './services';
import { formatRatingStars, getErrorMessage } from './utils';

function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    profession_id: null,
    area: '',
    is_available: true,
    page: 1,
    limit: 10
  });

  useEffect(() => {
    loadWorkers();
  }, [filters]);

  const loadWorkers = async () => {
    try {
      setLoading(true);
      const result = await workerService.searchWorkers(filters);
      setWorkers(result.data);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (workerId) => {
    try {
      const clientId = authService.getCurrentUser()?.id;
      await favoriteService.toggleFavorite(clientId, workerId);
      // Refresh list or update state
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>العمال المتاحون</h2>
      {workers.map(worker => (
        <div key={worker.id}>
          <h3>{worker.user.name}</h3>
          <p>{worker.profession.name}</p>
          <p>{formatRatingStars(worker.average_rating, true)}</p>
          <button onClick={() => handleToggleFavorite(worker.id)}>
            ❤️ إضافة للمفضلة
          </button>
        </div>
      ))}
    </div>
  );
}

export default WorkerList;
```

## 📚 Available Services

- **authService**: Authentication and user management
- **workerService**: Worker profiles and search
- **portfolioService**: Worker portfolio images
- **requestService**: Client requests to workers
- **reviewService**: Reviews and ratings
- **favoriteService**: Favorite workers
- **professionService**: Worker professions
- **neighborhoodService**: Mosul neighborhoods
- **userService**: User management (admin)

## 🔧 Utilities

- **errorHandler**: Error handling utilities
- **formatters**: Data formatting utilities
- **validators**: Form validation utilities

## 📖 Additional Resources

- Full API documentation: `http://localhost:3000/api`
- Backend guide: See the provided Frontend Design Guide document
- Swagger UI for testing: `http://localhost:3000/api`

## 💡 Tips

1. **Always handle errors** using try-catch blocks
2. **Use caching** for static data (professions, neighborhoods)
3. **Implement polling** for real-time updates on requests
4. **Validate forms** before submitting to API
5. **Format data** for display using utility functions
6. **Check authentication** before protected operations
7. **Use Arabic text** for all user-facing content
8. **Implement RTL layout** for proper Arabic display

## 🐛 Common Issues

### 401 Unauthorized
- Token expired or invalid
- User not logged in
- Solution: Call `authService.login()` again

### 403 Forbidden
- User doesn't have permission
- Wrong role for operation
- Solution: Check user role with `authService.hasRole()`

### CORS Errors
- Frontend origin not allowed
- Solution: Add your origin to backend CORS_ORIGIN env variable

### Network Errors
- Backend not running
- Wrong API_BASE_URL
- Solution: Check `.env` file and backend status

---

**Happy Coding! 🚀**
