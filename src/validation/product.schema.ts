import * as z from "zod";

const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, { message: "Name is required" }),
  price: z.string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số tiền tối thiểu là 1",
    }),

  detailDesc: z.string().trim().min(1, { message: "Detail description is required" }),
  shortDesc: z.string().trim().min(1, { message: "Short description is required" }),
  quantity: z.string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số lượng tối thiểu là 1",
    }),
  factory: z.string().trim().min(1, { message: "Factory is required" }),
  target: z.string().trim().min(1, { message: "Target is required" }),
});

type TProductSchema = z.infer<typeof ProductSchema>;

export { ProductSchema, TProductSchema };