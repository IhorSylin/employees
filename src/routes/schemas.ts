import { Static, Type } from "@sinclair/typebox";

export const PostBodySchema = Type.Object({
  employee_name: Type.String(),
  title: Type.String(),
  tribe_id: Type.Integer(),
});

export const searchQuerySchema = Type.Object({
  employee_name: Type.Optional(Type.String()),
  title: Type.Optional(Type.String()),
  tribe_name: Type.Optional(Type.String()),
});

export const IdSchema = Type.Object({
  id: Type.Number(),
});

export type IdType = Static<typeof IdSchema>;
export type PostBodyType = Static<typeof PostBodySchema>;
export type searchQueryType = Static<typeof searchQuerySchema>;
