import Joi from "joi";

export const athleteSchema = Joi.object({
  first_name: Joi.string().trim().min(1).max(100).required(),
  last_name: Joi.string().trim().min(1).max(100).required(),
  nickname: Joi.string().allow("").trim().max(100).default(""),
  birthdate: Joi.date().required(),
  weight: Joi.number().positive().precision(2).required(),
  image_url: Joi.string().uri().allow("").default(""),
  sport: Joi.string().trim().min(1).max(100).required(),
  achievements: Joi.string().allow("").max(2000).default(""),
});

export function validateAthlete(input) {
  const { value, error } = athleteSchema.validate(input, { abortEarly: false });
  if (error) {
    const details = error.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
    const e = new Error("Validation error");
    e.status = 400;
    e.details = details;
    throw e;
  }
  return value;
}
