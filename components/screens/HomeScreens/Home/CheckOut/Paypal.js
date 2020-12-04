import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default class PaypalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: true,amount:200};
  }

  showSpinner() {
    console.log('Show Spinner');
    this.setState({visible: true});
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({visible: false});
  }

  render() {
    return (
      <View
        style={this.state.visible === true ? styles.stylOld : styles.styleNew}>
        {this.state.visible ? (
          <ActivityIndicator
            color="#009688"
            size="large"
            style={styles.ActivityIndicatorStyle}
          />
        ) : null}

        <WebView
          injectedJavaScript={`document.getElementById('price').value = ${this.state.amount};document.f1.submit()`}
          style={styles.WebViewStyle}
          //Loading URL
          source={{uri: 'https://pombo-paypal.herokuapp.com/'}}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          //Want to show the view or not
          //startInLoadingState={true}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1,
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
