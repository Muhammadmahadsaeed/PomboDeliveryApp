import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

class ListView extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  addToCartScreen(item) {
    this.props.navigation.navigate('AddToCartScreen', {productDetail: item});
  }
  componentDidMount() {
    this.setState({data: this.props.userFavorite});
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
                  activeOpacity={0.8}
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
              <View style={styles.favoriteImg}>
                <Text style={styles.price}>${item.price}</Text>
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
  },
  notificationList: {
    paddingVertical: 5,
  },
  notificationBox: {
    width: '95%',
    paddingHorizontal: 10,
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
  favoriteImg: {
    justifyContent: 'flex-end',

    alignSelf: 'flex-end',
    height: 50,
    width: 50,
  },
  price: {
    fontFamily: 'GothamBold',
    fontSize: 16,
  },
});

export default ListView;
