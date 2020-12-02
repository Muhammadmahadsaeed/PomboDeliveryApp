import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  
} from 'react-native';
import RNPaypal from 'react-native-paypal-lib';
import { WebView } from 'react-native-webview';
import {connect} from 'react-redux';
import stripe from 'tipsi-stripe';
stripe.setOptions({
  publishableKey:
    'pk_test_51HoMeaKpCZXp24tB1XLDheh60iuqVlZDCzJ6o4d8atLD3WUwpIKISE25fBWlvB0cNi9XcKCILbeYBboo5RhhR8PW0054zkaoOJ',
});
class PaymentScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
      token: null,
      amount: 0,
      flashMessage: false,
      isLoading: false,
      showModal: false,
      status: 'Pending',
    };
  }
  componentDidMount() {
    this.setState({user: this.props.user.user.user});
    const amount = this.props.navigation.getParam('amount');
    this.setState({amount: amount});
   
  }

  async goToCreditCard() {
    try {
      this.setState({loading: true, token: null});
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      });
      this.setState({loading: false, token, isLoading: true});
      this.doPayment()
      
    } catch (error) {
      this.setState({loading: false});
    }
  }
  doPayment = async () => {
   
    fetch(
      'https://us-central1-pombodelivery-7019c.cloudfunctions.net/completePaymentWithStripe',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: '10',
          currency: 'usd',
          token: this.state.token,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        // this.updatePaymentMethod(this.state.token);
      })
      .catch((error) => {
        console.error(error);
      });;
  }
  

  updatePaymentMethod(token) {
    console.log("========")
    const card = [];
    card.push(token);
    this.props.user.user.user.paymentmethod = card;
    this.props.store_user(this.props.user.user.user);
    this.setState({isLoading: false});
    this.props.navigation.navigate('CheckOutDetailScreen');
  }
  handleResponse = (data) => {
    if (data.title === 'success') {
      this.setState({showModal: false, status: 'Complete'});
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  goToPaypal() {
    
    this.setState({ showModal: true })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{width: '95%', alignSelf: 'center'}}>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text style={styles.heading}>Payment Method</Text>
              <TouchableOpacity
                style={styles.notificationBox}
                onPress={() => this.goToCreditCard()}
                activeOpacity={0.8}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Credit/Debit Card
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      height: 22,
                      width: 22,
                      marginLeft: 5,
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../../../assets/arrow.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.notificationBox}
                onPress={() => this.goToPaypal()}
                activeOpacity={0.8}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Paypal
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      height: 22,
                      width: 22,
                      marginLeft: 5,
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../../../assets/arrow.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {this.state.isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#e9ba00" />
          </View>
        ) : null}
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({showModal: false})}>
          <WebView
            source={{uri: 'https://pombo-paypal.herokuapp.com/'}}
            onNavigationStateChange={(data) => this.handleResponse(data)}
            injectedJavaScript={`document.f1.submit()`}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  heading: {
    fontFamily: 'GothamBold',
    fontSize: 20,
    marginBottom: 10,
    color: '#481b74',
  },
  notificationBox: {
    flex: 1,
    marginVertical: 1,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },

  description: {
    color: 'gray',
    fontFamily: 'GothamLight',
  },
  addressView: {
    flex: 1,
  },
  flashMessage: {
    position: 'absolute',
    backgroundColor: '#e9ba00',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    store_user: (user) => dispatch({type: 'SET_USER', payload: user}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
