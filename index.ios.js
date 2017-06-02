/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator,} from 'react-navigation';
import Video from 'react-native-video';
import React, { Component, PropTypes } from 'react';

import { NavigatorIOS,TouchableOpacity, Text, TouchableHighlight, View ,AppRegistry, Button, StyleSheet, AlertIOS,Platform} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  bigred: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  red: {
    color: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  nativeVideoControls: {
    top: 184,
    height: 300
  }
});



class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.bigred}>Welcome</Text>
          <Button
            onPress={() => navigate('Streaming')}
            title="Live Streaming"
            />

            <Button
              onPress={() => navigate('Navigation')}
              title="Navigation"
              />
    </View>
    );
  }
}






class StreamingScreen extends React.Component {
  static navigationOptions = {
    title: 'Live Streaming',
  };

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: true,
    paused: false,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
  };

  onLoad(data) {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  renderNativeSkin() {
    const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={{uri:"http://profficialsite.origin.mediaservices.windows.net/5ab94439-5804-4810-b220-1606ddcb8184/tears_of_steel_1080p-m3u8-aapl.ism/manifest(format=m3u8-aapl)"}}
            style={videoStyle}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            //onEnd={() => { /AlertIOS.alert('Done!') }}
            repeat={true}
            controls={this.state.controls}
          />
        </View>
      </View>
    );
  }

  render() {
    return this.renderNativeSkin();
  }
}





class NavigationScreen extends React.Component {
  static navigationOptions = {
    title: 'Navigation',
  };
  render() {
    return (
      <View style={{ position: 'relative', flex: 1}}>
       <MapView
         style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
         initialRegion={{
           latitude: 33.657603,
           longitude: 73.052833,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
         showsUserLocation={true}
       />
     </View>
    );
  }
}





const SampleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Streaming: { screen: StreamingScreen },
  Navigation: { screen: NavigationScreen },
});


AppRegistry.registerComponent('SampleApp', () => SampleApp);
