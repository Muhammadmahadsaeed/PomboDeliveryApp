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
class DisherTipScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isloading: false,
      tip: '',
    };
  }
  componentDidMount() {
    const user = this.props.user.user.user;
    this.setState({user: user});
  }
  updateTips() {
    this.setState({isloading: true});
    const tip = this.state.tip;
    this.props.user.user.user.tip = tip;
    this.props.store_user(this.props.user.user.user);
    this.setState({isloading: false});
    this.props.navigation.navigate('CheckOutDetailScreen');
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
              <Text
                style={{
                  fontFamily: 'GothamLight',
                  fontSize: 20,
                  color: '#481b74',
                }}>
                Add Tip
              </Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="5, 6"
                placeholderTextColor="#6a349f"
                keyboardType="numeric"
                onChangeText={(text) => this.setState({tip: text})}
              />
            </View>

            <LinearGradient
              style={[styles.buttonStyle]}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity
                onPress={() => this.updateTips()}
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
  inputStyle: {
    flex: 1,
    color: 'black',
    marginLeft: 40,
    paddingRight: 15,
    fontSize: 15,
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
export default connect(mapStateToProps, mapDispatchToProps)(DisherTipScreen);
