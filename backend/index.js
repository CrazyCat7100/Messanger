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






app.get('/updateMessages/:lastId', async function (req, res) {
    let lastIdUser = req.params.lastId;
    let allMessages = await dbMessanger.find({})
    // let currentMessage = await dbMessanger.find({_id: lastIdUser})
    // [5, 4, 6]



    let lastIdDB = allMessages[allMessages.length-1]._id
    if (lastIdUser != lastIdDB) {
        console.log('found new message')
        let currentId = lastIdDB
        // last: 4    new: 10
        // delat poka 10 9 8 7 6 5 4 poka id ne sovpadut
        let index = 1;
        let listMsg = []
        try {
        while (currentId != lastIdUser) {
            currentId = allMessages[allMessages.length-index]._id
            listMsg.push(allMessages[allMessages.length-index])
            index++
        }
        listMsg = listMsg.slice(0, listMsg.length-1)
        return res.send({status: true, data: listMsg})
    } catch (e) {
        return res.send({status: false, data: 'error'})

    }
    } else {
        console.log('not found new message')
        return res.send({status: false, data: 'not found new message'})
    }
    res.send('ok')

} )


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






