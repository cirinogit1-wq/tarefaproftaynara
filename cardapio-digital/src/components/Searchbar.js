import { View, StyleSheet, TextInput } from "react-native";
// uma barra de pesquisa simples com TextInput, placeHolder para usar na tela de produtos
const Searchbar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por nome ou ID..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 36,
    width: "98%",
    left: 4,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#222",
    fontSize: 16,
    height: 32,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
});

export default Searchbar;
