/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const api = require('./apis/TikTokTrendingService.js')

const BACKGROUND_IMAGE_URL = 'https://wallpaperaccess.com/full/1449449.jpg',
 VIDEO_TITLE = "TikTok Fan",
  TITLE = 'TikTok Fan';

  const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
       return welcomeResponse(handlerInput);
    }
};

/**
 * Intent to show a list of videos with the APL File (apl_video_list.json)
 */
const PlayVideoListIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'PlayVideoListIntent';
  },
  
  //TODO: Use APL Video List file to show multiples videos
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .withSimpleCard(TITLE, "List of Videos")
      .speak("Here is your videos list")
      .withShouldEndSession(false)
      .getResponse()
  }
}

const PlayVideoIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'PlayVideoIntent';
  },
  async handle(handlerInput) {
    return new Promise((resolve, reject) => { 
    if (hasDisplay(handlerInput.requestEnvelope)) {
        try {
            new api.TikTokTrendingService().fetchTrends(function(trends) {
              if (trends !== undefined 
                && trends.length > 0) {

                  const random = Math.floor(Math.random() * trends.length);

                  let trend = trends[random] 
                  let video = trend.video
                var backgroundImage = new Alexa.ImageHelper()
                .withDescription(TITLE)
                .addImageInstance(BACKGROUND_IMAGE_URL)
                .getImage();

                if (video.cover !== undefined) {
               backgroundImage = new Alexa.ImageHelper()
                .withDescription(trend.desc)
                .addImageInstance(video.cover)
                .getImage();
                }

                var primaryText = new Alexa.RichTextContentHelper()
                .withPrimaryText(TITLE)
                .getTextContent();

                var videoDescription = VIDEO_TITLE

                if(trend.desc !== undefined) {
                videoDescription = trend.desc
                primaryText = new Alexa.RichTextContentHelper()
                .withPrimaryText(trend.desc)
                .getTextContent();
                }
        
              let myTemplate = {
                type: 'BodyTemplate1',
                token: 'PlayVideo',
                backButton: 'VISIBLE',
                backgroundImage: backgroundImage,
                title: TITLE,
                textContent: primaryText,
              }
        
              if(video.playAddr !== undefined) {
    
                handlerInput.responseBuilder
                .addVideoAppLaunchDirective(video.playAddr)
                .addRenderTemplateDirective(myTemplate)
                resolve(handlerInput.responseBuilder.speak("Heres your video").getResponse())
              } else {
                 resolve(handlerInput.responseBuilder
                .withSimpleCard(TITLE, "No Trending found")
                .speak("Any videos where found. Please try again")
                .getResponse());
              }
            } else {
               resolve(handlerInput.responseBuilder
          .withSimpleCard(TITLE, "No Trending Videos found")
          .speak("No Trending videos where found. Please try again")
          .withShouldEndSession(false)
          .getResponse());
            }
            })
         }
        catch(error) {
          resolve(handlerInput.responseBuilder
          .withSimpleCard(TITLE, "An Error occured while fetching Trendings on TikTok")
          .speak("Any videos where found. Please try again")
          .withShouldEndSession(false)
          .getResponse());
          }
    } else {
      resolve(handlerInput.responseBuilder
        .withSimpleCard(TITLE, "This skill requires a device with the ability to play videos.")
        .speak("The video cannot be played on your device. To watch this video, try launching this skill from an echo show or echo spot device.")
        .getResponse());
    }
  }).then(response => {
      return response
  }).catch(error => {
      return handlerInput.responseBuilder
      .withSimpleCard(TITLE, "An Error occured while fetching Trendings on TikTok")
      .speak("Any videos where found. Please try again")
      .withShouldEndSession(false)
      .getResponse()
  })
}
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'This skill just plays a random trending video on TikTok. That\'s it';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const AboutIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AboutIntent';
  },
  handle(handlerInput) {
    const speechText = 'This is a TikTok Trending Video Demo!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

function hasDisplay(requestEnvelope) {

  var hasDisplay = requestEnvelope.context &&
      requestEnvelope.context.System &&
      requestEnvelope.context.System.device &&
      requestEnvelope.context.System.device.supportedInterfaces &&
      requestEnvelope.context.System.device.supportedInterfaces.Display;

  return hasDisplay;
}


function supportsAPL(requestEnvelope) {
  const supportedInterfaces = requestEnvelope.context.System.device.supportedInterfaces;
  const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
  return aplInterface !== null && aplInterface !== undefined
}

function isPermissionGranted(handlerInput, permission) {
  const { requestEnvelope: { context: { System: { user } } } } = handlerInput;

  console.log(user.permissions.scopes[permission].status)

  return user.permissions &&
      user.permissions.scopes &&
      user.permissions.scopes[permission] &&
      user.permissions.scopes[permission].status === "GRANTED";
}

function welcomeResponse(handlerInput) {

  let welcomeText = "Welcome to TikTok Fan, you can ask me a to show you a funny video?. Just tell me when !"

  if (hasDisplay(handlerInput.requestEnvelope)) {
      if (supportsAPL(handlerInput.requestEnvelope)) {
          const welcomeapl = require('./apl_welcome.json')
          return handlerInput.responseBuilder
              .speak(welcomeText)
              .withSimpleCard('TikTok Fan', "Welcome")
              .reprompt("What would you like to start with ?")
              .addDirective({
                  type: 'Alexa.Presentation.APL.RenderDocument',
                  document: welcomeapl,
                  datasources: {}
              }).getResponse()
      } else {
        return handlerInput.responseBuilder
        .speak(welcomeText)
        .withSimpleCard('TikTok Fan', "Welcome to TikTok Fan")
       .reprompt("Ask me to show you a video")
       .getResponse()
      
      }
  } else {
    return handlerInput.responseBuilder
    .speak(welcomeText)
   .withSimpleCard('TikTok Fan', "Welcome to TikTok Fan")
   .reprompt("Ask me to show you a video")
   .getResponse()
  
  }
}


/////
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PlayVideoIntentHandler,
    AboutIntentHandler,
    HelpIntentHandler,
    PlayVideoListIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();