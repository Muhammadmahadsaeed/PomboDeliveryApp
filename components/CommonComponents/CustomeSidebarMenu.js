//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      proileImage: '../../assets/admin.png',
      data: '',
      items1: [
        {
          navOptionName: 'Home',
          uri: require('../../assets/Home.png'),
          screenToNavigate: 'Home',
        },
        {
          navOptionName: 'Notifications',
          uri: require('../../assets/bellIcon.png'),
          screenToNavigate: 'Notification',
        },
        {
          navOptionName: 'My Orders',
          uri: require('../../assets/Settings.png'),
          screenToNavigate: 'Shop',
        },
        {
          navOptionName: 'Favorite Products',
          uri: require('../../assets/Favorite.png'),
          screenToNavigate: 'Favorite',
        },
      ],
      items2: [
        {
          navOptionName: 'Help & Support',
          uri: require('../../assets/Help.png'),
          screenToNavigate: 'HomeScreen',
        },
        {
          navOptionName: 'Settings',
          uri: require('../../assets/Settings.png'),
          screenToNavigate: 'SettingScreen',
        },
      ],
    };
  }
  logOut() {
    this.props.navigation.navigate('Login');
    this.props.removeAllItem([]);
  }
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.sideMenuContainer}>
          <LinearGradient
            colors={['#481b74', '#6a349f', '#481b74']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 1}}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,

              elevation: 15,
              flexDirection: 'row',
              paddingVertical: 40,
              marginBottom: 30,
            }}>
            <View style={styles.sideMenuProfile}>
              <Image
                source={require('../../assets/dummy.png')}
                style={styles.sideMenuProfileIcon}
              />
            </View>
            <View style={styles.profileInfo}>
              <View>
                <Text
                  style={{
                    fontFamily: 'GothamBold',
                    fontSize: 18,
                    color: 'white',
                  }}>
                  {this.props.user.user.name.toUpperCase()}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                }}>
                <Text style={styles.profileInfoText}>
                  {this.props.user.user.email}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/*Setting up Navigation Options from option array using loop*/}
          <View style={{width: '100%'}}>
            {this.state.items1.map((item, key) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    global.currentScreenIndex = key;

                    this.props.navigation.navigate(item.screenToNavigate);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                  key={key}>
                  <Image source={item.uri} style={styles.sideMenuIcon} />
                  <Text
                    style={{
                      fontSize: 20,

                      color: '#481b74',
                      fontFamily: 'GothamLight',
                    }}>
                    {item.navOptionName}
                  </Text>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          <View
            style={{
              marginHorizontal: 18,
              marginVertical: 30,
              height: 1,
              backgroundColor: '#481b74',
            }}></View>
          <View style={{width: '100%'}}>
            {this.state.items2.map((item, key) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                key={key}>
                <Image source={item.uri} style={styles.sideMenuIcon} />

                <Text
                  style={{
                    fontSize: 20,

                    color: '#481b74',
                    fontFamily: 'GothamLight',
                  }}>
                  {item.navOptionName}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <TouchableWithoutFeedback
            onPress={() => {this.logOut()}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              marginBottom:20
            }}>
            <Image source={require('../../assets/Logout.png')} style={styles.sideMenuIcon} />

            <Text
              style={{
                fontSize: 20,

                color: '#481b74',
                fontFamily: 'GothamLight',
              }}>
              Log out
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },

  sideMenuProfile: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 100,
    borderColor: '#e9ba00',

    marginLeft: 15,
  },
  sideMenuProfileIcon: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  profileInfo: {
    justifyContent: 'center',
    marginLeft: 15,
    flex: 1,
  },
  profileInfoText: {
    fontFamily: 'GothamLight',
    color: 'white',
  },

  sideMenuIcon: {
    resizeMode: 'center',
    width: 28,
    height: 28,
    marginRight: 10,
    marginLeft: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   
    removeAllItem: () => dispatch({type: 'REMOVE_ALL_CART'}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomSidebarMenu);
