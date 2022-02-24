const express = require('express')

const path = require('path')
const app = express()

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'a494eb9998984a8f800efe2ca992db0c',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


let students =[]

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)


    rollbar.log('studentw as added successfully', {author: 'Taylor', type: 'manual', student: name})
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545


app.listen(port, ()=> console.log(`Take us to warp ${port}`))



//update