import fs from 'fs' // file system installed
import express from 'express' // web app shop, soc, 
import cors from 'cors'
import mongoose, {Schema} from 'mongoose'
import exp from 'constants'



let url = 'mongodb+srv://CrazyCat:123321@messager.mzwa64a.mongodb.net/?retryWrites=true&w=majority'
let db = mongoose.connect(url)
let mySchema = new Schema({
    icon: String,
    name: String,
    message: String,
})

let dbMessanger = mongoose.model('messanger', mySchema)
// wait






let app = express()
app.set('view engine', 'ejs')

app.use(express.static('static'))
app.get('/', async function (req, res) {
    // res.send('ok')
    let data = await dbMessanger.find({})
    res.render('index.ejs', {data: data})
})




app.get('/save/:icon/:name/:text', async function (req, res) {
    let icon = req.params.icon;
    let name = req.params.name;
    let text = req.params.text;
    await dbMessanger.insertMany([{
        icon: icon,
        name: name,
        message: text,
    }])
    
    res.send({status: 'ok'})
})




app.listen(3005)
// http://localhost:3005






