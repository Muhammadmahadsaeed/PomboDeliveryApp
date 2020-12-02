import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import * as firebase from 'react-native-firebase';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ProductCategory from './ProductCategories';
import StoreInfoModal from './StoreInfoModal';
import ProductListView from './ProductListView'

export default class StoreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
    this.StoreInfoPopup = React.createRef();
    this.onFlash = this.onFlash.bind(this)
  }

  moveToProduct(store) {
    this.props.navigation.navigate('ShowAllProducts', {store: store});
  }
  onShowStoreInfoPopup = () => {
    this.StoreInfoPopup.show();
  };
  onFlash(x){
   
    this.setState({flashMessage: x}, () => {
      setTimeout(() => this.closeFlashMessage(), 3000);
    });
  }
 
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  render() {
    const StoreDetail = this.props.navigation.getParam('StoreDetail');


    return (
      <View style={styles.container}>
        <ScrollView
          style={{backgroundColor: 'none'}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic">
          <Animated.View>
            <View style={styles.header}>
              <Image
                style={[styles.headerImg, {resizeMode: 'cover'}]}
                source={{
                  uri: StoreDetail.image,
                }}
              />
            </View>
            <View style={styles.itemDetialView}>
              <View style={styles.itemDetialTextView}>
                <Text
                  style={{
                    fontFamily: 'GothamBold',
                    fontSize: 20,
                    color: '#481b74',
                  }}>
                  {StoreDetail.store_name}
                </Text>
                <LinearGradient
                  style={styles.ratingButton}
                  colors={['#481b74', '#6a349f', '#481b74']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 1}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'GothamLight',
                      marginRight: 5,
                      color: '#fdf963',
                    }}>
                    {StoreDetail.rating}
                  </Text>
                  <Image
                    source={require('../../../../../assets/Stars/emptystar.png')}
                    style={{height: 20, width: 20}}
                  />
                </LinearGradient>
              </View>
              <View style={styles.openPick}>
                <View style={{flexDirection: 'row'}}>
                  <LinearGradient
                    style={[styles.openPickButton, {marginRight: 10}]}
                    colors={['#481b74', '#6a349f', '#481b74']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'GothamLight',
                          color: '#fdf963',
                        }}>
                        Open
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    style={styles.openPickButton}
                    colors={['#481b74', '#6a349f', '#481b74']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'GothamLight',
                          color: '#fdf963',
                        }}>
                        Pickup
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                <View>
                  <LinearGradient
                    style={styles.openPickButton}
                    colors={['#481b74', '#6a349f', '#481b74']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'GothamLight',

                        color: '#fdf963',
                      }}>
                      0.00 km
                    </Text>
                  </LinearGradient>
                </View>
              </View>

              <TouchableOpacity
                style={styles.informationView}
                onPress={this.onShowStoreInfoPopup}
                activeOpacity={0.8}>
                <View>
                  <Image
                    source={require('../../../../../assets/Stars/fullstar.png')}
                    style={{height: 30, width: 30}}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'GothamBold',
                      fontSize: 20,
                      color: '#481b74',
                      marginLeft: 15,
                    }}>
                    Information
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <ProductCategory storeId={StoreDetail.uid} {...this.props}/>
            <ProductListView
            storeId={StoreDetail.uid}
            {...this.props}
            onFlash={this.onFlash}
          />
          </Animated.View>
        </ScrollView>

        <StoreInfoModal
          store={StoreDetail}
          ref={(target) => (this.StoreInfoPopup = target)}
        />
         {this.state.flashMessage == true ? (
          <View style={styles.flashMessage}>
            <Text style={{color: '#fdf963', fontFamily: 'GothamLight'}}>
              Product has been added to your favorite
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 250,
    width: '100%',
  },
  headerImg: {
    height: '100%',
    width: '100%',
  },
  itemDetialView: {
    width: '95%',
    alignSelf: 'center',
  },
  itemDetialTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  ratingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
  },
  openPick: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openPickButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },

  informationView: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flashMessage: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#6a349f',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
