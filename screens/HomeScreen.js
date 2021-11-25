import React, {useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';

export default HomeScreen = () => {
  const { signOut } = useContext(AuthContext);
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
      <View>
        <Text>HomeScreen</Text>
        <Text>Signed in!</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
      <View>
        <FlatList
        data={ids}
        renderItem={renderItem}
        />
      </View>
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