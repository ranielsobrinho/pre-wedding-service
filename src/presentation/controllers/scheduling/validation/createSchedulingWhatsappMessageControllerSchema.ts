import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string({ message: "O campo 'name' é obrigatório" })
    .min(1, { message: "O nome não pode estar vazio" }),

  number: z
    .string({ message: "O campo 'number' é obrigatório" })
    .regex(/^55\d{11}$/, {
      message:
        "O número deve estar no formato internacional do Brasil (ex: 5585984210837)",
    }),
});

const mediaDataSchema = z.object({
  caption: z
    .string({ message: "O campo 'caption' é obrigatório" })
    .min(5, { message: "A legenda deve ter pelo menos 5 caracteres" }),

  url: z.string({ message: "O campo 'url' é obrigatório" }).refine(
    (val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "A URL informada não é válida" },
  ),
});

export const createSchedulingWhatsappMessageSchema = z.object({
  contacts: z
    .array(contactSchema, { message: "A lista de contatos é obrigatória" })
    .nonempty({ message: "É necessário informar pelo menos um contato" }),

  instanceId: z
    .string({ message: "O campo 'instanceId' é obrigatório" })
    .min(5, { message: "O instanceId deve ter pelo menos 5 caracteres" }),

  mediaData: mediaDataSchema,
});
