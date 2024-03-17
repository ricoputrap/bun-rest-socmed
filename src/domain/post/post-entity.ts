import { Elysia, t } from "elysia";

export enum EnumPostMood {
  SAD = 1,
  NORMAL = 2,
  HAPPY = 3
}

export enum EnumPostPrivacy {
  PUBLIC = 1,
  PRIVATE = 2,
  SELECTED_FOLLOWERS = 3
}

export type PostData = {
  id: number;
  content: string;
  mood: EnumPostMood;
  privacy: EnumPostPrivacy;
  created_at: number;
  user_id: number;
}

export type PostInput = {
  content: string;
  mood: EnumPostMood;
  privacy: EnumPostPrivacy;
  user_id: number;
}

export const postModel = new Elysia({ name: 'Model.Post' })
  .model({
    'post-create': t.Object({
      content: t.String(),
      mood: t.Nullable(t.Numeric()),
      privacy: t.Nullable(t.Numeric()),
    })
  })