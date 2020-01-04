const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const file = './tiny.xml'

app.use(cors())

app.get('/', (req, res) => {
  fs.readFile(file, (err, data) => {
    if(!err){
      res.set('Content-Type', 'text/xml');
      res.send(data)
    }
  })
})

app.listen(3030)