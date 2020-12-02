import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import * as HomeScreenComponent from '../../Home/HomeScreenComponents/index';
import Animated from 'react-native-reanimated';
import * as firebase from 'react-native-firebase';
import ListView from './ListView';
export default class ProductCategoryDetailScreen extends React.Component {
  constructor() {
    super();
    this.popupRef = React.createRef();
    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    const categoryDetail = this.props.navigation.getParam('categoryDetail');

    let items = [];

    firebase
      .firestore()
      .collection('stores')
      .where('category', '==', categoryDetail.category_name)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          items.push(doc.data());
        });
        this.setState({loading:false, data: items});
      });
  }
  onShowPopup = () => {
    this.popupRef.show();
  };

  clickEventListener() {}
  render() {
    const categoryDetail = this.props.navigation.getParam('categoryDetail');

    return (
      <ScrollView style={{backgroundColor: 'white', flex: 1, marginBottom: 5}}>
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
                  source={require('../../../../../assets/searchIcon.png')}
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
                  source={require('../../../../../assets/hamburger.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#e9ba00" />
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <View style={styles.topMarketView}>
                  <View style={{height: 20, width: 20}}>
                    <Image
                      style={styles.trendingIconImage}
                      source={require('../../../../../assets/category.png')}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.topMarketViewText}>
                      {categoryDetail.category_name}
                    </Text>
                  </View>
                </View>
              </View>
              <ListView products={this.state.data} {...this.props} />
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

  listContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginTop: 20,
    // marginBottom: 5,
    flexBasis: '45%',
    marginHorizontal: 5,
  },
  cardHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 10,
  },

  cardImage: {
    height: 130,
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'GothamBold',
    flex: 1,
    color: 'white',
  },
  para: {
    fontSize: 15,
    fontFamily: 'GothamLight',
    flex: 1,
    color: 'white',
  },
});
