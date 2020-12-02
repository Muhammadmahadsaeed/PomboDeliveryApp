import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class ListView extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  moveToProduct(store) {
    this.props.navigation.navigate('ShowAllProducts', {store: store});
  }
  componentDidMount() {
    this.setState({data: this.props.products});
  }
  render() {
    
    return (
      <View style={styles.container}>
        {this.state.data.map((item, index) => {
          return (
            <TouchableOpacity key={index.toString()}
              activeOpacity={0.7}
              onPress={() => this.moveToProduct(item)}
              style={styles.notificationBox}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.icon}>
                  <Image
                    style={{height: '100%', width: '100%', borderRadius: 5}}
                    source={{uri: item.image}}
                  />
                </View>

                <View>
                  <Text style={styles.name}>{item.store_name}</Text>
                  <Text style={styles.description}>{item.address}</Text>
                </View>
              </View>
             
            </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  notificationBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#e9ba00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal:10,
    marginVertical:10
  },
  icon: {
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 20,
    fontFamily: 'GothamBold',
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: 'GothamLight',
    marginLeft: 10,
  },
  price: {
    fontSize: 20,
    fontFamily: 'GothamBold',
  },
});
