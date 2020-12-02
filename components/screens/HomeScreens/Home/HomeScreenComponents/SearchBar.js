import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isPanel: false,
    };
  }
  togglePanel() {
    console.log(this.props);
    this.props.navigation.navigate('SearchScreen', {
      transition: 'bottomTransition',
    });
  }
  render() {
    return (
      <View style={[styles.SectionStyle]}>
        <TouchableOpacity
          onPress={() => this.togglePanel()}
          style={{
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
              marginLeft: 45,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'GothamLight',
              }}>
              Search for markets or products
            </Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.touchableButton]}>
          <TouchableOpacity
            style={{
              height: 35,
              width: 70,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#c4c5c6',
              borderRadius: 5,
            }}
            activeOpacity={0.8}
            onPress={() => {
              this.setPasswordVisibale();
            }}>
            <Text
              style={{
                fontSize: 12,
                paddingRight: 5,
                fontFamily: 'GothamLight',
              }}>
              Filter
            </Text>
            <Image
              source={require('../../../../../assets/hamburger.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //input fields
  SectionStyle: {
    flexDirection: 'row',
    height: 55,
    width: '95%',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#c4c5c6',
    justifyContent: 'center',
    alignSelf: 'center',
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
    height: '50%',
    width: '30%',
  },

  touchableButton: {
    position: 'absolute',
    right: 10,
    height: 55,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
