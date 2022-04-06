"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Create Event with linked user
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.event.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.event.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.event });
  },

  // update user event
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    const event = await strapi.db.query("api::event.event").findOne({
      where: {
        user: { id: ctx.state.user.id },
        id: ctx.params.id,
      },
    });

    if (!event) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.event.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.event.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.event });
  },

  // Delete user event
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [event] = await strapi.services.event.findOne({
      where: {
        user: { id: ctx.state.user.id },
        id: ctx.params.id,
      },
    });

    if (!event) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    entity = await strapi.services.event.delete({ id });

    return sanitizeEntity(entity, { model: strapi.models.event });
  },

  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { message: "No authorization header was found" },
      ]);
    }

    const data = await strapi.db.query("api::event.event").findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    });
    if (!data) {
      return ctx.notFound();
    }

    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },
}));
