const express = require('express')

const app = express()


app.get('/', (req, res) =>{
  res.send('BIENVENIDOS AL SERVIDOR')
})

app.get('/boca', (req, res) => {
  res.send('BOCAAAAA')
})


const PORT = 7777
app.listen(PORT, () => {
  console.log('SERVIDOR ABIERTO')
})