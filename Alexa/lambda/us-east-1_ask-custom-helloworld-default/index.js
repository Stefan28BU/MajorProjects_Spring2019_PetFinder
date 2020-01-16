/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const axios = require('axios');

function authenticate(username, password) {
	return axios(
		{
			method: 'post',
            url: 'https://csi3372-gitrekt.herokuapp.com/oauth/token',
            //url: 'http://localhost:8080/oauth/token',

			params: {
				'grant_type': 'password',
				username,
				password
			},
			auth: {
				username: 'petfinder-app',
				password: 'petfinder-app-secret'
			}
		}
	).then(response => {
		//console.log('here??');
		//console.log(response);
		return response;
	}).catch((error) => {
		//console.log('problem signing in');
		//console.log(error);
	});
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    let speechText = "Welcome to pet finder, say login or default account to login to a default account";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')
      .getResponse();
  },
};

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyX2lkIl0sInVzZXJfbmFtZSI6IjFAdGVzdC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTU2ODA4NjQ0LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMjczNWJiOTMtOGI5NC00MTQyLTliOGQtZjIwNDRjYWQ2OGMyIiwiY2xpZW50X2lkIjoicGV0ZmluZGVyLWFwcCJ9.z3biZjl_rPTQz3CHL7TRALmjMxqhctXr1PvvzlzzbYs";
//let token = "none";
let principal = "111@111.com"
const DefaultLoginIntenthandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DefaultLoginIntent';
  },
  async handle(handlerInput) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    let speechText = 'Welcome to the Liu Skills Kit, you can say hello!';
    await authenticate('111@111.com', '123456')
    .then((response) => {
        token = response.data.access_token;
        speechText = token;
    })
    .catch((err) => {
        //set an optional error message here
        speechText = err.message;
    });
    
    await axios.get(
        'https://csi3372-gitrekt.herokuapp.com/api/user',
        {
            headers: {
                'Authorization': 'Bearer '+ token
            }
        }
    ).then(response => {
      var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

		speechText = 'Welcome  ';
          speechText = speechText + ' ' + response.data.firstName + ' ' + response.data.lastName;
          console.log(speechText);
	  })
	  .catch((err) => {
        speechText = err.message;
    });
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')
      .getResponse();
  },
};

let pet = {
      name: "default",
       type: "default",
       preference: "default"
    };

const addPetIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'addPetIntent';
  },
  async handle(handlerInput) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    if (token === "none") {
      return handlerInput.responseBuilder
      .speak("login first")
      .reprompt('this is a reprompt')
      .withSimpleCard("", "")
      .getResponse();
    }
    
    let status = "starting";
    if (handlerInput.requestEnvelope.request.intent.slots.name.hasOwnProperty('value')) {
      status = "adding name";
    }
    if (handlerInput.requestEnvelope.request.intent.slots.petKind.hasOwnProperty('value')) {
      status = "adding kind";
    }
    if (handlerInput.requestEnvelope.request.intent.slots.preference.hasOwnProperty('value')) {
      status = "adding preference";
    }
    if (handlerInput.requestEnvelope.request.intent.slots.ok.hasOwnProperty('value')) {
      status = "ok";
    }
    if (status === "starting") {
      return handlerInput.responseBuilder
      .speak("What kind of pet do you want to add?")
      .reprompt('this is a reprompt')
      .withSimpleCard("", "")
      .getResponse();
    }
    if (status === "adding kind") {
      pet.type = handlerInput.requestEnvelope.request.intent.slots.petKind.value;
      return handlerInput.responseBuilder
      .speak("What is its name?")
      .reprompt('this is a reprompt')
      .withSimpleCard("", "")
      .getResponse();
    }
    
    if (status === "adding name") {
      pet.name = handlerInput.requestEnvelope.request.intent.slots.name.value;
      return handlerInput.responseBuilder
      .speak("What other detail is about it?")
      .reprompt('this is a reprompt')
      .withSimpleCard("", "")
      .getResponse();
    }
    
    if (status === "adding preference") {
      pet.preference = handlerInput.requestEnvelope.request.intent.slots.preference.value;
      return handlerInput.responseBuilder
      .speak("Your pet: " + pet.name +" " + " which is a: " + pet.type + " with preference: " + pet.preference)
      .reprompt('this is a reprompt')
      .withSimpleCard("", "")
      .getResponse();
    }
    
    if (status === "ok") {
      let speechText = "making new pets";
      let petid = "none";
      await axios.post(
        'https://csi3372-gitrekt.herokuapp.com/api/pets', 
        pet, 
        {
          headers: {
                'Authorization': 'Bearer '+ token
            }
        }
        
        ).then(response =>{
            console.log(response.data.id);
            petid = response.data.id
          }).catch((err) => {
        speechText = speechText+err.message;
        });
        let userPetDto = {
            petId: petid,
            userPrincipal: principal
        }
        await axios.post(
        'https://csi3372-gitrekt.herokuapp.com/api/user/pet',
        userPetDto,
        {
            headers: {
                'Authorization': 'Bearer '+ token
            }
        }
       ).then(response =>{
         console.log(response);
       }).catch((err) => {
        speechText = speechText+err.message;
        });
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("", "")
      .getResponse();
    }
    
    sta = "waiting for username";
    return handlerInput.responseBuilder
      .speak("not any thing")
      .reprompt('this is a reprompt')

      .withSimpleCard("", "")
      .getResponse();
  },
};

const myPetIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'myPetIntent';
  },
  async handle(handlerInput) {
    if (token === "none") {
      return handlerInput.responseBuilder
      .speak("login first")
      .reprompt('this is a reprompt')
      .withSimpleCard("", "")
      .getResponse();
    }
    let speechText = 'Welcome to pet finder, a platform to connect loving pet owners with trusted pet sitters.!';
    await axios.get(
        'https://csi3372-gitrekt.herokuapp.com/api/user/pet',
        {
            headers: {
                'Authorization': 'Bearer '+ token
            }
        }
    ).then(response => {
		      speechText = 'Your pets are: ';
		      
          let petList = response.data;
          for (var i = 0; i < petList.length; i++) {
            var obj = petList[i];
            speechText = speechText +'pet name is: ' + obj.name + ' the type:  ' +  obj.type + ' ';
          }
          console.log(speechText);
	  })
	  .catch((err) => {
        speechText = err.message;
    });
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')
      .withSimpleCard("", speechText)
      .getResponse();
  },
};

const notificationIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'notificationIntent';
  },
  async handle(handlerInput) {
    if (token === "none") {
      return handlerInput.responseBuilder
      .speak("login first")
      .withSimpleCard("", "")
      .getResponse();
    }
    let speechText = " default";
    let res = encodeURI('https://csi3372-gitrekt.herokuapp.com/api/user/userNotifications'+principal);
    await axios.get(
        res,
        {
            headers: {
                'Authorization': 'Bearer '+ token
            }
        }
    ).then(response => {
      
		      speechText = 'Your notifications are: ';
		      
          let notilist = response.data;
          if (handlerInput.requestEnvelope.request.intent.slots.number.hasOwnProperty('value')) {
            let num = handlerInput.requestEnvelope.request.intent.slots.number.value;
            if (num > notilist.length) {
              num = notilist.length;
            }
            for (var i = 0; i < num; i++) {
              var obj = notilist[i];
              speechText = speechText + obj.info + '  ';
            }
          }
          else{
            for (var i = 0; i < notilist.length; i++) {
              var obj = notilist[i];
              speechText = speechText + obj.info  + '  ';;
            }
            console.log(speechText);
          }
	  })
	  .catch((err) => {
        speechText = err.message;
    });
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')
      .withSimpleCard("", speechText)
      .getResponse();
  },
};


const MyBookingIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MyBookingIntent';
  },
  async handle(handlerInput) {
    if (token === "none") {
      return handlerInput.responseBuilder
      .speak("login first")
      .withSimpleCard("", "")
      .getResponse();
    }
    let speechText = " default";
    let res = encodeURI('https://csi3372-gitrekt.herokuapp.com/api/user/userNotifications'+principal);
    await axios.get(
        res,
        {
            headers: {
                'Authorization': 'Bearer '+ token
            }
        }
    ).then(response => {
		      speechText = 'Your notifications are: ';
		      
          let notilist = response.data;
          for (var i = 0; i < notilist.length; i++) {
            var obj = notilist[i];
            speechText = speechText + obj.info;
          }
          console.log(speechText);
	  })
	  .catch((err) => {
        speechText = err.message;
    });
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')
      .withSimpleCard("", speechText)
      .getResponse();
  },
};



const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    if (token === "none") {
      return handlerInput.responseBuilder
      .speak("login first")
      .withSimpleCard("", "")
      .getResponse();
    }
    const speechText = 'Welcome to pet finder, A platform to connect loving pet owners with trusted pet sitters.!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')
      .withSimpleCard("", speechText)
      .getResponse();
  },
};


let sta = "no operation";


const LoginIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LoginIntent';
  },
  handle(handlerInput) {
    let speechText = 'Please spell your user name account by account';
    sta = "waiting for username";
    speechText = speechText + sta;
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')

      .withSimpleCard("", speechText)
      .getResponse();
  },
};


const InputIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'InputIntent';
  },
  async handle(handlerInput) {
    let username = 'none', password = 'none';
    let speechText = username + password;
    if (handlerInput.requestEnvelope.request.intent.slots.username.hasOwnProperty('value')) {
      username = handlerInput.requestEnvelope.request.intent.slots.username.value;
    }
    else if (!handlerInput.requestEnvelope.request.intent.slots.username.hasOwnProperty('value')) {
      speechText = 'enter user name';
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')
      .withSimpleCard("", speechText)
      .getResponse();
    }
    if (handlerInput.requestEnvelope.request.intent.slots.password.hasOwnProperty('value')) {
      password = handlerInput.requestEnvelope.request.intent.slots.password.value;
    }
    else if (!handlerInput.requestEnvelope.request.intent.slots.password.hasOwnProperty('value')) {
      speechText = 'enter password';
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("", speechText)
      .getResponse();
    }
    if (username !== 'none' && password !== 'none') {
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers.put['Content-Type'] = 'application/json';
      await authenticate('1@test.com', '123456')
      .then((response) => {
        token = response.data.access_token;
        speechText = token;
       })
      .catch((err) => {
        //set an optional error message here
        speechText = err.message;
      });
    
      await axios.get(
          'https://csi3372-gitrekt.herokuapp.com/api/user',
          {
              headers: {
                  'Authorization': 'Bearer '+ token
              }
          }
      ).then(response => {
  		speechText = 'Well come to pet finder of software engineering 2 gourp 3 : ';
            speechText = speechText + ' Your name is ' + response.data.firstName + ' ' + response.data.lastName;
            console.log(speechText);
            //console.log(response);
  
  	  })
  	  .catch((err) => {
          //set an optional error message here
          speechText = err.message;
      });
      }
  
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('this is a reprompt')

      .withSimpleCard("", speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
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
      .withSimpleCard('Hello World', speechText)
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

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    InputIntentHandler,
    LoginIntentHandler,
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    DefaultLoginIntenthandler,
    myPetIntentHandler,
    addPetIntentHandler,
    notificationIntentHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
