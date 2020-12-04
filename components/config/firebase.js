import * as firebase from 'react-native-firebase';

//login
function login(email, pwd) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then((res) => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user.emailVerified) {
            // user.sendEmailVerification();
            firebase
              .firestore()
              .collection('users')
              .doc(res.user.uid)
              .get()
              .then(function (querySnapshot) {
                if (querySnapshot.data().role == 'user') {
                  resolve(querySnapshot);
                }
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject("erorr")
            // reject(err);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//sign up
function signUp(firstName, lastName, pNum, password, email, address) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = {
          name: firstName,
          lastName: lastName,
          phone: pNum,
          address: address,
          email: res.user.email,
          role: 'user',
          resId: res.user.uid,
          paymentMethod: '',
          deliveryAddress: []
        };
        firebase.auth().onAuthStateChanged(function (user) {
          user.sendEmailVerification();
        });
        firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set(user)
          .then(function (querySnapshot) {
            resolve(user);
          })
          // .catch((err) => {
          //   console.log(err);
          // });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function addToUserCart(item, productId, userId) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('cart')
      .add(item)
      .then(function (querySnapshot) {
        resolve(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function addToFavorite(item, productId, userId) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('favorite')
      .add(item)
      .then(function (querySnapshot) {
        resolve(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function userOrder(orders, userId) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < orders.length; i++) {
      firebase
        .firestore()
        .collection('orders')
        .add(orders[i])
        .then(function (querySnapshot) {
          resolve(querySnapshot);
        })
        .catch((error) => {
          reject(error);
        });
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('cart')
        .get(orders[i])
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
          resolve(querySnapshot);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

export {login, signUp, addToUserCart, userOrder, addToFavorite};
