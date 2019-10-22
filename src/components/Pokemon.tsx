import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import styles from './PokemonStyles';
import { IPokemon } from '../types/IPokemon';
import { IType } from '../types/IType';

const Pokemon = ({pokemon}:{pokemon: IPokemon}) => {
  if (!pokemon) {
    return null
  }

  return (
    <View style={styles.mainDetails}>
      <Image
        source={{uri: pokemon.imageUrl}}
        style={styles.image} resizeMode={"contain"} />
        <Text style={styles.mainText}>{pokemon.name}</Text>

        <FlatList
          columnWrapperStyle={styles.types}
          data={pokemon.types}
          numColumns={2}
          keyExtractor={(type: IType) => type.id.toString()}
          renderItem={({item}) => {
            return (
              <View style={[styles[item.name], styles.type]}>
                <Text style={styles.typeText}>{item.name}</Text>
              </View>
            )
          }}
        />

        <View style={styles.description}>
          <Text>{pokemon.description}</Text>
        </View>
    </View>
  );
}



export default Pokemon;