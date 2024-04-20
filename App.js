import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen'; 

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Latest News !!</Text>
      <SearchScreen />
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 28,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
