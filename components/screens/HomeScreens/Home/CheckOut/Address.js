import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import * as firebase from 'react-native-firebase';
import {connect} from 'react-redux';
class AddressScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      isLoading: false,
      loading: true,
    };
  }
  componentDidMount() {
    const userId = this.props.user.user.user.resId;
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((query) => {
        this.setState({user: query.data().address, loading: false});
      });
  }

  updateDeliveryAddress(item) {
    this.setState({isLoading: true});
    const userId = this.props.user.user.user.resId;
    console.log(item);
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({
        lastDeliveryAddress: item,
      })
      .then((res) => {
        this.props.user.user.user.lastDeliveryAddress = item;
        this.props.store_user(this.props.user.user.user);
        this.setState({isLoading: false});
        this.props.navigation.navigate('CheckOutDetailScreen');
      });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#e9ba00" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                flex: 1,
                marginVertical: 10,
              }}>
              {this.state.user.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.notificationBox}
                    onPress={() => this.updateDeliveryAddress(item)}
                    activeOpacity={0.8}
                    key={index.toString()}>
                    <View style={styles.addressView}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'GothamLight',
                        }}>
                        {item.address}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'GothamLight',
                        }}>
                        {item.streetName} # {item.streetNum}, {item.Appartment},{' '}
                        {item.ZipCode}
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
                );
              })}
            </View>
          </ScrollView>
        )}

        {this.state.isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#e9ba00" />
          </View>
        ) : null}
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
  buttonStyle: {
    height: 50,
    width: '85%',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'GothamBold',
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
export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
