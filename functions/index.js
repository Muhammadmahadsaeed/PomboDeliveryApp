const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const stripe = require('stripe')('sk_test_51HoMeaKpCZXp24tBX8JT3PA2RXar1O1LWUgdamFaX9jogI0x882Ina7XUqrWB7mDWGxD5ihCL1HCdUIx1gfkN8xp00fhbPEXIY')
exports.completePaymentWithStripe = functions.https.onRequest((request, response) => {


    // eslint-disable-next-line promise/catch-or-return
    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: 'tok_mastercard',
    }).then((charge) => {
            // asynchronously called
            response.send(charge);
        })
        .catch(err =>{
            console.log(err);
        });

});