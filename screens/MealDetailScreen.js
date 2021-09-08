import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';

import {useSelector, useDispatch} from 'react-redux';
import {toggleFavorite} from '../store/actions/meals';

import Meal from '../models/meal';

import Icon from 'react-native-vector-icons/Ionicons';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.detailText}>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId),
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    //props.navigation.setParams({mealTitle: selectedMeal.title});
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite});
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View>
        <View style={styles.details}>
          <Text style={styles.detailText}>{selectedMeal.duration}m</Text>
          <Text style={styles.detailText}>{selectedMeal.complexity}</Text>
          <Text style={styles.detailText}>{selectedMeal.affordability}</Text>
        </View>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  //const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  //const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorites"
          iconName= {isFavorite === true ? 'ios-star' : 'ios-star-outline'}
          onPress={() => {
            toggleFavorite();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealItem: {
    height: 200,
    width: '90%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginVertical: 10,
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealDetail: {
    height: '20%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'BalsamiqSans-Bold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  detailText: {
    fontFamily: 'BalsamiqSans-Regular',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
