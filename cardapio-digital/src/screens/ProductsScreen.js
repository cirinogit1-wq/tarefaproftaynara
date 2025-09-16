// src/screens/ProductsScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Button,
} from "react-native";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
//importei a barra de pesquisa que criei em components/Searchbar.js
import Searchbar from "../components/Searchbar";

export default function ProductsScreen() {
  const { items, loading, error, reload } = useProducts();
  const [search, setSearch] = React.useState("");

  const filteredItems = items.filter((item) => {
    if (!search) return true;
    if (search.length < 1) return false;
    const searchLower = search.toLowerCase();
    return (
      item.name.toLowerCase().startsWith(searchLower) ||
      String(item.id) === search
    );
  });

  // Carregamento inicial
  if (loading && items.length === 0) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Carregando produtos...</Text>
      </SafeAreaView>
    );
  }

  // Erro inicial (sem dados)
  if (error && items.length === 0) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <Text style={[styles.infoText, { color: "red", textAlign: "center" }]}>
          {error}
        </Text>

        <View style={{ height: 12 }} />
        <Button title="Tentar novamente" onPress={reload} />

        <View style={{ height: 12 }} />
        <Text style={styles.hint}>
          Verifique o API_URL em{" "}
          <Text style={styles.code}>src/data/config.js</Text> e teste a rota{" "}
          <Text style={styles.code}>/products</Text> no navegador do
          emulador/celular.
        </Text>
      </SafeAreaView>
    );
  }

  // Lista de produtos
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>
        <Button title="Recarregar" onPress={reload} />
      </View>
      {/* coloquei a barra de pesquisa em uma nova View */}
      <View style={styles.searchBarWrapper}>
        <Searchbar value={search} onChange={setSearch} />
      </View>

      {!!error && items.length > 0 && (
        <View style={styles.bannerError}>
          <Text style={styles.bannerErrorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={
          items.length === 0 ? styles.listEmpty : styles.list
        }
        ListEmptyComponent={
          <View style={{ alignItems: "center", padding: 24 }}>
            <Text>Nenhum produto cadastrado.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
        style={styles.productList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f7f7f7",
    marginTop: -30,
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f7f7",
  },
  title: { fontSize: 22, fontWeight: "700" },
  searchBarWrapper: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: "#f7f7f7",
    zIndex: 2,
  },
  productList: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  list: { paddingBottom: 12, paddingTop: 0, paddingHorizontal: 0 },
  listEmpty: { flexGrow: 1, justifyContent: "center" },
  infoText: { marginTop: 10, fontSize: 14 },
  hint: { fontSize: 12, color: "#555", textAlign: "center" },
  code: { fontFamily: "monospace" },
  bannerError: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
  bannerErrorText: { color: "#b30000", fontSize: 12 },
});
