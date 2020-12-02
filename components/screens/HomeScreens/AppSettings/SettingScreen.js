import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import * as HomeScreenComponent from '../Home/HomeScreenComponents/index';
import ModalView from './Modal';
import {connect} from 'react-redux';
import Animated from 'react-native-reanimated';
import PaymentModal from './PaymentModal';
class SettingScreen extends React.Component {
  constructor() {
    super();
    this.popupRef = React.createRef();
    this.modalRef = React.createRef();
    this.PaymentModalRef = React.createRef();
  }
  setModalVisible = () => {
    this.modalRef.show();
  };
  setPaymentModal = () => {
    this.PaymentModalRef.showPaymentModal();
  };
  onShowPopup = () => {
    this.popupRef.show();
  };

  render() {
    const user = this.props.user.user
    return (
      <View>
        <ScrollView
          style={{backgroundColor: 'none'}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic">
          <Animated.View>
            <View style={[styles.SectionStyle]}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.onShowPopup}
                style={{
                  flex: 1,
                  height: 55,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={[styles.touchableButtonLeft]}>
                  <Image
                    source={require('../../../../assets/searchIcon.png')}
                    style={styles.searchIconImage}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'GothamLight',
                      color: '#6a349f',
                    }}>
                    Search for markets or products
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={[styles.touchableButton]}>
                <TouchableOpacity
                  style={{
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  activeOpacity={0.8}
                  // onPress={() => {
                  //   this.setPasswordVisibale();
                  // }}
                  >
                  <Image
                    source={require('../../../../assets/hamburger.png')}
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.topMarketView}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.topMarketViewText}>{user.name} {user.lastName}</Text>
                <Text style={styles.para}>{user.email}</Text>
              </View>
              <View style={styles.topMarketbuttonView}>
                <TouchableOpacity
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 50,
                  }}></TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.profileHeading}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.profileIcon}>
                    <Image
                      style={styles.img}
                      source={require('../../../../assets/User.png')}
                    />
                  </View>
                  <View style={{marginLeft: 16}}>
                    <Text style={styles.profileText}>Profile Settings</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={this.setModalVisible}>
                  <Text style={styles.profileText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.profileHeading}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.userInfoText}>First Name</Text>
                </View>
                <View>
                  <Text style={styles.userInfoText}>{user.name}</Text>
                </View>
              </View>
              <View style={styles.profileHeading}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.userInfoText}>Last Name</Text>
                </View>
                <View>
                  <Text style={styles.userInfoText}>{user.lastName}</Text>
                </View>
              </View>
              <View style={styles.profileHeading}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.userInfoText}>Email</Text>
                </View>
                <View>
                  <Text style={styles.userInfoText}>{user.email}</Text>
                </View>
              </View>
              <View style={styles.profileHeading}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.userInfoText}>Phone</Text>
                </View>
                <View>
                  <Text style={styles.userInfoText}>{user.phone}</Text>
                </View>
              </View>
              <View style={styles.profileHeading}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.userInfoText}>Address</Text>
                </View>
                <View>
                  <Text style={styles.userInfoText}>{user.address}</Text>
                </View>
              </View>
             
            </View>


            <HomeScreenComponent.SwipePanel
              ref={(target) => (this.popupRef = target)}
            />
          </Animated.View>
        </ScrollView>
        <ModalView ref={(target) => (this.modalRef = target)} user={user} />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMarketView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topMarketViewText: {
    fontFamily: 'GothamBold',
    fontSize: 22,
  },
  topMarketbuttonView: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
  },

  para: {
    fontFamily: 'GothamLight',
    fontSize: 12,
  },
  textStyle: {
    fontFamily: 'GothamLight',
    fontSize: 16,
  },
  //input fields
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    width: '90%',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#481b74',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 25,
  },
  touchableButtonLeft: {
    position: 'absolute',
    left: 0,
    height: 55,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconImage: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
  buttonImage: {
    height: '100%',
    width: '100%',
  },

  touchableButton: {
    position: 'absolute',
    right: 10,
    height: 35,
    width: 35,

    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    // height: 200,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  profileHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 12,
    marginBottom: 12,
  },
  profileIcon: {
    height: 35,
    width: 35,
  },
  profileText: {
    fontFamily: 'GothamLight',
    fontSize: 16,
  },
  userInfoText: {
    fontFamily: 'GothamLight',
    fontSize: 13,
    marginLeft: 10,
  },
});


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(SettingScreen);