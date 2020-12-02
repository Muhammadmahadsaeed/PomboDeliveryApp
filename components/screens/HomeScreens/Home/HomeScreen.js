import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as HomeScreenComponent from './HomeScreenComponents/index';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.popupRef = React.createRef();
    this.bs = React.createRef();
    this.fall = new Animated.Value(1);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  }
  setTimePassed() {
    this.setState({loading: false});
  }
  renderInner = () => (
    <View style={styles.panel}>
      <TouchableOpacity style={styles.panelButton} activeOpacity={0.8}>
        <Text style={styles.panelButtonTitle}>Add new delivery address</Text>
        <View
          style={{
            height: 35,
            width: 35,
            marginLeft: 5,
            padding: 2,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../../../assets/arrow.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.panelButton, {marginBottom: 100}]}
        activeOpacity={0.8}>
        <Text style={styles.panelButtonTitle}>Current Location</Text>
        <View
          style={{
            height: 35,
            width: 35,
            marginLeft: 5,
            padding: 2,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../../../assets/arrow.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  onShowPopup = () => {
    this.popupRef.show();
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#e9ba00" />
          </View>
        ) : (
          <View>
            <ScrollView
              style={{backgroundColor: 'none'}}
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="automatic">
              <Animated.View
                style={{
                  opacity: Animated.add(0.5, Animated.multiply(this.fall, 1.0)),
                }}>
                <View style={[styles.SectionStyle]}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.onShowPopup}
                    style={{
                      flex: 1,
                      height: 55,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={[styles.touchableButtonLeft]}>
                      <Image
                        source={require('../../../../assets/searchIcon.png')}
                        style={styles.searchIconImage}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 40,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'GothamLight',
                          color: '#6a349f',
                        }}>
                        Search for markets or products
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <HomeScreenComponent.Offers {...this.props} />

                <View style={styles.topMarketView}>
                  <View style={styles.trendingIcon}>
                    <Image
                      style={styles.trendingIconImage}
                      source={require('../../../../assets/category2.png')}
                    />
                  </View>
                  <View
                    style={{marginLeft: 15, flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.topMarketViewText}>
                      Store Categories
                    </Text>
                  </View>
                </View>
                <HomeScreenComponent.ProductCategoryScreen {...this.props} />

                <View style={styles.topMarketView}>
                  <Text style={styles.topMarketViewText}>Stores</Text>
                </View>

                <HomeScreenComponent.TopMarketCards {...this.props} />

                <HomeScreenComponent.SwipePanel
                  {...this.props}
                  ref={(target) => (this.popupRef = target)}
                />
              </Animated.View>
            </ScrollView>

            {/* <BottomSheet
              ref={this.bs}
              snapPoints={[280, 0]}
              renderContent={this.renderInner}
              renderHeader={this.renderHeader}
              initialSnap={1}
              callbackNode={this.fall}
              enabledGestureInteraction={true}
            /> */}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMarketView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topMarketViewText: {
    fontFamily: 'GothamBold',
    fontSize: 22,
    color: '#481b74',
  },
  topMarketbuttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'GothamLight',
    fontSize: 16,
  },
  trendingIcon: {
    height: 30,
    width: 30,
  },
  trendingIconImage: {
    height: '100%',
    width: '100%',
  },
  para: {
    fontFamily: 'GothamLight',
    fontSize: 12,
    color: '#6a349f',
  },
  //input fields
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    width: '90%',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#481b74',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 25,
  },
  touchableButtonLeft: {
    position: 'absolute',
    left: 0,
    height: 55,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconImage: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
  buttonImage: {
    height: '100%',
    width: '100%',
  },

  touchableButton: {
    position: 'absolute',
    right: 10,
    height: 35,
    width: 35,

    justifyContent: 'center',
    alignItems: 'center',
  },

  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 80,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },

  panelButton: {
    padding: 13,
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontFamily: 'GothamBold',
    color: '#481b74',
  },
  linerColor: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(HomeScreen);
