import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

export const jwtAccessSetup = new Elysia({
  name: "jwt",
}).use(
  jwt({
    name: "jwt",
    schema: t.Object({
      id: t.Numeric(),
      name: t.String(),
      username: t.String(),
      email: t.String(),
      profile_picture: t.String()
    }),
    secret: "JWT_ACCESS_SECRET",
    exp: "5m",
  })
);

export const jwtRefreshSetup = new Elysia({
  name: "jwtRefresh",
}).use(
  jwt({
    name: "jwtRefresh",
    schema: t.Object({
      id: t.Numeric(),
      name: t.String(),
      username: t.String(),
      email: t.String(),
      profile_picture: t.String()
    }),
    secret: "JWT_REFRESH_SECRET",
    exp: "7d",
  })
);