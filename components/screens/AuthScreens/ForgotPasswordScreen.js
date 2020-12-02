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

class ForgotPasswordScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
    };
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic">
        {/* <StatusBar backgroundColor="purple" barStyle="light-content" /> */}

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

          <LinearGradient style={{flex:1,paddingBottom:150}}
            colors={['#481b74','#6a349f','#481b74']}
            start={{x: 0, y:1 }}
            end={{x: 1, y: 0.1}}>
            <View style={{width: '85%', alignSelf: 'center'}}>
              <Text style={styles.text_header}>Email to reset password</Text>
            </View>
            <LinearGradient
              style={styles.loginContainer}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              <KeyboardAvoidingView enabled>
                <View style={[styles.SectionStyle]}>
                  <View style={[styles.touchableButtonLeft]}>
                    <Image
                      source={require('../../../assets/email2.png')}
                      style={styles.buttonImage}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter ID"
                    placeholderTextColor="#6a349f"
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                </View>
                <LinearGradient
                  style={[styles.buttonStyle]}
                  colors={['#e9ba00', '#fdf963', '#e9ba00']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.moveToHome();
                    }}
                    activeOpacity={0.5}>
                    {this.state.isloading ? (
                      <ActivityIndicator size="large" color="#81b840" />
                    ) : (
                      <Text style={styles.buttonTextStyle}>Send link</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </KeyboardAvoidingView>
            </LinearGradient>

            <View style={styles.forgotPasswordView}>
              <TouchableOpacity style={{paddingTop:10,paddingBottom:5}} activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{fontSize: 16, fontFamily: 'GothamLight', color:'white'}}>
                  Return to login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity  activeOpacity={0.7} style={{marginTop:5,paddingVertical:10}}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GothamLight',
                   
                    color:'white'
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
    fontFamily:'GothamLight',
    marginLeft:15,
  },
  loginContainer: {
    borderRadius: 30,
    height: 200,
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
    justifyContent:'center',
    alignItems:'center'
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
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
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
    fontSize:20,
    borderColor: 'gray',
    fontFamily: 'GothamLight',
  },
  forgotPasswordView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;
