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
import {signUp} from '../../config/firebase';
import {connect} from 'react-redux';
import {userObject} from '../../Redux/Action/action';
import ModalView from './Modal';
class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.modalRef = React.createRef();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pNum: '',
      address: '',
      password: '',
      firstNameErorr: false,
      lastNameErorr: false,
      emailErorr: false,
      pNumErorr: false,
      pwdErorr: false,
      addressError: false,
      isError: false,
      isloading: false,
      hidePassword: true,
    };
  }
  async moveToHome() {
    const {firstName, lastName, email, pNum, address, password} = this.state;
    if (
      firstName === '' &&
      lastName === '' &&
      email === '' &&
      pNum === '' &&
      password === '' &&
      address === ''
    ) {
      this.setState({
        firstNameErorr: true,
      });
      this.setState({
        lastNameErorr: true,
      });
      this.setState({
        emailErorr: true,
      });
      this.setState({
        pNumErorr: true,
      });
      this.setState({
        pwdErorr: true,
      });
      this.setState({
        addressError: true,
      });
    } else if (firstName == '') {
      this.setState({firstNameErorr: true});
    } else if (lastName == '') {
      this.setState({lastNameErorr: true});
    } else if (email == '') {
      this.setState({emailErorr: true});
    } else if (pNum == '') {
      this.setState({pNumErorr: true});
    } else if (password == '') {
      this.setState({pwdErorr: true});
    } else if (address == '') {
      this.setState({addressError: true});
    } else {
      this.setState({isloading: true});
      try {
        const userSignUp = await signUp(
          firstName,
          lastName,
          pNum,
          password,
          email,
          address,
        );
        if (userSignUp) {
          this.setModalVisible();
        } else {
          this.setState({isloading: false});
          this.setState({isError: true});
        }
        // this.props.store_user(userSignUp);

        // this.props.navigation.navigate('Drawer');
      } catch (e) {
        this.setState({isloading: false});
        this.setState({isError: true});
      }
      this.props.navigation.navigate('Second', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pNum: pNum,
        password: password,
        address: address,
      });
    }
  }
  setModalVisible() {
    this.modalRef.show();
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
                Let's Start with registration!
              </Text>
            </View>
            <LinearGradient
              style={styles.loginContainer}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}>
              <KeyboardAvoidingView enabled>
                <View style={[styles.SectionStyle]}>
                  <View style={[styles.touchableButtonLeft]}>
                    <Image
                      source={require('../../../assets/User3.png')}
                      style={styles.buttonImage}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="First Name"
                    placeholderTextColor="#6a349f"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onChangeText={(e) => {
                      this.setState({firstName: e});
                    }}
                    onFocus={() =>
                      this.setState({firstNameErorr: false, isError: false})
                    }
                  />
                  {this.state.firstNameErorr && (
                    <View style={styles.touchableButton}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../../../assets/invalidIcon.png')}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <View style={[styles.touchableButtonLeft]}>
                    <Image
                      source={require('../../../assets/User3.png')}
                      style={styles.buttonImage}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Last Name"
                    placeholderTextColor="#6a349f"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({lastName: text})}
                    onFocus={() =>
                      this.setState({lastNameErorr: false, isError: false})
                    }
                  />
                  {this.state.lastNameErorr && (
                    <View style={styles.touchableButton}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../../../assets/invalidIcon.png')}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Phone Number"
                    placeholderTextColor="#6a349f"
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({pNum: text})}
                    onFocus={() =>
                      this.setState({pNumErorr: false, isError: false})
                    }
                  />
                  {this.state.pNumErorr && (
                    <View style={styles.touchableButton}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../../../assets/invalidIcon.png')}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Address"
                    placeholderTextColor="#6a349f"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({address: text})}
                    onFocus={() =>
                      this.setState({addressError: false, isError: false})
                    }
                  />
                  {this.state.addressError && (
                    <View style={styles.touchableButton}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../../../assets/invalidIcon.png')}
                      />
                    </View>
                  )}
                </View>

                <View style={[styles.SectionStyle]}>
                  <View style={[styles.touchableButtonLeft]}>
                    <Image
                      source={require('../../../assets/email2.png')}
                      style={styles.buttonImage}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Email ID"
                    placeholderTextColor="#6a349f"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onChangeText={(e) => {
                      this.setState({email: e});
                    }}
                    onFocus={() =>
                      this.setState({emailErorr: false, isError: false})
                    }
                  />
                  {this.state.emailErorr && (
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
                      this.setState({password: e});
                    }}
                    onFocus={() =>
                      this.setState({pwdErorr: false, isError: false})
                    }
                  />

                  <View style={[styles.touchableButton]}>
                    {this.state.pwdErorr ? (
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
                    Email already exist
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
                      <Text style={styles.buttonTextStyle}>Register</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </KeyboardAvoidingView>
            </LinearGradient>

            <View style={styles.forgotPasswordView}>
              <TouchableOpacity
                style={{paddingVertical: 30}}
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GothamLight',
                    color: 'white',
                  }}>
                  I already have account? Back to login.
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        <ModalView ref={(target) => (this.modalRef = target)} {...this.props} />
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
    fontFamily: 'GothamLight',
  },
  loginContainer: {
    borderRadius: 30,
    paddingVertical: 15,
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
    height: 80,
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
    color: 'black',
    marginLeft: 40,
    paddingRight: 15,
    fontSize: 20,
    borderColor: 'gray',
    fontFamily: 'GothamLight',
  },
  forgotPasswordView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    store_user: (user) => dispatch(userObject(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
