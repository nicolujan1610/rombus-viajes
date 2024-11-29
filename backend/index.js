import  { conectarDB }  from "./db.js"
import express from "express"
import {db} from "./db.js"
import cors from "cors"
import { validarLogin, validarConsulta, verificarValidaciones } from "./autorizaciones.js"
import {authConfig} from './token.js'
import bcrypt from "bcrypt";
import { getToken } from "./token.js"
import dotenv from 'dotenv';
import jwt, { decode } from 'jsonwebtoken';

dotenv.config(); 

const app = express()
const PORT = 5000

conectarDB();
app.use(express.json())
app.use(cors())

authConfig();


app.post('/usuarioLogeado', async(req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Leer el token de los headers
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [usuario] = await db.execute('SELECT * from usuarios WHERE email=?', [decoded.email])
    res.status(200).send({usuario, ok:true})
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado", ok: false });
  }

})

app.post("/login", validarLogin, verificarValidaciones, async (req, res) => {
  const { email, password } = req.body;

  // Obtener usuario
  const [usuarios] = await db.execute(
    "select * from usuarios where email=?",
    [email]
  );

  if (usuarios.length === 0) {
    return res.status(400).send({ error: "Usuario no encontrado" });
  }

  // Verificar contraseña
  const passwordComparada = await bcrypt.compare(
    password,
    usuarios[0].password
  );

  if (!passwordComparada) {
    return res.status(400).send({ error: "Contraseña incorrecta" });
  }

  const jwt = await getToken(email, usuarios[0].rol)
  res.status(200).send({token: jwt, message: 'Logueado correctamente!'})
});

app.post('/register',async(req,res)=>{
  // almacenar la info del formulario
  const {nombre,apellido,dni,fecha_nacimiento,email,password,rol} = req.body
  const pass_cifrada = await bcrypt.hash(password, 8);

  const [resultado] = await db.execute ("insert into usuarios(nombre,apellido,dni,fecha_nacimiento,email,password,rol)values(?,?,?,?,?,?,0)",
    [nombre,apellido,dni,fecha_nacimiento,email,pass_cifrada]
  )
  
  res.status(201).send({message: 'Registrado correctamente!', response: 'ok'})

})

app.post('/viajes',async(req,res)=>{
  const {origen, destino, fecha}=req.body

  const [viajes] = await db.execute("SELECT * from viajes WHERE fecha=? AND origen=? AND destino=?",[fecha, origen, destino])
  res.send(viajes)
})

app.get('/viajes/:id', async(req, res) => {
  const { id } = req.params;
  const [viajes] = await db.execute("SELECT * from viajes WHERE id_viajes=?", [id])
  res.send(viajes)
})

app.get('/tarifas/:id', async(req,res) => {
  const { id } = req.params;
  const [tarifa] = await db.execute("SELECT costo from tarifa t WHERE t.id_viajes=? ", [id])
  res.send(tarifa)
})

app.post('/asientosNuevos', async(req,res) => {
  const {asientosNuevo, viajeId} = req.body
  const [asientos] = await db.execute("UPDATE `rombus_db`.`viajes` SET `asientos` = ? WHERE (`id_viajes` = ?)", [asientosNuevo, viajeId])
  res.send({ok: true})
})

app.get('/consultas',validarConsulta,async(req,res)=>{
  const {nombre,apellido,dni,telefono,email,motivo,descripcion}=req.body
  const [resultado] = await db.execute("insert into consultas(nombre,apellido,dni,telefono,email,motivo,descripcion)values(?,?,?,?,?,?,?)",
    [nombre,apellido,dni,telefono,email,motivo,descripcion]
  )
  res.status(201).send(resultado)

})

app.listen(PORT, () => {
    console.log(`SERVIDOR ABIERTO EN http://localhost:${PORT}`)
  })