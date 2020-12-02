import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

class ShopButton extends Component {
  constructor() {
    super();
    this.state = {
      numOfItems: 0,
    };
  }
 
  render() {
  
    return (
      <View style={{marginRight: 15, width: 40}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => this.props.navigationProps.navigate('ShopScreen')}
          activeOpacity={0.8}>
          <View style={{height: 35, width: 35}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../assets/ShopYellow.png')}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 50,
              width: 20,
              height: 20,
              marginLeft: 20,
            }}>
            <Text>{this.props.cartItems.cartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state,
  };
};

export default connect(mapStateToProps, null)(ShopButton);
