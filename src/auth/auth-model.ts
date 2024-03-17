import { Elysia, t } from "elysia";

export const basicAuthModel = new Elysia({ name: 'Model.BasicAuth' })
  .model({
    'auth-sign': t.Object({
      username: t.String(),
      password: t.String()
    })
  });