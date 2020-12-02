import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
// Import Map and Marker
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 18.7934829;
const LONGITUDE = 98.9867401;

class LocationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      Address: null,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({error: error.message}),
      {
        // enableHighAccuracy: true,
        timeout: 20000,
        // maximumAge: 1000,
        // distanceFilter: 10
      },
    );
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{...StyleSheet.absoluteFillObject}}
            region={this.getMapRegion()}>
            <Marker coordinate={this.getMapRegion()} />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default LocationScreen;
