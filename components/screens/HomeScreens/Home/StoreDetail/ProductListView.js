import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'react-native-firebase';
import {addToFavorite} from '../../../../config/firebase';
import {connect} from 'react-redux';
class ProductListView extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isloading: false,
    };
  }

  moveToProduct(store) {
    this.props.navigation.navigate('ShowAllProducts', {store: store});
  }
  componentDidMount() {
    const store = this.props.storeId;
    let items = [];

    firebase
      .firestore()
      .collection('products')
      .where('storeId', '==', store)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          doc.data().productId = doc.id;
          items.push(doc.data());
        });
        this.setState({data: items});
      });
  }
  addToCartScreen(item) {
    this.props.navigation.navigate('AddToCartScreen', {productDetail: item});
  }

  async addItemToFavorite(item) {
    this.setState({isloading: true});

    item.status = 'favorite';
    const productId = item.productId;
    const userId = this.props.user.user.resId;
    try {
      const addFavorite = await addToFavorite(item, productId, userId);

      if (addFavorite) {
        this.setState({isloading: false});
        this.props.onFlash(true);
      }
    } catch (e) {
      console.log(e);
    }
  }
  addToCartScreen(item) {
    this.props.navigation.navigate('AddToCartScreen', {productDetail: item});
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.data.map((item, index) => {
          return (
            <View style={styles.notificationBox} key={index.toString()}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  activeOpacity={0.7}
                  onPress={() => this.addToCartScreen(item)}>
                  <View style={styles.icon}>
                    <Image
                      style={{height: '100%', width: '100%', borderRadius: 5}}
                      source={{uri: item.img}}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={styles.name}>{item.pname}</Text>
                    <Text style={styles.description}>{item.des}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.favoriteImg}>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity
                  onPress={() => this.addItemToFavorite(item)}
                  style={{height: 40, width: 40}}
                  activeOpacity={0.8}>
                  <Image
                    style={{height: '100%', width: '100%'}}
                    source={require('../../../../../assets/Favorite2.png')}
                  />
                </TouchableOpacity>
              </View>
           
            </View>
          );
        })}
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  notificationList: {
    paddingVertical: 5,
  },
  notificationBox: {
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#e9ba00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 20,
    fontFamily: 'GothamBold',
    marginLeft: 10,
    color: 'white',
  },
  description: {
    fontSize: 14,
    fontFamily: 'GothamLight',
    marginLeft: 10,
    color: 'white',
  },
  price: {
    fontSize: 18,
    fontFamily: 'GothamLight',

    color: 'white',
  },
  favoriteImg: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(ProductListView);
