# ClientFlow

A modern client-management dashboard built with React, Vite, Tailwind CSS, React Router, Recharts, and Lucide icons.

## Current features

- Professional teal/emerald visual system (no indigo/violet UI)
- Modern ClientFlow logo and favicon
- Responsive desktop/mobile sidebar and header
- Mock authentication with protected routes
- Persistent login state using localStorage
- Customer search and status filtering
- Add, view, edit, and delete customers
- Customer pagination
- Dashboard statistics and charts
- Analytics page with acquisition and revenue charts
- Settings page with notification preferences and demo-data reset
- Local customer persistence for development

## Demo login

Email: `alex@example.com`

Password: `admin123`

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run lint
npm run build
npm run preview
```

## Future backend integration

The frontend is structured so the local `CustomerContext` and `AuthContext` can later be connected to a Flask API and JWT authentication without changing the main layout or route structure.

Suggested future API areas:

- `POST /api/auth/login`
- `GET /api/customers`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`
- `GET /api/analytics`
