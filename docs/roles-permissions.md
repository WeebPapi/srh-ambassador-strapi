# Roles And Permissions

## Admin

Full Strapi administrator access. Can manage content types, users, content, media, roles, and permissions.

## Coordinator / Staff

Course demo role concept: a Strapi admin role with access to content manager entries for ambassadors, programs, countries, languages, events, inquiries, FAQs, and FAQ categories.

## Ambassador

Intended authenticated role. Ambassadors can view assigned inquiries/events and update their own profile if a custom ownership policy is added.

Production approach:

1. Add a relation from Ambassador to a Users & Permissions user.
2. Add controller policy checks that compare the authenticated user to the ambassador owner.
3. Allow update only for the matched profile.

## Public

Allowed to:

- Read published ambassadors, programs, countries, languages, events, FAQs, and FAQ categories.
- Create student inquiries.

Not allowed to:

- Read all student inquiries.
- Update or delete CMS content.
