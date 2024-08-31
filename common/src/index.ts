import z from "zod";

export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

//export the type of signInput
export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

//export the type of createBlog
export const createBlog = z.object({
  title: z.string().min(1),
  content: z.string().min(10),
});

export const updateBlog = z.object({
  id: z.string(),

  title: z.string().min(1),
  content: z.string().min(10),
});
export type SigninInput = z.infer<typeof signinInput>;
export type SignupInput = z.infer<typeof signupInput>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;
