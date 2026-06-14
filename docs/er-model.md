# ER Model

```mermaid
erDiagram
  AMBASSADOR }o--o{ PROGRAM : studies_or_represents
  AMBASSADOR }o--o{ COUNTRY_REGION : connected_to
  AMBASSADOR }o--o{ LANGUAGE : speaks
  EVENT }o--o{ AMBASSADOR : assigned
  STUDENT_INQUIRY }o--|| PROGRAM : interested_program
  STUDENT_INQUIRY }o--o| AMBASSADOR : assigned_ambassador
  STUDENT_INQUIRY }o--o| LANGUAGE : preferred_language
  FAQ }o--|| FAQ_CATEGORY : category
  FAQ }o--|| LANGUAGE : language
```

## Entity Fields

- Ambassador: name, photo, degree program, countries/regions, languages, bio, contact preference, availability, status.
- Program: program name, degree level, department, description, related ambassadors.
- Country/Region: name, related languages, related ambassadors.
- Language: name, ISO code, related ambassadors.
- Event: title, date/time, location or online link, description, assigned ambassadors, event type.
- Student Inquiry: student name, email, country, interested program, question/message, preferred language, assigned ambassador, status.
- FAQ: title, category, body/content, language, published status.
- FAQ Category: name, description, related FAQs.
