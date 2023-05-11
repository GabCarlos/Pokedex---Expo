import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from "react-native";

//Chamando as APIs:
const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=150&offset=0";
const firstGemPokemonPath = `${pokePath}${pokeQuery}`; 

//Ligando os IDS dos pokemons --> 150 pokemons com a API
export default function App(){
  const [firstGemPokemons, setfirtsGemPokemons] = useState([]);

//Trazendo detalhes sobre eles:
const [PokemonDetails, setPokemonDetails] = useState([])

//Continuação da função de ligar os IDS dos pokemons juntamente com os seus detalhes:
  useEffect( () => {
    const fecthFirtsGenPokemons = async () => {
      const pokemonsIdsResponse = await fetch(firstGemPokemonPath);
      const pokemonsIdsBody = await pokemonsIdsResponse.json()
      const PokemonDetails = await Promise.all(
       pokemonsIdsBody.results.map(async (p) =>{
        const poketails = await fetch(p.url);
        console.log(p.url)
         return poketails.json()
     }
    )
   ); 
    setPokemonDetails(PokemonDetails);
    };

    fecthFirtsGenPokemons(); 
  }, []);  

//Renderização das imagens dos pokemons:
  const renderItem = ({item}) => {
   return(
    <View>
     <Text style={styles.pokemonName}>{item.name}</Text>
      <Image style={{ width: 200, height: 200}}
       source={{uri: item.sprites.front_default,}}/>
   </View> 
   );
  };

//Adicionando o estado para armazenar o pokemon selecionado:
const [selectedPokemon, setSelectedPokemon] = useState(null);

// Adicionando uma função para lidar com o clique no pokemon:
const handlePokemonPress = (pokemon) => {
  setSelectedPokemon(pokemon);
};

// Atualizando a função renderPokemon para exibir os detalhes do pokemon selecionado
const renderPokemon = ({item}) => {
  const isSelected = selectedPokemon && selectedPokemon.name === item.name;

  return (
    <View style={styles.pokemonContainer}>
      <TouchableOpacity onPress={() => handlePokemonPress(item)}>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: item.sprites.front_default}}
        />
      </TouchableOpacity>

      {isSelected && (
        <View style={styles.pokemonDetails}>
          <Text>Height: {item.height}</Text>
          <Text>Weight: {item.weight}</Text>
          <Text>Type: {item.types[0].type.name}</Text>
        </View>
      )}
    </View>
  );
};


// Paremetros base:
  return(
    <View style={styles.container}>
      <FlatList data= {PokemonDetails} renderItem={renderPokemon}/>
      <StatusBar style="auto"/> 
    </View>
  );
console.log(renderPokemon);
  };  
// Estilização:
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  pokemonContainer: {
    display: 'flex',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pokemonName: {
    display: 'flex',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    top: 100,
    left: 180
  },
  pokemonDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});