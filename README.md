# SRH Ambassador Platform - Strapi Headless CMS

Headless CMS implementation for the SRH Ambassador digital service platform using Strapi and a small Vite frontend.

## What Is Implemented

- Strapi content type schemas for:
  - Ambassadors
  - Programs
  - Countries/Regions
  - Languages
  - Events
  - Clubs
  - Club Polls
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
  - `/clubs`
  - `/events`
  - `/ambassador-dashboard`
  - `/faq`
  - `/contact`
- English/German frontend language toggle for the demo flow
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
- `GET http://localhost:1337/api/clubs?populate=*`
- `GET http://localhost:1337/api/club-polls?populate=*`
- `GET http://localhost:1337/api/faqs?populate=*`
- `POST http://localhost:1337/api/student-inquiries`
- Authenticated ambassadors can create club polls, clubs, and club events.

## Known Limitations

- Ambassador self-editing is documented as a role/policy concept. A production version should add authenticated user-to-ambassador ownership checks.
- The ambassador dashboard uses Strapi authenticated permissions plus a frontend role check. A production version should enforce ambassador ownership and poll conversion rules in Strapi policies.
- The seed script is intentionally simple and may create duplicate sample rows if run repeatedly on a non-empty database.
- The frontend is an MVP demonstration, not a full SRH production design system.
