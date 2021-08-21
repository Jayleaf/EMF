const { Client, Intents, Message, CommandInteractionOptionResolver } = require("discord.js")
const intents = ["GUILDS", "GUILD_MESSAGES"];
const client = new Client({intents: intents, ws:{intents: intents}});
const { google } = require("googleapis")
const { isFunction } = require("util");
const tesseract = require("node-tesseract-ocr")

client.on("ready", () => {
    console.log("Bot On")
})

client.on("messageCreate", message => {
    if(message.content === "mlf.test")
    message.channel.send({ content: "Bot is not dead!" })
})

  /**
 * Analyze attributes in a block of message
 * @param {string} text - message to analyze
 * @return {json} res - analyzed atttributes
 */


// Some supported attributes
// attributes = ["TOXICITY", "SEVERE_TOXICITY", "IDENTITY_ATTACK", "INSULT",
// "PROFANITY", "THREAT", "SEXUALLY_EXPLICIT", "FLIRTATION", "SPAM",
// "ATTACK_ON_AUTHOR", "ATTACK_ON_COMMENTER", "INCOHERENT",
// "INFLAMMATORY", "OBSCENE", "SPAM", "UNSUBSTANTIAL"];

// Please note the message.channel.send setup is only configured for two. You will have to configure that yourself if you want it to have "and" and such.
// You can also just create a string and append each detected attribute to it and print it with like "DETECTED ATTRIBUTES" or something, but i'm too lazy to do that right now.

  const attributeThresholds = {
    'TOXICITY': 0.85,
    'INSULT': 0.85,
  };

  const HardFilter = [
      'exampleslur',               // whatever you have here would be filtered regardless of score. This is only in place because the API doesn't always pass the threshold for slurs.
      'exampleslur1'               // in this you would have things that would never be good to say regardless, such as slurs. Things you would leave out could be things like
  ]                                // "stupid", "god damn", "idiot", "fckin/fuckin/fucking (if you want that to be said at all"), or anything else mild. If you don't want to use this,
                                   // you can run it in conjunction with your pre-existing filter and just remove words that could be used in a non-toxic or non-insulting manner.
                                   // Ensure anything you put in here is lowercase.


  //
  // Analyze Text Function
  //
   async function analyzeText(text) {
    const analyzer = google.commentanalyzer('v1alpha1');
  
    // This is the format the API expects
    const requestedAttributes = {};
    for (const key in attributeThresholds) {
      requestedAttributes[key] = {};
    }
  
    const req = {
      comment: {text: text},
      languages: ['en'],
      requestedAttributes: requestedAttributes,
    };
  
    const res = await analyzer.comments.analyze({
      key: 'YOURAPIKEYHERE',
      resource: req},
    );
  
    data = {};
  
    for (const key in res['data']['attributeScores']) {
      data[key] =
          res['data']['attributeScores'][key]['summaryScore']['value']
    }
    return data;
  }

  //
  // Message Event
  //

    client.on('messageCreate', async (message) => {
        if (!message.guild || message.author.bot) return;   
        if(!message.content) return;        // make sure it's not a bot and in a guild
        await analyzeText(message.content).then(results => {                    // calls the function
        results = Object.values(results)                                // gets the values of the results object
        console.log(results)
        var scoreArray = [                                                 //
            {name: "Toxicity", value: results[0]},                         // Has the resulting value of the message when ran through the API
            {name: "Insult", value: results[1]},                           //
        ]                                                                  //

      
        var positiveArrays = []                                            // Creates the array which will define what attributes the message went above the threshold for

        var thresholdArray = Object.values(attributeThresholds)            // Gets the values of the attributeThresholds object to test against our results
        for (i=0; i < scoreArray.length; i++) {                            //
            if(scoreArray[i].value > thresholdArray[i]) {                  //  For loop to set the elements of the positiveArrays array
                positiveArrays.push(scoreArray[i])                         //
            }  
        }
        console.log(positiveArrays)

        if(positiveArrays.length >= 1 ) {
            var sendcontent = `Your message was filtered! It was detected with a \`\`${positiveArrays[0].value}%\`\` **${positiveArrays[0].name}**`
                if(positiveArrays.length > 1) {
                    sendcontent = sendcontent + ` rating, and a \`\`${positiveArrays[1].value}%\`\` **${positiveArrays[1].name}** rating.`
                } else {
                    sendcontent = sendcontent + ` rating.`
                }
            message.channel.send(sendcontent)
       } else if(HardFilter.some(w => `${message.content.toLowerCase()}`.includes(`${w}`))) {
           message.channel.send("Your message was filtered! It contained a hard-filtered word.")
       } else {
           console.log("Nothing.")
       }
      
    })
    })


    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    }

    client.on('messageCreate', async message => {
      if(message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
          const ImageLink = attachment.proxyURL;
          tesseract
            .recognize(ImageLink, config).then(async results => {
              var text = results
              await analyzeText(text).then(result => {
                result = Object.values(result)
                var scoreArray = [                                                 
                  {name: "Toxicity", value: result[0]},                        
                  {name: "Insult", value: result[1]},                           
                ]
                var positiveArrays = []                                            
                var thresholdArray = Object.values(attributeThresholds)            
                for (i=0; i < scoreArray.length; i++) {                            
                  if(scoreArray[i].value > thresholdArray[i]) {                  
                  positiveArrays.push(scoreArray[i])                     
               }
              }
              if(positiveArrays.length > 0) {
                message.channel.send("Filtered your image.")
                message.delete()
              }else if(HardFilter.some(w => `${message.content.toLowerCase()}`.includes(`${w}`))) {
                message.channel.send("Your message was filtered! It contained a hard-filtered word.")   
              }
            }).catch(error => {
              console.log(error)
            })
          })
        })
      }
    })
client.login("YOUR TOKEN HERE")