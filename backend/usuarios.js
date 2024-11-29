import { db } from "./db.js";
import bcrypt from "bcrypt";
import { validarJwt, validarRol, verificarValidaciones} from "./autorizaciones.js";
import { body } from "express-validator";


// Consultar por todos los usuarios
app.get("/usuarios", validarJwt, validarRol("admin"), async (req, res) => {
  const [usuarios] = await db.execute("select id, username, rol from usuarios");
  res.send({ usuarios });
});

const validarUsuario = [
  body("username").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("password").isStrongPassword({
    minLength: 8, 
    minLowercase: 1, 
    minUppercase: 1, 
    minNumbers: 1, 
    minSymbols: 0, 
  }),
  body("rol").isAlpha().notEmpty().isLength({ max: 45 }),
];

// Crear nuevo usuario
app.post(
  "/",
  validarJwt,
  validarRol("admin"),
  validarUsuario,
  verificarValidaciones,
  async (req, res) => {
    const { email, password, rol } = req.body;

    // Crear hash de la contraseña
    const passwordHashed = await bcrypt.hash(password, 10);

    // Inserta en DB
    const [result] = await db.execute(
      "insert into usuarios (email, password, rol) values (?,?,?)",
      [email, passwordHashed, rol]
    );
    res.status(201).send({ usuario: { id: result.insertId, email, rol } });
  }
);
