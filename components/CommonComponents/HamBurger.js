import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

export default class HamBurger extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ marginLeft: 15}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} activeOpacity={0.7}>
          <Image
            source={require('../../assets/whitehumbar.png')}
            style={{height: 50, width: 35, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
