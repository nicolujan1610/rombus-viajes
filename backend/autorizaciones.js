import express from "express";
import { body , param, validationResult} from "express-validator";
import dotenv from 'dotenv';  

dotenv.config(); 
export const validarConsulta = () =>[
  body("nombre").isAlpha().notEmpty().isLength({ max: 50 }),
  body("apellido").isAlpha().notEmpty().isLength({ max: 50 }),
  body("dni").isInt({ max: 9}).notEmpty(),
  body("telefono").isInt({max:12}),
  body("email").isEmail().notEmpty(),
  body("motivo").notEmpty(),
  body("descripcion").isLength({max:240})
]
export const validarPersona = () => [
  body("nombre").isAlpha().notEmpty().isLength({ max: 50 }),
  body("apellido").isAlpha().notEmpty().isLength({ max: 50 }),
  body("dni").isInt({ max: 12}).notEmpty(),
  body("email").isEmail().notEmpty()
];

export const validarLogin = [
  body("email").notEmpty().isEmail(),
  body("password").isStrongPassword({
    minLength: 8, 
    minLowercase: 1, 
    minUppercase: 1, 
    minNumbers: 1,
    minSymbols: 0,
  }),
];


export const validarRol = (rol) => (req, res, next) => {
  if (req.user.rol !== rol) {
    return res
      .status(400)
      .send({ mensaje: "No esta autorizado para realizar esta accion" });
  }
  next();
};

export const verificarValidaciones = (req, res, next) => {
  // Enviar errores de validacion en caso de ocurrir alguno.
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }
  next();
};

export const validarId = param("id").isInt({ min: 1 });