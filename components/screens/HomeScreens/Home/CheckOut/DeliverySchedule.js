import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
class DeliverySchedule extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      time: '',
      isloading: false,
      isError: false,
      isTodayDatePickerVisible: false,
      isTomorrowDatePickerVisible: false,
      chosenTodayTime: '',
      todayTime: '',
      tomorrowTime: '',
      todayNextHour: '',
      tomorrowNextHour: '',
      chosenTomorrowTime: '',
      flashMessage: false,
      todayDate: '',
      tomorrowDate: ''
    };
  }
  componentDidMount() {
    let current_time = moment().format('hh:mm A');
    const tomorrow = moment().add(1, 'days').format('hh:mm A');
    const todayNextHour = moment().add(1, 'hours').format('hh:mm A');
    const tomorrowNextHour = moment()
      .add(1, 'days')
      .add(1, 'hours')
      .format('hh:mm A');

    this.setState({
      todayTime: current_time,
      tomorrowTime: tomorrow,
      todayNextHour: todayNextHour,
      tomorrowNextHour: tomorrowNextHour,
    });
  }
  showTodayDatePicker() {
    this.setState({isTodayDatePickerVisible: true});
  }
  hideTodayDatePicker() {
    this.setState({isTodayDatePickerVisible: false});
  }
  handleTodayConfirm = (date) => {
    this.setState({chosenTodayTime: moment(date).format('hh:mm A'),todayDate:moment(date).format('DD/MM/YYYY')});
    this.hideTodayDatePicker();
  };
  // tomorrow
  showTomorrowDatePicker() {
    this.setState({isTomorrowDatePickerVisible: true});
  }
  hideTomorrowDatePicker() {
    this.setState({isTomorrowDatePickerVisible: false});
  }

  handleTomorrowConfirm = (date) => {
  
    this.setState({chosenTomorrowTime: moment(date).format('hh:mm A'),tomorrowDate: moment(date).add(1, 'days').format('DD/MM/YYYY')});
    this.hideTomorrowDatePicker();
  };
  selectTime() {
   
    this.setState({isloading: true});
    const {chosenTodayTime, chosenTomorrowTime} = this.state;
    if (chosenTodayTime && chosenTomorrowTime) {
      this.setState(
        {
          flashMessage: true,
          chosenTodayTime: '',
          chosenTomorrowTime: '',
          isloading: false
        },
        () => {
          setTimeout(() => this.closeFlashMessage(), 3000);
        },
      );
    } else if (chosenTodayTime) {
      this.props.user.user.deliveryDate = this.state.todayDate
      this.props.user.user.deliveryTime = this.state.chosenTodayTime
      this.setState({isloading: false});
      this.props.navigation.navigate('CheckOutDetailScreen');
    } else {
      this.props.user.user.deliveryDate = this.state.tomorrowDate
      this.props.user.user.deliveryTime = this.state.chosenTomorrowTime
      this.setState({isloading: false});
      this.props.navigation.navigate('CheckOutDetailScreen');
    }
  }
  closeFlashMessage() {
    this.setState({
      flashMessage: false,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={styles.heading}>Schedule</Text>
            <Text style={styles.para}>
              Choose an available window for your delivery
            </Text>
            <View
              style={{
                marginVertical: 10,
                flex: 1,
                flexDirection: 'row',
                width: '95%',
                paddingVertical: 20,
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '48%'}}>
                <Text style={styles.label}>Today</Text>
              </View>
              <View
                style={{
                  width: '48%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{paddingVertical: 20}}
                  onPress={() => this.showTodayDatePicker()}
                  activeOpacity={0.8}>
                  <Text style={styles.label}>
                    {this.state.todayTime} - {this.state.todayNextHour}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                flex: 1,
                flexDirection: 'row',
                width: '95%',

                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '48%'}}>
                <Text style={styles.label}>Tomorrow</Text>
              </View>
              <View
                style={{
                  width: '48%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{paddingVertical: 20}}
                  onPress={() => this.showTomorrowDatePicker()}
                  activeOpacity={0.8}>
                  <Text style={styles.label}>
                    {this.state.tomorrowTime} - {this.state.tomorrowNextHour}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <LinearGradient
              style={[styles.buttonStyle]}
              colors={['#481b74', '#6a349f', '#481b74']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity
                onPress={() => this.selectTime()}
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.5}>
                {this.state.isloading ? (
                  <ActivityIndicator size="large" color="#e9ba00" />
                ) : (
                  <Text style={styles.buttonTextStyle}>Continue</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
            <DateTimePickerModal
              isVisible={this.state.isTodayDatePickerVisible}
              mode="time"
              onConfirm={this.handleTodayConfirm}
              onCancel={() => this.hideTodayDatePicker()}
            />
            <DateTimePickerModal
              isVisible={this.state.isTomorrowDatePickerVisible}
              mode="time"
              onConfirm={this.handleTomorrowConfirm}
              onCancel={() => this.hideTomorrowDatePicker()}
            />
          </View>
        </ScrollView>
        {this.state.flashMessage ? (
          <View style={styles.flashMessage}>
            <Text style={{color: 'white', fontFamily: 'GothamLight'}}>
              Please Choose only once
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontFamily: 'GothamBold',
    fontSize: 20,
    marginBottom: 10,
    color: '#481b74',
  },
  notificationBox: {
    flex: 1,
    marginVertical: 1,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  para: {
    color: 'gray',
    fontFamily: 'GothamLight',
    fontSize: 16,
  },
  description: {
    color: 'gray',
    fontFamily: 'GothamLight',
  },
  addressView: {
    flex: 1,
  },
  SectionStyle1: {
    flexDirection: 'row',
    height: 45,
    marginVertical: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c4c5c6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'GothamLight',
    fontSize: 15,
    color: '#481b74',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
    fontSize: 14,
    borderColor: 'gray',
    fontFamily: 'GothamLight',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'GothamBold',
  },
  flashMessage: {
    position: 'absolute',
    backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    bottom: 0,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
export default connect(mapStateToProps, null)(DeliverySchedule);
