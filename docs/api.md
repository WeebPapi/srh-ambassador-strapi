# API Notes

Strapi exposes REST endpoints under `/api`.

## Public Read Endpoints

- `GET /api/ambassadors?populate=*`
- `GET /api/ambassadors/:documentId?populate=*`
- `GET /api/programs?populate=*`
- `GET /api/countries?populate=*`
- `GET /api/languages?populate=*`
- `GET /api/events?populate=*`
- `GET /api/clubs?populate=*`
- `GET /api/club-polls?populate=*`
- `GET /api/faqs?populate=*`
- `GET /api/faq-categories?populate=*`

## Inquiry Submission

Use `POST /api/student-inquiries`.

Example body:

```json
{
  "data": {
    "studentName": "Elena Rossi",
    "email": "elena@example.com",
    "country": "Italy",
    "questionMessage": "How international is the business program?",
    "status": "new"
  }
}
```

## Ambassador Club Workflows

Authenticated ambassador accounts can use:

- `POST /api/club-polls` to create a poll for a proposed club.
- `POST /api/clubs` to create an active club after a poll is popular.
- `POST /api/events` with `eventType: "club_meetup"` and optional `club` relation to create club events.

Events expose `interestedCount`; clubs expose `memberCount`; club polls expose `interestCount` and `popularityThreshold`.

## Media Upload

Ambassador photos use Strapi's upload plugin through the `photo` media field. In the MVP seed data, photos are omitted so the repo remains lightweight.

## Permissions

The bootstrap script enables public read access for public content, public create access for student inquiries, and authenticated create/update access for club polls, clubs, and events. A production build should add Strapi policies so only ambassador-owned records can be changed.
