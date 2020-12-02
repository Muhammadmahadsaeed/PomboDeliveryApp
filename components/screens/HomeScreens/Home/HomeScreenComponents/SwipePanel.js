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
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import * as firebase from 'react-native-firebase';

export default class SwipePanel extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
      data: [],
      isloading: false,
      result: '',
      text: '',
      activeFilter: 'products',
      activeSelection: 'products',
      storeId: null,
    };
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    const {activeFilter} = this.state;
    let items = [];
    firebase
      .firestore()
      .collection(activeFilter)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          doc.data().productId = doc.id;
          items.push(doc.data());
        });
        this.setState({data: items});
      });
  }
  search(event) {
    const text = event.nativeEvent.text;
    let items = [];
    firebase
      .firestore()
      .collection('products')
      .where('pname', '>=', text.toLowerCase())
      .where('pname', '<=', text.toLowerCase() + '\uf8ff')
      .get()
      .then((result) => {
        result.forEach((doc) => {
          doc.data().productId = doc.id;
          items.push(doc.data());
        });
        firebase
          .firestore()
          .collection('stores')
          .where('store_name', '>=', text.toLowerCase())
          .where('store_name', '<=', text.toLowerCase() + '\uf8ff')
          .get()
          .then((result) => {
            result.forEach((doc) => {
              items.push(doc.data());
            });
          
            this.setState({result: items, text});
          });
      });
  }
  show = () => {
    this.setState({show: true});
  };
  close = () => {
    this.setState({show: false});
  };
  addToCartScreen(item) {
    this.close();
    this.props.navigation.navigate('AddToCartScreen', {productDetail: item});
  }
  renderSelection(item) {
    const items = [];

    this.setState({activeSelection: item, activeFilter: item});
    if (item === 'products') {
      firebase
        .firestore()
        .collection('products')
        .get()
        .then((result) => {
          result.forEach((doc) => {
            doc.data().productId = doc.id;
            items.push(doc.data());
          });
          this.setState({data: items});
        });
    } else if (item === 'stores') {
      firebase
        .firestore()
        .collection('stores')
        .get()
        .then((result) => {
          result.forEach((doc) => {
            items.push(doc.data());
          });
          this.setState({data: items});
        });
    }
  }
  goToStore(item) {
    this.close();
    this.props.navigation.navigate('storedetail', {StoreDetail: item});
  }
  render() {
    const {data, result, text} = this.state;

    const arr = text.length ? result : data;
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.show}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: '100%',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: '95%',
              paddingTop: 50,
              paddingBottom: 5,
              height: '100%',
              alignSelf: 'center',
            }}>
            <View>
              <View style={styles.heading}>
                <View style={styles.headingText}>
                  <Text style={styles.head}>Search</Text>
                  <Text style={styles.para}>Ordered by Nearby first</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={this.close}>
                  <Image
                    source={require('../../../../../assets/wrong.png')}
                    style={styles.closeButtonImage}
                  />
                </TouchableOpacity>
              </View>

              <KeyboardAvoidingView enabled>
                <View style={[styles.SectionStyle]}>
                  <View style={[styles.touchableButtonLeft]}>
                    <Image
                      source={require('../../../../../assets/searchIcon.png')}
                      style={styles.buttonImage}
                    />
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Search for stores or products"
                    placeholderTextColor="#6a349f"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onChange={this.search}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>

            {!arr ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#e9ba00" />
              </View>
            ) : (
              <View style={{flex: 1}}>
                {this.state.activeSelection === 'products' ? (
                  <FlatList
                    data={arr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <View style={styles.notificationBox}>
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
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 5,
                                }}
                                source={{uri: item.img}}
                              />
                            </View>

                            <View style={{flex: 1}}>
                              <Text style={styles.name}>{item.pname}</Text>
                              <Text style={styles.description}>{item.des}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        {/* <View style={styles.favoriteImg}>
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
                        </View> */}
                      </View>
                    )}
                  />
                ) : (
                  <FlatList
                    data={arr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <View style={styles.notificationBox}>
                        <View style={{flex: 1}}>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            activeOpacity={0.7}
                            onPress={() => this.goToStore(item)}>
                            <View style={styles.icon}>
                              <Image
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 5,
                                }}
                                source={{uri: item.image}}
                              />
                            </View>

                            <View style={{flex: 1}}>
                              <Text style={styles.name}>{item.store_name}</Text>
                              <Text style={styles.description}>{item.des}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  headingText: {
    justifyContent: 'center',
  },
  closeButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonImage: {
    height: '100%',
    width: '100%',
  },
  head: {
    fontFamily: 'GothamBold',
    fontSize: 22,
    color: '#481b74',
  },
  para: {
    fontFamily: 'GothamLight',
    fontSize: 15,
    color: '#6a349f',
  },

  btnText: {
    fontFamily: 'GothamLight',
    fontSize: 16,
    color: 'white',
  },
  //input fields
  SectionStyle: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c4c5c6',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  touchableButtonLeft: {
    position: 'absolute',
    left: 0,
    height: 55,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    marginLeft: 50,
    paddingRight: 15,
    borderColor: 'gray',
    fontFamily: 'GothamBold',
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
