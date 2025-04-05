import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function Films() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.results);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

if (loading) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

if (error) {
  return (
    <View style={styles.container}>
      <Text>Error: {error.message}</Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={({ title }) => title}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.text}>episode {item.episode_id}</Text>
            <Text style={styles.text}>directed by {item.director}</Text>
            <Text style={styles.text}>Producer(s): {item.producer}</Text>
            <Text style={styles.text}>release date: {item.release_date}</Text>
            <Text style={styles.text}>opening crawl: {"\n" + item.opening_crawl}</Text>
          </View>
        )}
      />
    </View>
  );
}