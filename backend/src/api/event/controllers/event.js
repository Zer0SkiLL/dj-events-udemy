"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Create Event with linked user
  async create(ctx) {
    let entity;

    ctx.request.body.data.user = ctx.state.user;
    entity = await strapi.service("api::event.event").create(ctx.request.body);

    // return entity;
    const res = await this.sanitizeOutput(entity, ctx);
    return res;
  },

  // update user event
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const event = await strapi.db.query("api::event.event").findOne({
      // uid syntax: 'api::api-name.content-type-name'
      where: {
        id: ctx.params.id,
        user: { id: ctx.state.user.id },
      },
      populate: { user: true },
    });

    if (!event) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    entity = await super.update(ctx);

    // return entity;
    const res = await this.sanitizeOutput(entity, ctx);
    return res;
  },

  // Delete user event
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const event = await strapi.db.query("api::event.event").findOne({
      // uid syntax: 'api::api-name.content-type-name'
      where: {
        id: ctx.params.id,
        user: { id: ctx.state.user.id },
      },
      populate: { user: true },
    });

    console.log(event);

    if (!event) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    entity = await super.delete(ctx);

    const res = await this.sanitizeOutput(entity, ctx);
    return res;
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
