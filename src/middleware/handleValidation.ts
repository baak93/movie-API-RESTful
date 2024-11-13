import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Abaixo está o código igual da aula, mas no router.ts o VScode acusava um erro de tipagem da função validate. Então tipamos a função para que sempre seja retornado um void e removemos a keyword "return" do corpo da função

// export const validate = (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req);

//   if (errors.isEmpty()) {
//     return next();
//   }

//   const extractedErrors: object[] = [];

//   errors.array().map((err) => extractedErrors.push(err.msg));

//   return res.status(422).json({
//     errors: extractedErrors,
//   });
// };

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next(); // Chama o próximo middleware
  }

  const extractedErrors: object[] = [];

  errors.array().forEach((err) => extractedErrors.push(err.msg));

  res.status(422).json({
    errors: extractedErrors,
  });
};
