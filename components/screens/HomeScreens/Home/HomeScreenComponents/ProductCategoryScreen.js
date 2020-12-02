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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'react-native-firebase';
export default class ProductCategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      isHorizontal: true,
    };
  }

  clickEventListener(item, categoryId) {
    this.props.navigation.navigate('ProductCategoryDetailScreen', {
      categoryDetail: item,
      categoryId: categoryId,
    });
  }
  componentDidMount() {
    let items = [];
    firebase
      .firestore()
      .collection('categories')
      .get()
      .then((result) => {
        result.forEach((doc) => {
          items.push({data: doc.data(), categoryId: doc.id});
        });
        this.setState({data: items});
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.clickEventListener(item.data, item.categoryId);
              }}
              activeOpacity={0.9}>
              <LinearGradient
                style={styles.card}
                colors={['#481b74', '#6a349f', '#481b74']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 1}}>
                <View style={styles.cardImage}>
                  <Image
                    style={{height: '100%', width: '100%'}}
                    source={{uri: item.data.img}}
                  />
                </View>
                <View style={styles.cardFooter}>
                  <Text style={styles.count}>{item.data.category_name}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  list: {
    marginHorizontal: 10,
  },
  /******** card **************/
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    width: 110,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 25,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
  },

  cardImage: {
    height: 70,
    width: 70,
  },
  cardFooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    paddingTop: 5,
    fontSize: 15,
    fontFamily: 'GothamLight',
    color: 'white',
  },
});
