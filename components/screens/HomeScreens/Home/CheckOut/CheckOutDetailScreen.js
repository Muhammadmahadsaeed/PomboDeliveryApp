import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {userOrder} from '../../../../config/firebase';
import {setCurrentTime, setCurrentDate} from './DateTime';
import ModalView from './Modal';

import * as firebase from 'react-native-firebase';
class CheckOutDetailScreen extends Component {
  constructor() {
    super();
    this.modalRef = React.createRef();
    this.state = {
      user: '',
      totalAmount: 0,
      orders: '',
      onCheckOut: false,
      flashMessage: false,
      payment: false,
      token: null,
      isLoading: false,
      tips: [],
      setTipsBackgroundColor: '',
      setTips: 2.0,
    };
  }
  componentDidMount() {
    const tips = [];
    this.setState({user: this.props.user.user});
    console.log("===========",this.props.user.user);
    const orderDetail = this.props.navigation.getParam('orders');
    const totalAmount = this.props.navigation.getParam('totalAmount');

    this.setState({orders: orderDetail, totalAmount: totalAmount});
    firebase
      .firestore()
      .collection('tips')
      .get()
      .then((querySnap) => {
        querySnap.forEach((result) => {
          tips.push(result.data());
        });
        this.setState({tips: tips});
      });
  }
  doPayment = async () => {
    this.setState({isLoading: true});
    const payment = this.props.user.user.user;

    if (payment.paymentmethod) {
      const orders = this.state.orders;
      const newArray = [];
      for (let i = 0; i < orders.length; i++) {
        orders[i].status = 'order';
        orders[i].totalPrice = orders[i].price * orders[i].quantity;
        orders[i].userId = this.props.user.user.user.resId;
        orders[i].totalAverage = this.state.totalAmount;
        orders[i].date = setCurrentDate;
        orders[i].time = setCurrentTime;
        orders[i].deliveryTime = '16-20min';
        newArray.push(orders[i]);
      }
      try {
        const addOrder = await userOrder(
          newArray,
          this.props.user.user.user.resId,
        );
        if (addOrder) {
          this.setState({isLoading: false});
          this.setModalVisible();
          this.props.removeAllItem([]);
        } else {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({flashMessage: true, isLoading: false}, () => {
        setTimeout(() => this.closeFlashMessage(), 3000);
      });
    }
  };

  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  setModalVisible() {
    this.modalRef.show();
  }
  onLoadTotal() {
    var total = 0;

    total = (
      parseFloat(this.state.totalAmount) + parseFloat(this.state.setTips)
    ).toFixed(2);

    return total;
  }
  setTips(item) {
    this.setState({
      setTipsBackgroundColor: item,
      setTips: item.tips,
    });
  }
  render() {
    const user = this.props.user.user.user;

    return (
      <View style={styles.container}>
        <ScrollView style={{flexGrow: 0.8}}>
          <View style={{width: '95%', alignSelf: 'center'}}>
            <View>
              <Text style={styles.heading}>Delivery Details</Text>
              <View style={styles.notificationBox}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Address
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AddressScreen')
                  }
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={styles.description}>
                      {user.lastDeliveryAddress.address}
                    </Text>
                    <Text style={styles.description}>
                      {user.lastDeliveryAddress.streetName} #{' '}
                      {user.lastDeliveryAddress.streetNum},{' '}
                      {user.lastDeliveryAddress.Appartment},{' '}
                      {user.lastDeliveryAddress.ZipCode}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 35,
                      width: 35,
                      marginLeft: 5,
                      padding: 2,
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../../../assets/arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.notificationBox}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Drop-off
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('DropOffScreen')
                  }
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={styles.description}>Leave it at my door</Text>
                    <Text style={styles.description}>Add more detail</Text>
                  </View>

                  <View
                    style={{
                      height: 35,
                      width: 35,
                      marginLeft: 5,
                      padding: 2,
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../../../assets/arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.notificationBox}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Phone Number
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('PhoneScreen')}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.description}>{user.phone}</Text>

                  <View
                    style={{
                      height: 35,
                      width: 35,
                      marginLeft: 5,
                      padding: 2,
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../../../assets/arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text style={styles.heading}>Delivery Times</Text>
              <View style={styles.notificationBox}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    ASAP
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.description}>16-20mins</Text>
                </View>
              </View>
              <View style={styles.notificationBox}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Scheduled
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ScheduleScreen')
                  }
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.description}>Choose a time</Text>

                  <View
                    style={{
                      height: 35,
                      width: 35,
                      marginLeft: 5,
                      padding: 2,
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../../../assets/arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text style={styles.heading}>Tips</Text>

              <View style={styles.tipsBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Dasher Tips
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamBold',
                    }}>
                    $ {this.state.setTips}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <FlatList
                    data={this.state.tips}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => this.setTips(item)}
                        activeOpacity={0.8}
                        style={{
                          backgroundColor:
                            this.state.setTipsBackgroundColor === item
                              ? '#481b74'
                              : '#e9ba00',
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          marginRight: 20,
                        }}>
                        <Text
                          style={{color: 'white', fontFamily: 'GothamLight'}}>
                          $ {item.tips}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('DisherScreen')
                    }
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: 'black',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 50,
                      marginRight: 20,
                    }}>
                    <Text style={{color: 'white', fontFamily: 'GothamLight'}}>
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.heading}>Payment</Text>
              <View style={styles.notificationBox}>
                <View style={styles.addressView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'GothamLight',
                    }}>
                    Payment
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Payment', {
                      amount: this.state.totalAmount,
                    })
                  }
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  {user.paymentmethod ? (
                    <Text style={styles.description}>
                      {user.paymentmethod[0].card.brand}....
                      {user.paymentmethod[0].card.last4}
                    </Text>
                  ) : (
                    <Text style={styles.description}>
                      Choose your payment method
                    </Text>
                  )}
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      marginLeft: 5,
                      padding: 2,
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../../../assets/arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerAddToCartButton}>
            <LinearGradient
              style={styles.btn}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              {this.state.isLoading ? (
                <View style={{flex: 1, paddingVertical: 15}}>
                  <ActivityIndicator size="small" color="#fdf963" />
                </View>
              ) : (
                <TouchableOpacity
                  style={{flex: 1, paddingVertical: 15}}
                  activeOpacity={0.5}
                  onPress={() => this.doPayment()}
                  // onPress={this.handleCardPayPress}
                >
                  <Text style={styles.btnText}>Place Order</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.btnText}>$ {this.onLoadTotal()}</Text>
            </LinearGradient>
          </View>
        </View>
        <ModalView ref={(target) => (this.modalRef = target)} />
        {this.state.flashMessage ? (
          <View style={styles.flashMessage}>
            <Text style={{color: 'white', fontFamily: 'GothamLight'}}>
              Choose your payment method
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
    paddingVertical: 10,
  },
  heading: {
    fontFamily: 'GothamBold',
    fontSize: 20,
    marginBottom: 10,
    color: '#481b74',
  },
  notificationBox: {
    flex: 1,
    marginVertical: 1,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  tipsBox: {
    flex: 1,
    marginVertical: 1,
    borderRadius: 10,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  description: {
    color: 'black',
    fontFamily: 'GothamLight',
  },
  addressView: {
    flex: 1,
  },
  footer: {
    flex: 0.2,
    backgroundColor: '#e9ba00',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  flashMessage: {
    position: 'absolute',
    backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
const mapDispatchToProps = (dispatch) => ({
  removeAllItem: () => dispatch({type: 'REMOVE_ALL_CART'}),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckOutDetailScreen);
