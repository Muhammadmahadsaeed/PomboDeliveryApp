import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

class PaymentModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
    };
  }
  showPaymentModal = () => {
    this.setState({modalVisible: true});
  };
  closePaymentModal = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const {modalVisible} = this.state;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={this.close}>
        <TouchableOpacity
          onPress={this.close}
          activeOpacity={1}
          style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic">
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View style={styles.profileIcon}>
                    <Image
                      style={styles.img}
                      source={require('../../../../assets/User.png')}
                    />
                  </View>
                  <View>
                    <Text style={styles.profileText}>Payment Settings</Text>
                  </View>
                </View>
                <KeyboardAvoidingView enabled>
                  <View style={styles.textField}>
                    <TextInput
                      style={styles.textFieldStyle}
                      placeholder="Number"
                      keyboardType="numeric"
                      placeholderTextColor="#6a349f"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.textField}>
                    <TextInput
                      style={styles.textFieldStyle}
                      placeholder="Exp Date"
                      placeholderTextColor="#6a349f"
                      returnKeyType="next"
                    />
                  </View>

                  <View style={styles.textField}>
                    <TextInput
                      style={styles.textFieldStyle}
                      placeholder="CVC"
                      keyboardType="numeric"
                      placeholderTextColor="#6a349f"
                      returnKeyType="next"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginVertical: 20,
                    }}>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={this.closePaymentModal}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.saveBtn}
                      onPress={this.closePaymentModal}>
                      <Text style={styles.textStyle}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  profileIcon: {
    height: 35,
    width: 35,
  },
  profileText: {
    fontFamily: 'GothamLight',
    fontSize: 16,
  },

  textField: {
    height: 40,
    width: '100%',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 5,
  },
  textFieldStyle: {
    fontSize: 12,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    width: '100%',
  },
  cancelBtn: {
    padding: 10,
  },
  saveBtn: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  textStyle: {
    fontFamily: 'GothamLight',
  },
});

export default PaymentModal;
