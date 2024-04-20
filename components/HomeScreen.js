import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, TextInput } from 'react-native';

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [numArticles, setNumArticles] = useState(10);

  const fetchArticles = async () => {
    try {
      const url = 'https://gnews.io/api/v4/top-headlines';
      const params = new URLSearchParams({
        token: '193eb0404f6b674b54449265f2705ca0',
        lang: 'en',
        country: 'us',
        max: numArticles,
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

      setArticles(articlesData);
    } catch (error) {
      setArticles("No Results Found");
      console.error('Error fetching articles:', error);
    }
  };

  const handleFetchButtonClick = () => {
    fetchArticles();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter number of articles"
          keyboardType="numeric"
          value={numArticles === null ? '' : numArticles.toString()}
          onChangeText={text => {
    const num = parseInt(text, 10);
    setNumArticles(isNaN(num) ? "" : num);
  }}
        />
        <Button title="Fetch Articles" onPress={handleFetchButtonClick} />
      </View>
      <FlatList
        data={articles}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    height: 40,
  },
  articleItem: {
    marginBottom: 16,
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
});


export default HomeScreen;
