//This is an example code to make a Star Rating Bar //
import React, {Component} from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
//import all the components we are going to use.

export default class Rating extends Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 2,
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
    };
    //Filled Star. You can also give the path from local
    this.Star =
      'https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/star-512.png';

    //Empty Star. You can also give the path from local
    this.Star_With_Border =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  UpdateRating(key) {
    this.setState({Default_Rating: key});
    //Keeping the Rating Selected in state
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    // for (var i = 1; i <= this.state.Max_Rating; i++) {
    //   React_Native_Rating_Bar.push(
    // <TouchableOpacity
    //   activeOpacity={0.7}
    //   key={i}
    //   onPress={this.UpdateRating.bind(this, i)}>
    //   <Image
    //     style={styles.StarImage}
    //     source={
    //       i <= this.state.Default_Rating
    //         ? {uri: this.Star}
    //         : {uri: this.Star_With_Border}
    //     }
    //   />
    // </TouchableOpacity>,
    //   );
    // }
    return (
      <View style={styles.childView}>
        <Image
          style={styles.StarImage}
          source={require('../../assets/Stars/Blck_fill.png')}
        />
        <Image
          style={styles.StarImage}
          source={require('../../assets/Stars/Blck_fill.png')}
        />
        <Image
          style={styles.StarImage}
          source={require('../../assets/Stars/Blck_fill.png')}
        />
         <Image
          style={styles.StarImage}
          source={require('../../assets/Stars/Blck_fill.png')}
        />
        <Image
          style={styles.StarImage}
          source={require('../../assets/Stars/Blck_fill.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  childView: {
    marginTop: 10,
    flexDirection: 'row',
    
  },
  StarImage: {
    marginRight:5,
    width: 15,
    height: 15,
    resizeMode: 'cover',
  },
});
