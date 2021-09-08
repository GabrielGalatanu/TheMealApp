import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { enableScreens } from 'react-native-screens';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import mealsReducer from './store/reducers/meals';

import MealsNavigator from './navigation/MealsNavigator';

enableScreens();

const rootReducer = combineReducers({
 meals: mealsReducer
});
const store = createStore(rootReducer);

const App = () => {
  console.log('aloo');
  return (
    <Provider store={store}><MealsNavigator/></Provider>
  );
};

const styles = StyleSheet.create({
  textTest: {
    marginTop: 60,
    fontSize: 20,
    fontFamily: "BalsamiqSans-Bold",
  }
});

export default App;
