// const Discord = require("discord.js");
// const client = new Discord.Client();
const unirest = require('unirest');

function randomString() {
    return Math.random().toString(36).substring(7);
}

var config = {
    email: '',
    pass: '',
    guildId: ''
}

let authToken = '';
var applicationData = {};
var botData = {};

//Login
unirest.post('https://discordapp.com/api/v6/auth/login')        
        .headers({
            'Content-Type': 'application/json',
        })
        .send({"email":config.email,"password":config.pass})
        .end(function (response) {
            console.log('login', response.body);
            authToken = response.body.token;

            // Create Application
            unirest.post('https://discordapp.com/api/oauth2/applications')            
                .headers({
                    'Content-Type': 'application/json',
                    'authorization': authToken
                })            
                .send({"name":randomString(),"description":"","icon":""})
                .end(function (response) {
                    console.log('Application Data', response.body);
                    applicationData = response.body;

                    // Create Bot
                    unirest.post(`https://discordapp.com/api/oauth2/applications/${applicationData.id}/bot`)            
                            .headers({
                                'Content-Type': 'application/json',
                                'authorization': authToken
                            })            
                            .send({"name":randomString(),"description":"","icon":""})
                            .end(function (response) {
                                console.log('Bot Data', response.body);
                                botData = response.body;
                                
                                //Add bot to server
                                // unirest.post(`https://discordapp.com/api/v6/oauth2/authorize?client_id=${botData.id}&scope=bot&permissions=0`)            
                                //         .headers({
                                //             'Accept': '*/*', 
                                //             'Content-Type': 'application/json',
                                //             'authorization': authToken
                                //         })            
                                //         .send({
                                //             "captcha_key":"",
                                //             "bot_guild_id":guildId,
                                //             "permissions":0,
                                //             "authorize":true
                                //         })
                                //         .end(function (response) {
                                //             console.log('Adding to server', response.body);                 
                                //         });
                                
                            });
                });

        });

