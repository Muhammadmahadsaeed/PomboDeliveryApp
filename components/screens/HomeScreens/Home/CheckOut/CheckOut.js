import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import * as firebase from 'react-native-firebase';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      onCheckOut: false,
      totalItemPrice: 0,
      deliveryfee: 0,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
    firebase
      .firestore()
      .collection('deliveryfee')
      .get()
      .then((res) => {
        res.forEach((doc) => {
          this.setState({deliveryfee: parseFloat(doc.data().deliveryfees)});
        });
      });

    this.setState({data: this.props.user.cartItems});
  }

  setTimePassed() {
    this.setState({loading: false});
  }
  moveToMove() {
    console.log('==========');
    this.props.navigation.navigate('Drawer');
  }
  onChangeQual(i, type) {
    const dataCar = this.state.data;
    let cantd = dataCar[i].quantity;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;
      this.setState({data: dataCar});
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;
      this.setState({data: dataCar});
    } else if (type == false && cantd == 1) {
      this.setState({data: dataCar});
    }
  }
  onLoadTotal() {
    var total = 0;
    const cart = this.props.user.cartItems;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity;
    }
    return total;
  }
  onTotalAmount() {
   
    var onTotal = 0;
    const cart = this.props.user.cartItems;
    for (var i = 0; i < cart.length; i++) {
      onTotal = onTotal + cart[i].price * cart[i].quantity;

    }

    return (parseFloat(onTotal) + this.state.deliveryfee).toFixed(2); 
    
  }
  handlerLongClick(item, index) {
    
    Alert.alert(
      //title
      'Danger',
      //body
      'Are you sure want to remove it ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.removeItem(item);
          },
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  }

  addToCheckOut() {
    this.props.navigation.navigate('CheckOutDetailScreen', {
      totalAmount: this.onTotalAmount(),
      orders: this.state.data,
    });
  }

  render() {
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={['#481b74', '#6a349f', '#481b74']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.1}}>
        {!this.props.user.cartItems.length ? (
          <View style={styles.containerStyle}>
            <View style={styles.notificationImage}>
              <Image
                style={styles.imageIcon}
                source={require('../../../../../assets/basket.png')}
              />
            </View>
            <View style={styles.notificationText}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'GothamLight',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                You don't have any item in your cart
              </Text>
            </View>
            {this.state.loading && (
              <ActivityIndicator size="large" color="#e9ba00" />
            )}
            <LinearGradient
              style={{
                marginTop: 10,
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
                <TouchableWithoutFeedback
                  onPress={() => this.moveToMove()}
                  style={{backgroundColor: 'white'}}>
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
        ) : (
          <View style={{flex: 1}}>
            <ScrollView
              style={{flexGrow: 0.6}}
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="automatic">
              <Animated.View
                style={{marginHorizontal: 20, paddingVertical: 20}}>
                <View style={styles.itemDetialView}>
                  <View>
                    <Image
                      source={require('../../../../../assets/ShopYellow.png')}
                      style={{height: 30, width: 30}}
                    />
                  </View>
                  <View style={{marginLeft: 15}}>
                    <Text
                      style={{
                        fontFamily: 'GothamBold',
                        fontSize: 20,
                        color: '#fdf963',
                      }}>
                      Shopping Cart
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'GothamLight',
                        fontSize: 14,
                        color: '#fdf963',
                      }}>
                      Verify your quantity and click checkout
                    </Text>
                  </View>
                </View>
                {this.props.user.cartItems.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onLongPress={() => {
                        this.handlerLongClick(item, index);
                      }}
                      style={styles.notificationBox}
                      key={index.toString()}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={styles.icon}>
                          <Image
                            style={{
                              height: '100%',
                              width: '100%',
                              borderRadius: 5,
                            }}
                            source={{uri: item.img}}
                          />
                        </View>

                        <View
                          style={{
                            flex: 1,
                          }}>
                          <Text style={styles.name}>{item.pname}</Text>
                          <Text style={styles.description}>
                            ${item.price * item.quantity}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(index, true)}
                          style={styles.quantityBtn}
                          activeOpacity={0.5}>
                          <Text style={{fontSize: 20, color: 'white'}}>+</Text>
                        </TouchableOpacity>

                        <Text style={styles.price}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(index, false)}
                          style={styles.quantityBtn}
                          activeOpacity={0.5}>
                          <Text style={{fontSize: 20, color: 'white'}}>-</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </Animated.View>
            </ScrollView>
            <View style={styles.footer}>
              <View style={styles.footerQuantityView}>
                <View>
                  <Text style={styles.quantityText}>Subtotal</Text>
                </View>
                <View style={styles.addSub}>
                  <Text style={[styles.quantityText, {marginHorizontal: 10}]}>
                    ${this.onLoadTotal()}
                  </Text>
                </View>
              </View>
              <View style={styles.footerQuantityView}>
                <View>
                  <Text style={styles.quantityText}>Delivery Fee</Text>
                </View>
                <View style={styles.addSub}>
                  <Text style={[styles.quantityText, {marginHorizontal: 10}]}>
                    $ {this.state.deliveryfee}
                  </Text>
                </View>
              </View>
              <View style={styles.footerQuantityView}>
                <View>
                  <Text style={styles.quantityText}>Total</Text>
                </View>
                <View style={styles.addSub}>
                  <Text style={[styles.quantityText, {marginHorizontal: 10}]}>
                    ${this.onTotalAmount()}
                  </Text>
                </View>
              </View>
              <View style={styles.footerAddToCartButton}>
                <LinearGradient
                  style={styles.btn}
                  colors={['#481b74', '#6a349f', '#481b74']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 1}}>
                  {this.state.onCheckOut ? (
                    <View style={{flex: 1, paddingVertical: 15}}>
                      <ActivityIndicator size="small" color="#fdf963" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{flex: 1, paddingVertical: 15}}
                      activeOpacity={0.5}
                      onPress={() => this.addToCheckOut()}
                      // onPress={this.handleCardPayPress}
                    >
                      <Text style={styles.btnText}>Checkout</Text>
                    </TouchableOpacity>
                  )}
                  <Text style={styles.btnText}> ${this.onTotalAmount()}</Text>
                </LinearGradient>
              </View>
            </View>
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
  notificationBox: {
    borderBottomColor: '#e9ba00',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  name: {
    color: '#fdf963',
    fontSize: 20,
    fontFamily: 'GothamBold',
    marginLeft: 10,
  },
  description: {
    color: '#fdf963',
    fontSize: 14,
    fontFamily: 'GothamLight',
    marginLeft: 10,
  },
  price: {
    color: '#fdf963',
    fontSize: 16,
    fontFamily: 'GothamBold',
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
    marginBottom: 20,
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
  itemDetialView: {
    flexDirection: 'row',
  },

  footer: {
    flex: 0.4,
    backgroundColor: '#e9ba00',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footerQuantityView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityText: {
    fontFamily: 'GothamBold',
    fontSize: 16,
    color: 'white',
  },

  addSub: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerAddToCartButton: {
    marginTop: 15,
    width: '100%',
  },
  btn: {
    width: '100%',
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
    alignSelf: 'center',
  },
  quantityBtn: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#e9ba00',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
const mapDispatchToProps = (dispatch) => ({
  removeItem: (product) =>
    dispatch({type: 'REMOVE_FROM_CART', payload: product}),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
