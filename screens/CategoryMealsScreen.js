
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import { useSelector } from 'react-redux';

import {CATEGORIES} from '../data/dummy-data';

import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
  

  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0,
  );

  return (
    <MealList 
    listData = {displayedMeals}
    navigation={props.navigation}
    />
  );
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default CategoryMealsScreen;
