import { body } from "express-validator";

export const movieCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 5 })
      .withMessage("O título precisa ter no mínimo 5 caracteres"),
    body("rating")
      .isNumeric()
      .withMessage("A nota precisa ser um número")
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error("A nota precisa ser entre 0 e 10");
        }
        return true;
      }),
    body("description").isString().withMessage("A descrição é obrigatória."),
    body("director").isString().withMessage("O nome do diretor é obrigatório."),
    body("poster").isURL().withMessage("A imagem precisa ser uma URL."),
    body("stars")
      .isArray()
      .withMessage("O elenco precisa ser um array")
      .notEmpty()
      .withMessage("O elenco não pode estar vazio."),
  ];
};

export const movieUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 5 })
      .withMessage("O título precisa ter no mínimo 5 caracteres"),
    body("rating")
      .optional()
      .isNumeric()
      .withMessage("A nota precisa ser um número")
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error("A nota precisa ser entre 0 e 10");
        }
        return true;
      }),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição é obrigatória."),
    body("director")
      .optional()
      .isString()
      .withMessage("O nome do diretor é obrigatório."),
    body("poster")
      .optional()
      .isURL()
      .withMessage("A imagem precisa ser uma URL."),
    body("stars")
      .optional()
      .isArray()
      .withMessage("O elenco precisa ser um array")
      .notEmpty()
      .withMessage("O elenco não pode estar vazio."),
  ];
};
