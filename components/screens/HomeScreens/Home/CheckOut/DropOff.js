import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
import * as firebase from 'react-native-firebase';
class DropOffScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isloading: false,
      address: '',
      city: '',
      streetName: '',
      streetNum: '',
      Appartment: '',
      ZipCode: '',
    };
  }
  componentDidMount() {
    const user = this.props.user.user.user;
    this.setState({user: user});
  }
  getAddress() {
    this.setState({isloading: true});
    const {
      address,
      city,
      streetName,
      streetNum,
      Appartment,
      ZipCode,
    } = this.state;
    const userId = this.state.user.resId;
    const addressObj = {
      address: address,
      city: city,
      streetName: streetName,
      streetNum: streetNum,
      Appartment: Appartment,
      ZipCode: ZipCode,
    };
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({address: firebase.firestore.FieldValue.arrayUnion({...addressObj})})
      .then((res) => {
        this.props.user.user.user.lastDeliveryAddress = addressObj;
        this.props.store_user(this.props.user.user.user);
        this.setState({isloading: false});
        this.props.navigation.navigate('CheckOutDetailScreen');
      });
  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <View style={styles.container}>
          <KeyboardAvoidingView enabled>
            <View style={styles.labelStyle}>
              <Text style={styles.label}>Address</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Address"
                placeholderTextColor="#6a349f"
                returnKeyType="next"
                onChangeText={(text) => this.setState({address: text})}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '85%',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text style={styles.label}>City</Text>
                <View style={styles.SectionStyle1}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="City"
                    placeholderTextColor="#6a349f"
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({city: text})}
                  />
                </View>
              </View>
              <View style={{width: '48%'}}>
                <Text style={styles.label}>Street Name</Text>
                <View style={styles.SectionStyle1}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Street Name"
                    placeholderTextColor="#6a349f"
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({streetName: text})}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '85%',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text style={styles.label}>Street Number</Text>
                <View style={styles.SectionStyle1}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Street Number"
                    placeholderTextColor="#6a349f"
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({streetNum: text})}
                  />
                </View>
              </View>
              <View style={{width: '48%'}}>
                <Text style={styles.label}>Appartment</Text>
                <View style={styles.SectionStyle1}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Appartment"
                    placeholderTextColor="#6a349f"
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({Appartment: text})}
                  />
                </View>
              </View>
            </View>

            <View style={styles.labelStyle}>
              <Text style={styles.label}>Zip Code</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Zip Code"
                placeholderTextColor="#6a349f"
                keyboardType="numeric"
                returnKeyType="next"
                onChangeText={(text) => this.setState({ZipCode: text})}
              />
            </View>
            <LinearGradient
              style={[styles.buttonStyle]}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity
                onPress={() => this.getAddress()}
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.5}>
                {this.state.isloading ? (
                  <ActivityIndicator size="large" color="#e9ba00" />
                ) : (
                  <Text style={styles.buttonTextStyle}>Continue</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  //input fields
  labelStyle: {
    width: '85%',
    alignSelf: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    width: '85%',
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c4c5c6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SectionStyle1: {
    flexDirection: 'row',
    height: 45,
    marginVertical: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c4c5c6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'GothamLight',
    fontSize: 15,
    color: '#481b74',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
    fontSize: 14,
    borderColor: 'gray',
    fontFamily: 'GothamLight',
  },
  seperator: {
    width: 100,
    height: 100,
    marginBottom: 50,
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
export default connect(mapStateToProps, mapDispatchToProps)(DropOffScreen);
