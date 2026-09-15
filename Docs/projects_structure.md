# PROJECT STRUCTURE

stitches-admin/
│
├── public/
│
├── src/
│   ├── assets/                 ← admin images/icons
│   │
│   ├── components/             ← reusable admin UI
│   │   ├── Sidebar.jsx
│   │   ├── AdminNavbar.jsx
│   │   └── DataTable.jsx
│   │
│   ├── pages/                  ← admin pages/routes
│   │   ├── Dashboard.jsx
│   │   ├── ManageProducts.jsx
│   │   ├── ManageOrders.jsx
│   │   ├── ManageCustomers.jsx
│   │   └── Settings.jsx
│   │
│   ├── auth/                   ← admin authentication
│   │   └── Login.jsx
│   │
│   ├── context/                ← admin global state
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/                  ← custom React hooks
│   │   └── useAuth.js
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── services/               ← Flask API calls
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   └── customerService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env                        ← Flask API URL
├── index.html
└── package.json