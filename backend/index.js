import  { conectarDB }  from "./db.js"
import express from "express"
import {db} from "./db.js"
import cors from "cors"
import { validarRol, validarLogin, validarPersona, validarConsulta, verificarValidaciones } from "./autorizaciones.js"
import {authConfig} from './token.js'
import bcrypt from "bcrypt";
import { getToken } from "./token.js"

const app = express()
const PORT = 5000

conectarDB();
app.use(express.json())
app.use(cors())

authConfig();


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


app.post('/updateUser',async(req,res)=>{
// modificar contraseña
const {email,pass_nueva} = req.body
pass_nueva= bcrypt.hash(password,8)
const [modif] = await db.execute("update usuarios set contraseña=? where email=?"[pass_nueva,email])
res.status(201).send({usuario})

})

app.post('/register',async(req,res)=>{
  // almacenar la info del formulario
  const {nombre,apellido,dni,fecha_nacimiento,email,password,rol} = req.body
  const pass_cifrada = await bcrypt.hash(password, 8);

  const [resultado] = await db.execute ("insert into usuarios(nombre,apellido,dni,fecha_nacimiento,email,password,rol)values(?,?,?,?,?,?,0)",
      [nombre,apellido,dni,fecha_nacimiento,email,pass_cifrada]
    )
  res.status(201).send({message: 'Registrado correctamente!'})

})

app.post('/viajes',validarRol,async(req,res)=>{
  // verificar que el usuario sea admin
  const id = Number (req.params.id);
  const [usuarioRol] = await db.execute ("select rol from usuarios where id_usuarios =?",[id])
  if(usuarioRol === "admin"){
    res.status(201).send()
  }
})
app.get('/viajes',async(req,res)=>{
  const [viajes] = await db.execute("select * from viajes order by origen DESC")
  console.log(viajes)
  res.send(viajes)
})


//eliminar asiento
/*app.get('/comprar',async(req,res)=>{
  const asiento = req.body
  const [asientoEliminado] = await db.execute("delete asiento from colectivo where asientos =?",[asiento])


})*/

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