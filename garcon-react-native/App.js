import Expo, { AppLoading } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Root, Icon, FooterTab } from "native-base";
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import store from './src/store';

import Login from './src/screen/login';
import Registration from './src/screen/registration';

import Food from './src/screen/food';
import Drink from './src/screen/drink';
import Order from './src/screen/order';

import Colors from './src/constants/Colors';

const authNavigation = StackNavigator({
  Login: {screen: Login},
  Registration: {screen: Registration}
}, {headerMode: 'screen'});

const tabNavigation = TabNavigator({
  Food: {
    screen: Food,
    navigationOptions: {
      tabBarLabel:"Pietanze",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-pizza${focused ? '' : '-outline'}` : 'md-pizza'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  },
  Drink: {
    screen: Drink,
    navigationOptions: {
      tabBarLabel:"Bevande",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-beer${focused ? '' : '-outline'}` : 'md-beer'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  },
  Order: {
    screen: Order,
    navigationOptions: {
      tabBarLabel:"Ordini",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  }
  }, {
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.inactiveTintColor,
    },
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    headerMode: 'screen'
});

const Navigation = StackNavigator({
  authNavigation: {screen: authNavigation},
  tabNavigation: {screen: tabNavigation},
}, { headerMode: 'none' });


export default class App extends Component  {

  state = {
    isReady: false,
  };

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  async _cacheResourcesAsync() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root>
          <Navigation />
        </Root>
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
