import fs from 'fs' // file system installed
import express from 'express' // web app shop, soc, 
import cors from 'cors'
import mongoose, {Schema} from 'mongoose'
import exp from 'constants'
import multer from 'multer'
import path from 'path'
import session from 'express-session'
import bodyParser from 'body-parser'
import { name } from 'ejs'





let iconSrc = ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static/img/avatars/') // Путь к директории, где будут сохраняться файлы
    },
    filename: function (req, file, cb) {
        iconSrc = 'ava-' + new Date().getMilliseconds() + '.png'
        cb(null, iconSrc) // Создание имени файла
    }
  });

let upload = multer({
  storage: storage
})


let url = 'mongodb+srv://CrazyCat:123321@messager.mzwa64a.mongodb.net/?retryWrites=true&w=majority'
let db = mongoose.connect(url)
let mySchema = new Schema({
    icon: String,
    name: String,
    message: String,
})

let dbMessanger = mongoose.model('messanger', mySchema)

let mySchemaUser = new Schema({
    login: String,
    password: String,
})

let dbUser = mongoose.model('user', mySchemaUser)




// wait



await dbMessanger.deleteMany({})
await dbMessanger.insertMany([{
    icon: '',
    name: '',
    message: '',
}])

let app = express()

// app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'las$%kdjfKJHJK7867$%GHKJH:>jaf345',
    saveUninitialized: false,
    cookie: {secure: false}
}))


app.set('view engine', 'ejs')

app.use(express.static('static'))
app.get('/', async function (req, res) {
    // res.send('ok')
    if (req.session.username) {

        let date = new Date()
        let nowdate = date.getDate()
        let data = await dbMessanger.find({})
        res.render('index.ejs', {data: data, nowdate, name: req.session.username})
    } else {
        res.redirect('/login')
    }
    
})

app.get('/name', async function (req, res) {
    return res.send({username: req.session.username});
})






app.get('/updateMessages/:lastId', async function (req, res) {
    let lastIdUser = req.params.lastId;
    let allMessages = await dbMessanger.find({})
    // let currentMessage = await dbMessanger.find({_id: lastIdUser})
    // [5, 4, 6]

try {



    let lastIdDB = allMessages[allMessages.length-1]._id
    if (lastIdUser != lastIdDB) {
        // console.log('found new message')
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
        // console.log('not found new message')
        return res.send({status: false, data: 'not found new message'})
    }
} catch (e) {}
    res.send('ok')

} )


app.get('/date/:type', async function (req, res) {
    let type = req.params.type;
    let date = new Date()
    if (type == 'month') {
        res.send({status: date.getMonth() })
    }
    if (type == 'day') {
        res.send({status: date.Day() })
    }
    if (type == 'year') {
        res.send({status: date.getFullYear() })
    }
    
    
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


app.post('/img/avatars/', upload.single('myfile') , async function (req, res) {
    // console.log(req.file)
    res.send({image: iconSrc})
    // res.redirect('/') 
})


app.listen(3006)
// http://localhost:3006

app.get('/login', async function (req, res) {
    return res.render('login.ejs')
})

app.post('/login', async function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    let res1 = await dbUser.findOne({
        login,
        password
    })
    if (res1 == null) {
        res.redirect('login')
        // return {result: 'No user found'}
    }
    else {
        req.session.username = login;
        res.redirect('/')
    }
})

app.get('/cabinet', async function (req, res) {
    if (req.session.username) {
        res.send('ok')
    } else {
        res.send('error')
    }
})


app.post('/reg', async function (req, res) {
    try {
    let login = req.body.login;
    let password = req.body.password;
    console.log('login', login)
    console.log('password', password)
    req.session.username = login;
    await dbUser.insertMany([{
        login,
        password,
    }])
    // res.send('success')
    res.redirect('/')
    } catch (e) {
        res.send('error ', e)
    }
})

app.get('/logout', async function (req, res) {
    req.session.destroy((err)=>{
        if (err) {
            console.log('error')
        }
        else {
            
        }
    })
    return res.redirect('/login')
    // return res.send('logouted')
})






