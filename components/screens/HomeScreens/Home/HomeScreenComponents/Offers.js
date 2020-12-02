import React, {Component} from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import resturantApi from '../../../../api/resturants.json';
export default class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [
        {
          id: '1',
          name: 'Idli',
          isVegetarian: true,
          cuisine: 'South Indian',
          image:
            'https://res.cloudinary.com/sivadass/image/upload/v1534611354/dummy-products/food/idli.jpg',
          price: 'Rs 60',
          label: '4 pieces',
          rating: 4,
        },
        {
          id: '2',
          name: 'Dosa',
          isVegetarian: true,
          cuisine: 'South Indian',
          image:
            'https://res.cloudinary.com/sivadass/image/upload/v1534611353/dummy-products/food/dosa.jpg',
          price: 'Rs 75',
          label: '1 piece',
          rating: 5,
        },
        {
          id: '3',
          name: 'Puri',
          isVegetarian: true,
          cuisine: 'South Indian',
          image:
            'https://res.cloudinary.com/sivadass/image/upload/v1534611355/dummy-products/food/puri.jpg',
          price: 'Rs 45',
          label: '2 pieces',
          rating: 3,
        },
        {
          id: '4',
          name: 'Pongal',
          isVegetarian: true,
          cuisine: 'South Indian',
          image:
            'https://res.cloudinary.com/sivadass/image/upload/v1534611355/dummy-products/food/pongal.jpg',
          price: 'Rs 45',
          label: '1 plate',
          rating: 4,
        },
        {
          id: '5',
          name: 'Roti',
          isVegetarian: true,
          cuisine: 'North Indian',
          image:
            'https://res.cloudinary.com/sivadass/image/upload/v1534611356/dummy-products/food/roti.jpg',
          price: 'Rs 30',
          label: '2 pieces',
          rating: 5,
        },
      ],
    };
  }

  handleNaviagation() {
    this.props.navigation.navigate('ResturantDetail');
  }
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={4}
         
          loop={false} showsPagination={false}
          >
          {this.state.dataBanner.map((itembann, index) => {
            return (
              <View key={index} style={{justifyContent: 'center'}}>
                <Image
                  style={styles.imageBanner}
                  source={{uri: itembann.image}}
                />
                <View style={styles.cardText}>
                  {/* <Text
                    style={{
                      fontFamily: 'GothamBold',
                      fontSize: 15,
                      color: '#481b74',
                    }}>
                    {itembann.name}
                  </Text> */}
                  <LinearGradient
                    style={styles.button}
                    colors={['#481b74', '#6a349f', '#481b74']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}>
                    <TouchableOpacity
                      onPress={this.handleNaviagation.bind(this)}>
                      <Text style={styles.buttonText}>Discover it</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '95%',
    alignSelf: 'center',
  },
  imageBanner: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  cardText: {
    bottom:20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:5,
   
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'GothamLight',
  },
});
