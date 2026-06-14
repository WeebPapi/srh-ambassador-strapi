"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async bootstrap({ strapi }) {
        const publicRole = await strapi
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: 'public' } });
        if (!publicRole) {
            return;
        }
        const publicPermissions = {
            'api::ambassador.ambassador': ['find', 'findOne'],
            'api::program.program': ['find', 'findOne'],
            'api::country.country': ['find', 'findOne'],
            'api::language.language': ['find', 'findOne'],
            'api::event.event': ['find', 'findOne'],
            'api::faq.faq': ['find', 'findOne'],
            'api::faq-category.faq-category': ['find', 'findOne'],
            'api::student-inquiry.student-inquiry': ['create'],
        };
        for (const [contentType, actions] of Object.entries(publicPermissions)) {
            for (const action of actions) {
                const permission = await strapi.query('plugin::users-permissions.permission').findOne({
                    where: {
                        role: publicRole.id,
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
    },
};
