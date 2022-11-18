const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://BIL_LIE:379@cluster0.lge9hde.mongodb.net/?retryWrites=true&w=majority');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const schemat = new mongoose.Schema({
    nick: String,
    text: String
})
const wiadomoscSche = mongoose.model('WiadomoscSche', schemat);


app.get('/', (req, res) => {
    res.send('home');
});



app.get('/getMes', (req, res) => {
    wiadomoscSche.find({}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    });
});



app.post('/posts', (req, res) => {
    
    const nick1 = req.body.nick;
    const text1 = req.body.text;
    
    let wiadomosc = new wiadomoscSche({ nick: nick1, text: text1});
    wiadomosc.save();

    console.log(req.body.nick + req.body.text);
    res.send("posts");
});

app.listen(3001, () => console.log('server dziala na 3001'));