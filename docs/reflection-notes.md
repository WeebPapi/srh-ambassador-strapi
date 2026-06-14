# Reflection Notes

## What Was Easy

- Translating the ER model into Strapi content types.
- Building an API-driven frontend against shared data.
- Documenting public read and inquiry-create permissions.

## What Was Hard

- Exact role behavior for ambassador self-editing needs custom policies.
- Headless CMS work requires both backend and frontend setup.
- Media upload is easy in Strapi admin, but sample repository media should stay lightweight.

## What Broke Or Needed Care

- Public API permissions must be configured before the frontend can read content.
- Relations need `populate=*` or targeted populate parameters in REST API requests.
- Seed scripts should be treated carefully on databases that already contain content.

## What Strapi Is Good At

- API-first content delivery.
- Developer-friendly schemas in Git.
- Flexible frontend implementation.
- Clear content manager for editors.

## What Joomla/Fabrik Is Good At

- Integrated CMS pages, menus, and backend.
- Mature CMS-style ACL.
- Strong multilingual site concepts.

## Better Fit

Strapi fits the SRH Ambassador platform better if SRH wants a modern service platform that can later connect to multiple frontends. Joomla/Fabrik is better if the priority is one integrated CMS installation managed mostly through the browser.
