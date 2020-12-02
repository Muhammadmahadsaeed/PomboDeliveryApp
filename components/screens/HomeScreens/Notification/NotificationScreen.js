import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,ActivityIndicator
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isData: true,
      loading: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  }
  setTimePassed() {
    this.setState({loading: false});
  }
  render() {
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={['#481b74', '#6a349f', '#481b74']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.1}}>
         {this.state.loading && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#e9ba00" />
          </View>
        )}
        {!this.state.loading && this.state.isData && (
          <View style={styles.containerStyle}>
            <View style={styles.notificationImage}>
              <Image
                style={styles.imageIcon}
                source={require('../../../../assets/Notifications3.png')}
              />
            </View>
            <View style={styles.notificationText}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'GothamLight',
                  fontSize: 16,
                  marginVertical: 5,
                  textAlign: 'center',
                }}>
                You don't have any item
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'GothamLight',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                in the notification list
              </Text>
            </View>
            <LinearGradient
              style={{
                borderRadius: 50,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
              }}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              <View style={styles.notificationbutton}>
                <TouchableWithoutFeedback style={{backgroundColor: 'white'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'GothamBold',
                      fontSize: 18,
                    }}>
                    Start exploring
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </LinearGradient>
          </View>
        )}
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationImage: {
    height: 100,
    width: 100,

    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  notificationText: {
    marginTop: 20,
    marginBottom: 60,
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationbutton: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 50,
  },
});
