import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class StoreInfoModal extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };
  }
  openDialScreen(number) {
    if (Platform.OS === 'ios') {
      number = `telprompt:${number}`;
    } else {
      number = `tel:${number}`;
    }
    Linking.openURL(number);
  }
  goToLocation() {
    console.log('locationn');
  }
  show = () => {
    this.setState({show: true});
  };
  close = () => {
    this.setState({show: false});
  };
  render() {
    const StoreDetail = this.props.store;
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.show}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: '100%',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: '95%',
              paddingVertical: 50,
              height: '100%',
              alignSelf: 'center',
            }}>
            <View style={styles.heading}>
              <View style={styles.headingText}>
                <Text style={styles.head}>{StoreDetail.store_name}</Text>
               
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={this.close}>
                <Image
                  source={require('../../../../../assets/wrong.png')}
                  style={styles.closeButtonImage}
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={[styles.DirectionView, {marginTop: 10}]}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'GothamLight',
                      fontSize: 16,
                      color: '#481b74',
                    }}>
                    {StoreDetail.address}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => this.goToLocation()}>
                  <Image
                    source={require('../../../../../assets/locationfill.png')}
                    style={{height: 50, width: 50}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.DirectionView}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'GothamLight',
                      fontSize: 16,
                      color: '#481b74',
                    }}>
                    {StoreDetail.num}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.openDialScreen(StoreDetail.num)}>
                  <Image
                    source={require('../../../../../assets/call.png')}
                    style={{height: 50, width: 50}}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  headingText: {
    justifyContent: 'center',
  },
  closeButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonImage: {
    height: '100%',
    width: '100%',
  },
  head: {
    fontFamily: 'GothamBold',
    fontSize: 22,
    color: '#481b74',
  },
  para: {
    fontFamily: 'GothamLight',
    fontSize: 15,
    color: '#6a349f',
  },
  DirectionView: {
    backgroundColor: '#e9ba00',
    paddingVertical: 20,
    paddingHorizontal: 5,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
