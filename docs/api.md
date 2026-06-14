# API Notes

Strapi exposes REST endpoints under `/api`.

## Public Read Endpoints

- `GET /api/ambassadors?populate=*`
- `GET /api/ambassadors/:documentId?populate=*`
- `GET /api/programs?populate=*`
- `GET /api/countries?populate=*`
- `GET /api/languages?populate=*`
- `GET /api/events?populate=*`
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

## Media Upload

Ambassador photos use Strapi's upload plugin through the `photo` media field. In the MVP seed data, photos are omitted so the repo remains lightweight.

## Permissions

The bootstrap script enables public read access for public content and public create access for student inquiries. Admin and coordinator workflows are handled in the Strapi admin panel.
