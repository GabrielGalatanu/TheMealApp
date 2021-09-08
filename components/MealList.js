import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './mealItem';

const MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    const renderMealItem = itemData => {
      const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return (
          <MealItem
            item={itemData.item}
            test = {20}
            onSelectMeal={() => {
              props.navigation.navigate({
                routeName: 'MealDetail',
                params: {
                  mealId: itemData.item.id,
                  mealTitle: itemData.item.title,
                  isFav: isFavorite
                }
              });
            }}
          />
        );
      };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
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

export default MealList;
