import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
class ShopScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
    const userId = this.props.user.user.resId;
  
    let items = [];
    firebase
      .firestore()
      .collection('orders')
      .where('userId', '==', userId)
      .get()
      .then((success) => {
        success.forEach((res) => {
          items.push(res.data());
        });
        this.setState({data: items});
      })
      .catch((error) => {
        console.log('error');
      });
  }
  setTimePassed() {
    this.setState({loading: false});
  }
  render() {
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={['#481b74', '#6a349f', '#481b74']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.1}}>
        {!this.state.data.length ? (
          <View style={styles.containerStyle}>
            <View style={styles.notificationImage}>
              <Image
                style={styles.imageIcon}
                source={require('../../../../assets/ShoppingBig.png')}
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
                You don't have any order yet
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
              <TouchableOpacity
                style={styles.notificationbutton}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'GothamBold',
                    fontSize: 18,
                  }}>
                  Shop now
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <FlatList
            style={styles.notificationList}
            enableEmptySections={true}
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
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
                        source={{uri: item.img}}
                      />
                    </View>

                    <View>
                      <Text style={styles.name}>{item.pname}</Text>
                      <Text style={styles.description}>QTY: {item.quantity}</Text>
                    </View>
                  </View>
                  <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                  <Text style={styles.price}> ${item.price}</Text>
                    <Text style={styles.price}>{item.status.toUpperCase()}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
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
    marginBottom: 60,

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
  notificationList: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  notificationBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#e9ba00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
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
    fontSize: 16,
    fontFamily: 'GothamBold',
    color: 'white',
    
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(ShopScreen);
