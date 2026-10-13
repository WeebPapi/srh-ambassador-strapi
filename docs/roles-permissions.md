# Roles And Permissions

## Admin

Full Strapi administrator access. Can manage content types, users, content, media, roles, and permissions.

## Coordinator / Staff

Course demo role concept: a Strapi admin role with access to content manager entries for ambassadors, programs, countries, languages, events, clubs, club polls, inquiries, FAQs, and FAQ categories.

## Ambassador

Intended authenticated role. Ambassadors can use the separate frontend dashboard to create club interest polls, convert popular ideas into clubs, and create club events. They can also view assigned inquiries/events and update their own profile if a custom ownership policy is added.

Production approach:

1. Add a relation from Ambassador to a Users & Permissions user.
2. Add controller policy checks that compare the authenticated user to the ambassador owner.
3. Add ownership policies for club polls, clubs, and club events.
4. Allow update only for matched ambassador-owned records.

## Student

Authenticated users can view the student club directory, club member counts, club events, and interest counts. Production membership should connect the club `members` relation to Users & Permissions users.

## Public

Allowed to:

- Read published ambassadors, programs, countries, languages, events, clubs, club polls, FAQs, and FAQ categories.
- Create student inquiries.

Not allowed to:

- Read all student inquiries.
- Update or delete CMS content.
