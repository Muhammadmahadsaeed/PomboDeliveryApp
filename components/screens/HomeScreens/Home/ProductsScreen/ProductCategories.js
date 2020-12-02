import React from 'react';
import {
  View,
  Image,
  Picker,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'react-native-firebase';
export default class ProductCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      loading: true,
    };
  }
  componentDidMount() {
    const store = this.props.storeId;
    let category = [];
    firebase
      .firestore()
      .collection('subcategories')
      .where('storeId', '==', store)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          doc.data().categoryId = doc.id;
          category.push(doc.data());
        });
        this.setState({loading:false,category: category});
      });
  }
  clickEventListener(item) {
    this.props.navigation.navigate('CategoryDetailScreen', {category: item});
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#e9ba00" />
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            style={styles.list}
            showsHorizontalScrollIndicator={false}>
            {this.state.category.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}
                  activeOpacity={0.9}>
                  <LinearGradient
                    style={styles.card}
                    colors={['#481b74', '#6a349f', '#481b74']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}>
                    <View style={styles.cardImage}>
                      <Image
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'contain',
                        }}
                        source={{uri: item.img}}
                      />
                    </View>
                    <View style={styles.cardFooter}>
                      <Text style={styles.count}>{item.category_name}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  /******** card **************/
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    width: 110,
    paddingVertical: 10,
    paddingHorizontal: 5,
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
