import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
class AddToCartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      quantity: 1,
      isloading: false,
      totalPrice: 0,
    };
  }
  componentDidMount() {
    const productDetail = this.props.navigation.getParam('productDetail');
   
    this.setState({
      price: parseInt(productDetail.price),
      totalPrice: parseInt(productDetail.price),
    });
  }
  onChangeQual(type) {
    const productDetail = this.props.navigation.getParam('productDetail');
    let cantd = this.state.quantity;
    let totalPrice = productDetail.price;
    if (type) {
      cantd = cantd + 1;
      totalPrice = totalPrice * cantd;
      this.setState({quantity: cantd, totalPrice: totalPrice});
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      totalPrice = parseInt(this.state.totalPrice) - totalPrice;
      this.setState({quantity: cantd, totalPrice: totalPrice});
    } else if (type == false && cantd == 1) {
      cantd = 1;
      totalPrice = parseInt(this.state.totalPrice);
      this.setState({quantity: cantd, totalPrice: totalPrice});
    }
  }

  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
   addToCart() {
    this.setState({isloading: true});
    const productDetail = this.props.navigation.getParam('productDetail');
    productDetail.quantity = this.state.quantity;
    productDetail.status = 'addToCart';
    this.setState({isloading: false});
    this.props.addItemToCart(productDetail);
    // this.setState({flashMessage: true}, () => {
    //   setTimeout(() => this.closeFlashMessage(), 3000);
    // });
  }

  render() {
    const {price, quantity} = this.state;
    const productDetail = this.props.navigation.getParam('productDetail');

    return (
      <View style={styles.container}>
        <ScrollView
          style={{flexGrow: 0.8, marginBottom: 10}}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic">
          <Animated.View>
            <View style={styles.header}>
              <Image
                style={styles.headerImg}
                source={{uri: productDetail.img}}
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
                  {productDetail.pname}
                </Text>

                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'GothamBold',
                    marginRight: 5,
                    color: '#481b74',
                  }}>
                  ${productDetail.price}
                </Text>
              </View>
              <View style={styles.marketCba}>
                <Text
                  style={{
                    fontFamily: 'GothamLight',
                    fontSize: 15,
                    color: '#481b74',
                  }}>
                  MarketCba
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'GothamLight',
                    marginRight: 5,
                    color: '#481b74',
                  }}>
                  $14.00
                </Text>
              </View>

              <View style={styles.openPick}>
                <View>
                  <LinearGradient
                    style={styles.openPickButton}
                    colors={['#481b74', '#6a349f', '#481b74']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'GothamLight',
                        color: '#fdf963',
                      }}>
                      Not Deliverable
                    </Text>
                  </LinearGradient>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <LinearGradient
                    style={[styles.openPickButton, {marginRight: 5}]}
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
                        50.94 m
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
                        5 items
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
              <View style={{marginVertical: 15}}>
                <Text style={{fontFamily: 'GothamLight', fontSize: 18}}>
                  {productDetail.des}
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerQuantityView}>
            <View>
              <Text style={styles.quantityText}>Quantity</Text>
            </View>
            <View style={styles.addSub}>
              <TouchableOpacity
                onPress={() => this.onChangeQual(false)}
                style={styles.quantityBtn}
                activeOpacity={0.5}>
                <Text style={{fontSize: 20}}>-</Text>
              </TouchableOpacity>

              <Text style={[styles.quantityText, {marginHorizontal: 10}]}>
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={() => this.onChangeQual(true)}
                style={styles.quantityBtn}
                activeOpacity={0.5}>
                <Text style={{fontSize: 20}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerAddToCartButton}>
            <View style={{height: 45, width: 45}}>
              <Image
                source={require('../../../../../assets/Favorite.png')}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <LinearGradient
              style={styles.btn}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              {this.state.isloading ? (
                <View style={{flex: 1, paddingVertical: 12}}>
                  <ActivityIndicator size="small" color="#fdf963" />
                </View>
              ) : (
                <TouchableOpacity
                  style={{flex: 1, paddingVertical: 12}}
                  activeOpacity={0.5}
                  onPress={() => this.addToCart()}>
                  <Text style={styles.btnText}>Add to Cart</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.btnText}> ${this.state.totalPrice}</Text>
            </LinearGradient>
          </View>
        </View>
        {this.state.flashMessage == true ? (
          <View style={styles.flashMessage}>
            <Text style={{color: '#fdf963', fontFamily: 'GothamLight'}}>
              Product has been added to your cart
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    position: 'relative',
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

    alignItems: 'center',
  },
  marketCba: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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

  footer: {
    flex: 0.2,
    backgroundColor: '#e9ba00',
    width: '100%',
    height: 120,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
  },
  footerQuantityView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityText: {
    fontFamily: 'GothamLight',
    fontSize: 20,
    color: '#481b74',
  },

  addSub: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerAddToCartButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    backgroundColor: 'red',
    width: '85%',

    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnText: {
    fontFamily: 'GothamLight',
    fontSize: 18,
    color: '#fdf963',
  },
  quantityBtn: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#481b74',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashMessage: {
    position: 'absolute',
    backgroundColor: '#6a349f',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch({type: 'ADD_TO_CART', payload: product}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddToCartScreen);
