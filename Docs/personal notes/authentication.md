 # UNDERSTANDING AUTHENTICATION

---


 ## CHECK SESSION
 
 
                    LOGIN
                      │
                      ▼
              Flask creates JWT
                      │
                      ▼
               React stores JWT
                      │
                      ▼
              ProtectedRoute
                      │
                      ▼
          GET /auth/admin/check-session
                      │
                      ▼
              Flask @jwt_required()
                      │
              ┌───────┴───────┐
              │               │
            VALID           INVALID
              │               │
              ▼               ▼
          Dashboard       Remove JWT
                              │
                              ▼
                           Login


### INSIDE API

React
  │
  │ JWT
  ▼
Flask API
  │
  ▼
@jwt_required()
  │
  ├── Valid → continue
  │
  └── Invalid/expired → 401