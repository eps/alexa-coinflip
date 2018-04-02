'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = '[APP_ID HERE]';
const SKILL_NAME = 'Coin Flipper';
const HELP_MESSAGE = 'This skill flips a coin for you. Would you like to flip?'
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to Coin Flipper Skill! Try saying toss me.', 'Say toss me!');
    },
    'CoinFlipIntent': function () {
      const result = Math.random();
      let flipResult = ''
      if (result > .5) {
        flipResult = 'heads.';
      } else {
        flipResult = 'tails.';
      }
        let speechOutput = 'the coin landed on ' + flipResult;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, flipResult)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        this.emit(':ask', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
     'AMAZON.YesIntent': function () {
        this.emit('CoinFlipIntent');
    },
     'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
