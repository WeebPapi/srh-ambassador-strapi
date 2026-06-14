# SRH Ambassador Platform - Strapi Headless CMS

Headless CMS implementation for the SRH Ambassador digital service platform using Strapi and a small Vite frontend.

## What Is Implemented

- Strapi content type schemas for:
  - Ambassadors
  - Programs
  - Countries/Regions
  - Languages
  - Events
  - Student Inquiries
  - FAQs
  - FAQ Categories
- Relationships matching the shared ER model
- Public API permission bootstrap for readable public content and inquiry creation
- Sample data seed script
- Responsive frontend pages:
  - `/ambassadors`
  - `/ambassadors/:id`
  - `/programs`
  - `/events`
  - `/faq`
  - `/contact`
- Documentation for setup, API, roles, ER model, comparison, and reflection

## Run Locally

Install and run the backend:

```powershell
cd backend
npm install
npm run develop
```

Open the Strapi admin panel at `http://localhost:1337/admin` and create the first administrator account.

Seed sample content after Strapi has created the database:

```powershell
cd backend
npm run seed
```

Run the frontend in another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the frontend at `http://localhost:5173`.

## API Examples

- `GET http://localhost:1337/api/ambassadors?populate=*`
- `GET http://localhost:1337/api/programs?populate=*`
- `GET http://localhost:1337/api/events?populate=*`
- `GET http://localhost:1337/api/faqs?populate=*`
- `POST http://localhost:1337/api/student-inquiries`

## Known Limitations

- Ambassador self-editing is documented as a role/policy concept. A production version should add authenticated user-to-ambassador ownership checks.
- The seed script is intentionally simple and may create duplicate sample rows if run repeatedly on a non-empty database.
- The frontend is an MVP demonstration, not a full SRH production design system.
