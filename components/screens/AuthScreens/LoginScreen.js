import React from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {login} from '../../config/firebase';
import {connect} from 'react-redux';
import {userObject} from '../../Redux/Action/action';
class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pwd: '',
      isError: false,
      isloading: false,
      hidePassword: true,
      showEmailEmptyErorr: false,
      showPasswordEmptyErorr: false,
    };
  }

  async moveToHome() {
    const {email, pwd} = this.state;
    this.setState({isloading: true});
    if (email === '' && pwd === '') {
      this.setState({
        showEmailEmptyErorr: true,
        showPasswordEmptyErorr: true,
      });
    } else if (email === '') {
      this.setState({showEmailEmptyErorr: true});
    } else if (pwd === '') {
      this.setState({showPasswordEmptyErorr: true});
    } else {
      try {
        const userLogin = await login(email, pwd);

        this.props.store_user(userLogin._data);
        this.props.navigation.navigate('Drawer');
      } catch (e) {
        console.log(e)
        this.setState({isloading: false});
        this.setState({isError: true});
      }
    }
  }
  setPasswordVisibale() {
    this.setState({hidePassword: !this.state.hidePassword});
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <LinearGradient
            style={styles.header}
            colors={['#e9ba00', '#fdf963', '#e9ba00']}
            start={{x: 0, y: 0.1}}
            end={{x: 1, y: 1}}>
            <View style={{width: '80%', height: 150}}>
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'center'}}
                source={require('../../../assets/Logo_Pombo_Redonda.png')}
              />
            </View>
          </LinearGradient>

          <LinearGradient
            style={{paddingBottom: 150}}
            colors={['#481b74', '#6a349f', '#481b74']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0.1}}>
            <View style={{width: '85%', alignSelf: 'center'}}>
              <Text style={styles.text_header}>
                Let's start with your login!
              </Text>
            </View>
            <LinearGradient
              style={styles.loginContainer}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}>
              <KeyboardAvoidingView enabled>
                <View style={[styles.SectionStyle, {marginTop: 30}]}>
                  <View style={[styles.touchableButtonLeft]}>
                    <Image
                      source={require('../../../assets/email2.png')}
                      style={styles.buttonImage}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(e) => this.setState({email: e})}
                    onFocus={() =>
                      this.setState({
                        showEmailEmptyErorr: false,
                        isError: false,
                        isloading: false,
                      })
                    }
                    placeholder="Enter ID"
                    placeholderTextColor="#6a349f"
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                  {this.state.showEmailEmptyErorr && (
                    <Image
                      style={{height: 25, width: 25}}
                      source={require('../../../assets/invalidIcon.png')}
                    />
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <View style={[styles.touchableButtonLeft]}>
                    <Image
                      source={require('../../../assets/lock2.png')}
                      style={{height: '60%', width: '65%'}}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    placeholderTextColor="#6a349f"
                    secureTextEntry={this.state.hidePassword}
                    returnKeyType="next"
                    onChangeText={(e) => {
                      this.setState({pwd: e});
                    }}
                    onFocus={() =>
                      this.setState({
                        showPasswordEmptyErorr: false,
                        isError: false,
                        isloading: false,
                      })
                    }
                  />

                  <View style={[styles.touchableButton]}>
                    {this.state.showPasswordEmptyErorr ? (
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../../../assets/invalidIcon.png')}
                      />
                    ) : (
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 3,
                          height: 45,
                          width: 35,
                          justifyContent: 'center',
                          padding: 4,
                          alignItems: 'center',
                        }}
                        activeOpacity={0.8}
                        onPress={() => {
                          this.setPasswordVisibale();
                        }}>
                        <Image
                          source={
                            this.state.hidePassword
                              ? require('../../../assets/eye.png')
                              : require('../../../assets/eye.png')
                          }
                          style={styles.buttonImage}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {this.state.isError && (
                  <Text
                    style={{
                      marginLeft: 35,
                      color: 'red',
                      fontFamily: 'GothamLight',
                    }}>
                    Email and password incorrect
                  </Text>
                )}
                <LinearGradient
                  style={[styles.buttonStyle]}
                  colors={['#e9ba00', '#fdf963', '#e9ba00']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 1}}>
                  <TouchableOpacity
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.moveToHome();
                    }}
                    activeOpacity={0.5}>
                    {this.state.isloading ? (
                      <ActivityIndicator size="large" color="#481b74" />
                    ) : (
                      <Text style={styles.buttonTextStyle}>Login</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
                {/* <TouchableOpacity
                  style={[styles.SignUpbuttonStyle]}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.moveToHome();
                  }}>
                  <Text style={[styles.buttonTextStyle, {color: '#e9ba00'}]}>
                    Skip
                  </Text>
                </TouchableOpacity> */}
              </KeyboardAvoidingView>
            </LinearGradient>
            <View style={styles.forgotPasswordView}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingTop: 10}}
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GothamLight',
                    color: 'white',
                  }}>
                  I forgot my password
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'white',
                  width: '51%',
                  marginVertical: 5,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GothamLight',
                    color: 'white',
                  }}>
                  I don't have an account
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 200,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_header: {
    color: '#fff',
    fontSize: 22,
    marginTop: 40,
    marginBottom: 15,
    marginLeft: 15,
    fontFamily: 'GothamLight',
  },
  loginContainer: {
    borderRadius: 30,
    height: 280,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  //input fields
  SectionStyle: {
    flexDirection: 'row',
    height: 45,
    width: '85%',
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#c4c5c6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButtonLeft: {
    position: 'absolute',
    left: 3,
    height: 45,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  touchableButton: {
    position: 'absolute',
    right: 3,
    height: 45,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  buttonStyle: {
    borderWidth: 0,
    color: 'black',
    borderColor: '#7DE24E',
    height: 50,
    width: '60%',
    alignItems: 'center',
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    shadowColor: '#81b840',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  SignUpbuttonStyle: {
    width: 80,
    color: 'white',
    borderColor: '#7DE24E',
    // height: 80,
    alignSelf: 'center',
    alignItems: 'center',
    fontFamily: 'GothamLight',
  },
  buttonTextStyle: {
    color: '#481b74',

    fontSize: 18,
    fontFamily: 'GothamBold',
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    marginLeft: 40,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    fontFamily: 'GothamLight',
  },
  textboxfieldd: {
    fontFamily: 'GothamLight',
  },
  forgotPasswordView: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    store_user: (user) => dispatch({type: 'SET_USER', payload: user}),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
