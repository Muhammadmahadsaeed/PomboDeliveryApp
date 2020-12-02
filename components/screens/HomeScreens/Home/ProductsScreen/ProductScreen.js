import React from 'react';
import {
  View,
  Image,
  Picker,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import * as firebase from 'react-native-firebase';
import ProductCategory from './ProductCategories';
import ListView from './ListView';
export default class ProductScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      
    };
    this.onFlash = this.onFlash.bind(this)
  }
  componentDidMount() {
    const store = this.props.navigation.getParam('store');
    let items = [];
    firebase
      .firestore()
      .collection('products')
      .where('storeId', '==', store.uid)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          items.push(doc.data());
        });
        this.setState({data: items});
      });
  }
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
    const store = this.props.navigation.getParam('store');

    return (
      <View style={{flex:1}}>
        <ScrollView style={{backgroundColor: '#FFF'}}>
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
              >
                <Image
                  source={require('../../../../../assets/hamburger.png')}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
              marginBottom: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'GothamBold',
                color: '#481b74',
              }}>
              CATEGORIES
            </Text>
          </View>
          <ProductCategory storeId={store.uid} {...this.props} />
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'GothamBold',
                color: '#481b74',
              }}>
              PRODUCTS
            </Text>
          </View>
          <View style={{flex:1}}>

         
          <ListView
            storeId={store.uid}
            {...this.props}
            onFlash={this.onFlash}
          />
           </View>
        </ScrollView>
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
