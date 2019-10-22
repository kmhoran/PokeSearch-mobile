import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  Alert,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import styles from "./MainStyles";
import Pokemon from "./components/Pokemon";
import { IPokemon } from "./types/IPokemon";
import { searchPokemon } from "./services/pokeSearchApi";

interface IProps {}

interface IState {
  isLoading: boolean;
  searchInput: string;
  pokemon: IPokemon;
}

class App extends Component<IProps, IState> {
  state = {
    isLoading: false,
    searchInput: "",
    pokemon: null
  };

  componentDidMount() {
    this.search = this.search.bind(this);
  }

  search = async () => {
    Keyboard.dismiss();
    const searchText = (this.state.searchInput || "").toLowerCase();
    this.setState({ isLoading: true });
    const result = await searchPokemon(searchText);
    this.setState({ isLoading: false });
    if (!(result.success && result.data)) {
      this.setState({ pokemon: null });
      return;
    }
    this.setState({ pokemon: result.data, searchInput: "" });
  };

  render() {
    const { isLoading, searchInput, pokemon } = this.state;
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={searchInput => this.setState({ searchInput })}
                value={searchInput}
                placeholder={"Search Pokemon"}
                blurOnSubmit={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={this.search} title="Search" color="#0064e1" />
            </View>
          </View>

          <View style={styles.mainContainer}>
            {isLoading && <ActivityIndicator size="large" color="#0064e1" />}

            {!isLoading && pokemon == null ? (
              <Text>No Pokemon</Text>
            ) : (
              <Pokemon pokemon={pokemon as IPokemon} />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
