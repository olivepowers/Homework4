const express = require('express')
const app = express()
const port = 3000
const uid = require('uid')
let objects = {}

// express configuration
app.use(express.json({type: '*/*'}));

// Set your routes
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', function (req, res) {
    
    res.send(`Received object. ${JSON.stringify(req.body)}`);

});
app.post('/share', (req, res) => {
    let id = uid(4)
    objects[id] = req.body
    res.send({success: true, link: "http://localhost:3000/"+id});

})
app.get('/:id', (req, res) => {
    if(objects[req.params.id] != null){
        res.send(objects[req.params.id])
        delete objects[req.params.id]
    }
    else{
        res.send({success: false, error: 404, message: "Not Found"})
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))