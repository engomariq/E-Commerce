# 📁 Project File Structure

## Complete API Integration Files

```
E-Commerce/
│
├── .env.example                      # Environment variables template
├── API_INTEGRATION.md                # Complete usage guide
├── INTEGRATION_SUMMARY.md            # Quick reference
├── FILE_STRUCTURE.md                 # This file
│
├── src/
│   ├── config/
│   │   └── api.js                    # ⚙️ Axios instance with JWT interceptors
│   │
│   ├── services/                     # 🔧 API Services (9 files)
│   │   ├── index.js                  # Central export point
│   │   ├── authService.js            # 🔐 Authentication & user management
│   │   ├── workerService.js          # 👷 Worker profiles & search
│   │   ├── portfolioService.js       # 🖼️ Worker portfolio management
│   │   ├── requestService.js         # 📝 Client requests & status
│   │   ├── reviewService.js          # ⭐ Reviews & ratings
│   │   ├── favoriteService.js        # ❤️ Favorite workers
│   │   ├── professionService.js      # 🏢 Professions with caching
│   │   ├── neighborhoodService.js    # 🗺️ Neighborhoods by area
│   │   └── userService.js            # 👥 User management (admin)
│   │
│   ├── utils/                        # 🛠️ Utility Functions (3 files)
│   │   ├── index.js                  # Central export point
│   │   ├── errorHandler.js           # 🛡️ Error handling (Arabic messages)
│   │   ├── formatters.js             # 🎨 Data formatting utilities
│   │   └── validators.js             # ✅ Form validation functions
│   │
│   └── examples/
│       └── ExampleUsage.jsx          # 📚 6 working React examples
│
└── [Your existing files...]
```

## 📊 File Sizes & Line Counts

### Configuration
- `src/config/api.js` - ~70 lines

### Services (Total: ~1,800 lines)
- `src/services/authService.js` - ~120 lines
- `src/services/workerService.js` - ~200 lines
- `src/services/portfolioService.js` - ~140 lines
- `src/services/requestService.js` - ~250 lines
- `src/services/reviewService.js` - ~220 lines
- `src/services/favoriteService.js` - ~180 lines
- `src/services/professionService.js` - ~180 lines
- `src/services/neighborhoodService.js` - ~200 lines
- `src/services/userService.js` - ~150 lines
- `src/services/index.js` - ~10 lines

### Utilities (Total: ~600 lines)
- `src/utils/errorHandler.js` - ~150 lines
- `src/utils/formatters.js` - ~250 lines
- `src/utils/validators.js` - ~200 lines
- `src/utils/index.js` - ~10 lines

### Examples & Documentation
- `src/examples/ExampleUsage.jsx` - ~450 lines
- `API_INTEGRATION.md` - ~600 lines
- `INTEGRATION_SUMMARY.md` - ~400 lines
- `FILE_STRUCTURE.md` - This file

## 🎯 What Each File Does

### ⚙️ Configuration

**`src/config/api.js`**
- Creates axios instance with base URL
- Adds JWT token to all requests automatically
- Handles 401/403 errors and redirects
- Provides Arabic error messages

### 🔧 Services

**`src/services/authService.js`**
- User registration and login
- JWT token management
- Profile management
- Role checking (client/worker/admin)

**`src/services/workerService.js`**
- Search workers with filters
- Get worker profiles
- Upload profile images
- Filter by profession/neighborhood/area
- Sort by rating/experience/jobs

**`src/services/portfolioService.js`**
- Upload portfolio images (multiple)
- Get worker portfolio
- Manage portfolio items
- Image URL generation

**`src/services/requestService.js`**
- Create client requests
- Accept/reject/complete requests
- Status management
- Real-time polling
- Filter by status

**`src/services/reviewService.js`**
- Create and manage reviews
- Calculate average ratings
- Rating distribution
- Sort and filter reviews
- Statistics

**`src/services/favoriteService.js`**
- Add/remove favorites
- Toggle favorite status
- Check if worker is favorited
- Filter favorites

**`src/services/professionService.js`**
- Get all professions
- Search professions
- Caching (1 hour)
- Admin CRUD operations

**`src/services/neighborhoodService.js`**
- Get neighborhoods by area
- Right side / Left side
- Caching (1 hour)
- Admin CRUD operations

**`src/services/userService.js`**
- User management (admin only)
- Filter by role
- Search users
- Statistics

### 🛠️ Utilities

**`src/utils/errorHandler.js`**
- Extract error messages (Arabic)
- Check error types (auth, validation, network)
- Create error handlers for components
- Format validation errors

**`src/utils/formatters.js`**
- Format dates (Arabic locale)
- Format phone numbers (Iraqi format)
- Format ratings as stars
- Format status/role to Arabic
- Relative time (منذ 5 دقائق)
- File size formatting

**`src/utils/validators.js`**
- Validate Iraqi phone numbers
- Validate emails
- Password strength
- Image file validation
- Form validation (registration, login, etc.)

## 🔍 How to Find What You Need

### Need to authenticate users?
→ `src/services/authService.js`

### Need to search/display workers?
→ `src/services/workerService.js`

### Need to handle requests?
→ `src/services/requestService.js`

### Need to show reviews?
→ `src/services/reviewService.js`

### Need to format data?
→ `src/utils/formatters.js`

### Need to validate forms?
→ `src/utils/validators.js`

### Need to handle errors?
→ `src/utils/errorHandler.js`

### Need examples?
→ `src/examples/ExampleUsage.jsx`

### Need documentation?
→ `API_INTEGRATION.md`

## 📦 Import Patterns

### Import Services
```javascript
// Import all services
import {
  authService,
  workerService,
  requestService,
  reviewService,
  favoriteService,
  professionService,
  neighborhoodService,
  userService
} from './services';

// Or import specific service
import { authService } from './services';
```

### Import Utilities
```javascript
// Import specific functions
import {
  formatDate,
  formatPhoneNumber,
  getErrorMessage,
  isValidPhone
} from './utils';

// Or import all
import { formatters, validators, errorHandler } from './utils';
```

## 🎨 Color Coding

- 🔐 **Authentication** - Blue
- 👷 **Workers** - Orange
- 📝 **Requests** - Green
- ⭐ **Reviews** - Yellow
- ❤️ **Favorites** - Red
- 🏢 **Professions** - Purple
- 🗺️ **Neighborhoods** - Teal
- 👥 **Users** - Gray
- 🛠️ **Utilities** - Brown
- 📚 **Examples** - Pink

## 🚀 Quick Start Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Set `VITE_API_BASE_URL` in `.env`
- [ ] Import services in your components
- [ ] Check examples in `src/examples/ExampleUsage.jsx`
- [ ] Read `API_INTEGRATION.md` for detailed guide
- [ ] Test with Swagger UI at http://localhost:3000/api

## 📝 Notes

- All services return Promises (use async/await)
- All error messages are in Arabic
- All dates are formatted for Arabic locale (Iraq)
- Phone numbers use Iraqi format (07XXXXXXXXX)
- Caching is automatic for professions and neighborhoods
- JWT token is stored in localStorage
- All file uploads include validation

## 🎊 Total Integration

- **13 Files Created**
- **~3,000 Lines of Code**
- **100+ Functions**
- **Complete API Coverage**
- **Production Ready**

---

**Everything is ready to use! Start building your components! 🚀**
