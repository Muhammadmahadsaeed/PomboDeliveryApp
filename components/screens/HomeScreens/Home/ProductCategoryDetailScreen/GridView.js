import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class GridView extends React.Component {
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
      <FlatList scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
        nestedScrollEnabled
        data={this.props.products}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <LinearGradient
              style={styles.card}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.moveToProduct(item)}>
                <View style={styles.cardImage}>
                  <Image
                    style={styles.trendingIconImage}
                    source={{uri: item.image}}
                  />
                </View>

                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.store_name}</Text>
                  <Text style={styles.para}>{item.address}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          );
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'white',
    marginBottom: 15,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginTop: 20,
    width: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 10,
  },

  cardImage: {
    height: 130,
    width: '100%',
    padding: 10,
  },
  trendingIconImage: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'GothamBold',
    flex: 1,
    color: 'white',
  },
  para: {
    fontSize: 15,
    fontFamily: 'GothamLight',
    flex: 1,
    color: 'white',
  },
});
