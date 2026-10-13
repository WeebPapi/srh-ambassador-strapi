"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async bootstrap({ strapi }) {
        const publicRole = await strapi
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: 'public' } });
        const authenticatedRole = await strapi
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: 'authenticated' } });
        const roles = [publicRole, authenticatedRole].filter(Boolean);
        if (!roles.length) return;

        const publicPermissions = {
            'api::ambassador.ambassador': ['find', 'findOne'],
            'api::program.program': ['find', 'findOne'],
            'api::country.country': ['find', 'findOne'],
            'api::language.language': ['find', 'findOne'],
            'api::event.event': ['find', 'findOne'],
            'api::club.club': ['find', 'findOne'],
            'api::club-poll.club-poll': ['find', 'findOne'],
            'api::faq.faq': ['find', 'findOne'],
            'api::faq-category.faq-category': ['find', 'findOne'],
            'api::student-inquiry.student-inquiry': ['create'],
        };
        for (const role of roles) {
            for (const [contentType, actions] of Object.entries(publicPermissions)) {
                for (const action of actions) {
                    const permission = await strapi.query('plugin::users-permissions.permission').findOne({
                        where: {
                            role: role.id,
                            action: `${contentType}.${action}`,
                        },
                    });
                    if (permission && !permission.enabled) {
                        await strapi.query('plugin::users-permissions.permission').update({
                            where: { id: permission.id },
                            data: { enabled: true },
                        });
                    }
                }
            }
        }
        const authenticatedWritePermissions = {
            'api::club.club': ['create', 'update'],
            'api::club-poll.club-poll': ['create', 'update'],
            'api::event.event': ['create', 'update'],
        };
        if (authenticatedRole) {
            for (const [contentType, actions] of Object.entries(authenticatedWritePermissions)) {
                for (const action of actions) {
                    const permission = await strapi.query('plugin::users-permissions.permission').findOne({
                        where: {
                            role: authenticatedRole.id,
                            action: `${contentType}.${action}`,
                        },
                    });
                    if (permission && !permission.enabled) {
                        await strapi.query('plugin::users-permissions.permission').update({
                            where: { id: permission.id },
                            data: { enabled: true },
                        });
                    }
                }
            }
        }
    },
};
