import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'react-native-firebase';
var {height, width} = Dimensions.get('window');
export default class TopMarketCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    let stores = [];
    firebase
      .firestore()
      .collection('stores')
      .get()
      .then((result) => {
        result.forEach((doc) => {
          stores.push(doc.data());
        });
        this.setState({data: stores});
      });
  }
  goToItemDetail(item) {
    this.props.navigation.navigate('storedetail', {StoreDetail: item});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          style={{marginBottom: 20}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <LinearGradient
              style={styles.card}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.goToItemDetail(item)}>
                <View
                  style={{
                    height: 150,
                  }}>
                  <Image style={styles.cardImage} source={{uri: item.image}} />
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.cardText}>
                    <Text style={styles.cardHeading}>{item.store_name}</Text>
                    <Text style={styles.cardPara}>{item.address}</Text>
                  </View>
                  <View style={styles.cardButton}>
                    <View style={{marginRight: 5}}>
                      <Text
                        style={{
                          fontFamily: 'GothamLight',
                          fontSize: 18,
                          color: '#fdf963',
                        }}>
                        {item.rating}
                      </Text>
                    </View>
                    <View style={styles.cardButtonImg}>
                      <Image
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        source={require('../../../../../assets/Stars/Blck_fill.png')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },

  /******** card **************/
  card: {
    // height:220,
    padding: 10,
    width: 210,
    marginBottom: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  cardFooter: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardButtonImg: {
    height: 15,
    width: 15,
  },
  cardHeading: {
    fontFamily: 'GothamBold',
    fontSize: 22,
    color: 'white',
  },
  cardPara: {
    fontFamily: 'GothamLight',
    fontSize: 16,
    color: 'white',
  },
});
