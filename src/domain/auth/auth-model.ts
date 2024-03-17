import { Elysia, t } from "elysia";

export const basicAuthModel = new Elysia({ name: 'Model.BasicAuth' })
  .model({
    'auth-sign': t.Object({
      username: t.String(),
      password: t.String()
    })
  });

export const newUserModel = new Elysia({ name: 'Model.NewUser' })
  .model({
    'new-user': t.Object({
      name: t.String(),
      username: t.String(),
      email: t.String(),
      password: t.String()
    })
  });