# Joomla/Fabrik Compared With Strapi

## Setup

Joomla/Fabrik uses a traditional web stack and GUI extension setup. Strapi uses a Node-based backend where schemas can be versioned in Git.

## Data Modeling

Fabrik creates lists/forms inside Joomla. Strapi creates content types with JSON schema files and explicit relations.

## Roles And Permissions

Joomla has mature CMS ACL. Strapi has clean API permissions and admin roles, but custom self-editing needs policies.

## Frontend

Joomla renders frontend pages inside the CMS. Strapi serves content through an API, so a separate frontend is needed.

## Multilingual

Joomla has strong built-in multilingual tools. This Strapi MVP models language as data and can be extended with Strapi internationalization.

## Media

Both systems support media. Joomla uses its media manager/Fabrik upload fields; Strapi uses the upload plugin and media fields.

## API

Strapi is stronger for API-first use cases. Joomla can expose APIs, but API delivery is not the main advantage of a Joomla/Fabrik implementation.

## Recommendation

Strapi is the better long-term fit for the SRH Ambassador platform because future student portals, mobile apps, and public websites can reuse the same CMS API. Joomla/Fabrik is a good traditional CMS prototype because admin screens and public pages live in one system.
