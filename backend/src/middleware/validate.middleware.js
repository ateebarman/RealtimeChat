import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    const validData = schema.parse(req.body);
    req.body = validData;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
        errors: errorMessages,
      });
    }
    next(error);
  }
};
