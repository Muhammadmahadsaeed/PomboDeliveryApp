import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class Splash extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  }
  setTimePassed() {
    this.setState({loading: false});
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={['#481b74', '#6a349f', '#481b74']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.1}}>
        <View style={styles.centerImage}>
          <Image
            style={styles.logo}
            source={require('../../../assets/LOGOwithborder.png')}
          />
        </View>

        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#e9ba00" />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerImage: {
    borderRadius: 100,
    height:200,
    width:200
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode:'cover',
    borderRadius: 100,
   
  },

  loading: {
    marginTop: 50,
  },
});
