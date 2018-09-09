
/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

 const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
//tODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = 'mxhacks.2018.v@gmail.com';
//hackingipn2018@gmail.com'; 
const gmailPassword = 'mxhacks_2018';
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});



var admin = require("firebase-admin");
var serviceAccount = require("./leer.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-b1cf5.firebaseio.com"
});

// Sends an email confirmation when a user changes his mailing list subscription.
//exports.sendEmailConfirmation = functions.database.ref('/').onWrite(event => {
//var admin = require('firebase-admin');
exports.sendEmailConfirmation = functions.database.ref('/').onWrite(event => {
  let Latitud = 'Latitud: ';
  let Altitud = 'Altitud: ';
  let Nombre = 'Nombre: ';
  let Precision = 'Precicion: ';

  var ref = admin.database().ref().child('dispositivo').child('LLtamXyzO0nrMusQ8qq').child('MAC:5C:CF:7F:AC:B7:83');
  ref.child('lat').on('value', function(snap){
    Latitud = Latitud + snap.val();
    console.log('value', snap.val());
  });

  ref.child('lon').on('value', function(snap){
    Altitud = Altitud + snap.val();
    console.log('value', snap.val());
  });
  ref.child('nombre').on('value', function(snap){
    Nombre = Nombre + snap.val();
    console.log('value', snap.val());
  });
  ref.child('prec').on('value', function(snap){
    Precision = Precicion + snap.val();
    console.log('value', snap.val());
  });

  console.log('Esto es final ' + Altitud + Latitud + Nombre + Precision);

  const mailOptions = {
    from: '"MxHacks V - HackingIPN." <noreply@firebase.com>',
    to: 'zacate97@hotmail.com',
  };

  //const subscribed = val.subscribedtomailinglist;
  const subscribed = 'zacate97@hotmail.com';

  // Building Email message.
  mailOptions.subject = subscribed ? 'Hola MxHacks :D' : 'probando email';
  mailOptions.text = subscribed ?
      //'Equipo antirobos.' : 'tstng';
      'Probando sistema: ' + Altitud + Latitud + Nombre + Precision : 'testing';

  try {
    mailTransport.sendMail(mailOptions);
    //console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, subscribed);
    console.log(`Alertando a :`, subscribed);
  } catch(error) {
    console.error('Ocurrió un erro al enviar mensaje a: ', error);
  }
  return null;
});
