import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const url = 'https://gnews.io/api/v4/search';
      const params = new URLSearchParams({
        q: searchQuery,
        token: '193eb0404f6b674b54449265f2705ca0',
        lang: 'en',
        country: 'us',
        max: 10,
      });

      const response = await fetch(`${url}?${params}`);
      const responseData = await response.json();

      const articlesData = responseData.articles.map(article => ({
        id: article.id,
        title: article.title,
        description: article.description,
        source: article.source.name,
        date: article.publishedAt,
      }));

      setSearchResults(articlesData);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search by Title, Author, or Keywords:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter search query"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      {searchResults.length === 0 ? (
        <Text style={styles.noResultsText}>No Results Yet..</Text>
      ) : (
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.articleItem}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
            <Text style={styles.articleSource}>{item.source}</Text>
            <Text style={styles.articleDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  articleItem: {
    margin: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleDescription: {
    fontSize: 16,
  },
  articleSource: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  articleDate: {
    fontSize: 14,
    color: 'gray',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchScreen;
