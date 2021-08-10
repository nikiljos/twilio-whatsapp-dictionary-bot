require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const express = require('express')
const app = express()
const axios = require('axios')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
    console.log(req.body)
    sendMeaning(req.body)
    res.send("success")


})

async function sendMeaning(data) {
    let result = await fetchMeaning(data.Body)
    if (result) {

        // console.log("result", result)



        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: `*${result.word}*\n\n_Definition:_ ${result.meanings[0].definitions[0].definition}\n\n_Example:_ ${result.meanings[0].definitions[0].example}`,
                to: data.From
            })
            .then(message => console.log(message.sid));

        client.messages
            .create({
                mediaUrl: [`https:${result.phonetics[0].audio}`],

                from: 'whatsapp:+14155238886',
                to: data.From
            })
            .then(message => console.log(message.sid));
    } else {
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: `Some Error occured or the word you entered doesn't match any of our records.... \n\n_Please try again_`,
                to: data.From
            })
            .then(message => console.log(message.sid));
    }




}

async function fetchMeaning(word) {


    let data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
        .then((response) => {
            return response.data[0];

        })
        .catch(e => {
            return false;
        })
    console.log(data)
    return data;






}

app.listen(process.env.PORT||5000, () => console.log("server running"))