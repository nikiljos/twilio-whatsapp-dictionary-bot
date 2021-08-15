# WhatsApp Dictionary Bot

A simple whatsapp bit which uses [Twilio Whatsapp API](https://www.twilio.com/whatsapp) and [Free Dictionary API](https://dictionaryapi.dev/) to send the meaning (as a text message) and pronounciation (as a voice message) of any word that is sent to it...

## How to Set-Up

 - Set up a twilio Account and get your API Keys
 - For trying out you can use the twilio sandbox number after you configure Sandbox
 - Add your Web Server URL as webhook URL for incoming messages in twilio Dashboard
 - Add the following environment variables and you are ready to go

**.env**
```
TWILIO_ACCOUNT_SID

TWILIO_AUTH_TOKEN

FROM_NUMBER
```
