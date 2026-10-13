# ER Model

```mermaid
erDiagram
  AMBASSADOR }o--o{ PROGRAM : studies_or_represents
  AMBASSADOR }o--o{ COUNTRY_REGION : connected_to
  AMBASSADOR }o--o{ LANGUAGE : speaks
  EVENT }o--o{ AMBASSADOR : assigned
  CLUB ||--o{ EVENT : hosts
  AMBASSADOR ||--o{ CLUB : creates
  AMBASSADOR ||--o{ CLUB_POLL : creates
  CLUB_POLL }o--o| CLUB : converted_to
  USER }o--o{ CLUB : joins
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
- Event: title, date/time, location or online link, description, assigned ambassadors, optional club, event type, interested count.
- Club Poll: title, club idea, description, interest count, popularity threshold, status, creating ambassador.
- Club: name, description, category, status, member count, source poll, creating ambassador, members, events.
- Student Inquiry: student name, email, country, interested program, question/message, preferred language, assigned ambassador, status.
- FAQ: title, category, body/content, language, published status.
- FAQ Category: name, description, related FAQs.
