import React, {useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import {Context} from '../data/Context';

export default HomeScreen = () => {
  const [profileData] = useContext(Context);
  const ids =profileData.profiles.filter(item => item.id);

  const renderItem = ({ item }) => (
    <Item id={item.id} />
  );

  const Item = ({ id }) => (
    <View style={styles.item}>
      <Text style={styles.id}>{id}</Text>
    </View>
  );

  return(
    <View>
      <Text>HomeScreen</Text>
      <FlatList
        data={ids}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  id: {
    fontSize: 32,
  },
});