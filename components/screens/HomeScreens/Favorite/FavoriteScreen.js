import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import * as HomeScreenComponent from '../Home/HomeScreenComponents/index';
import Animated from 'react-native-reanimated';

import ListView from './ListView';
class FavoriteScreen extends React.Component {
  constructor() {
    super();
    this.popupRef = React.createRef();
    this.state = {
      data: [],

      loading: true,
    };
  }
  componentDidMount() {
    let items = [];
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.user.user.resId)
      .collection('favorite')
      .get()
      .then((success) => {
        success.forEach((res) => {
          items.push(res._data);
        });
        this.setState({loading: false, data: items});
      })
      .catch((error) => {
        console.log('error');
      });
  }
  onShowPopup = () => {
    this.popupRef.show();
  };
  changeViewToList() {
    this.setState({isGrid: false});
  }
  changeViewToGrid() {
    this.setState({isGrid: true});
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: 'white', flex: 1, marginBottom: 5}}>
        <Animated.View style={{backgroundColor: 'white', flex: 1}}>
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
                onPress={() => {
                  this.setPasswordVisibale();
                }}>
                <Image
                  source={require('../../../../assets/hamburger.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <View style={styles.topMarketView}>
              <View style={styles.trendingIcon}>
                <Image
                  style={styles.trendingIconImage}
                  source={require('../../../../assets/Favorite.png')}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text style={styles.topMarketViewText}>Favorite Products</Text>
              </View>
            </View>
          </View>
          {this.state.loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#e9ba00" />
            </View>
          ) : (
            <View style={{marginVertical:10}}>
              <ListView userFavorite={this.state.data} {...this.props} />
            </View>
          )}

          <HomeScreenComponent.SwipePanel
            ref={(target) => (this.popupRef = target)}
          />
        </Animated.View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    resizeMode: 'contain',
  },

  touchableButton: {
    position: 'absolute',
    right: 10,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topMarketView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topMarketViewText: {
    fontFamily: 'GothamBold',
    fontSize: 22,
    color: '#481b74',
  },
  topMarketbuttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  trendingIcon: {
    height: 40,
    width: 40,
  },
  trendingIconImage: {
    height: '100%',
    width: '100%',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(FavoriteScreen);
