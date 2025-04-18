import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Modal, Pressable, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Search from "./Search";
import Animated, { SlideInDown } from "react-native-reanimated";
import LoadImage from "./LoadImage";

export default function Planets({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalText, setModalText] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  function onScroll(e, item) {
        if (e.nativeEvent.contentOffset.x > 250) {
            setModalText(item.properties.name);
            setData(data.filter((dataItem) => dataItem !== item));
            setModalVisible(true);
        }
    }

  const scrollProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    scrollEventThrottle: 10,
    onScroll,
  };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://www.swapi.tech/api/planets?page=1&limit=inf&expanded=true');
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
        <LoadImage />
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText} >{modalText}</Text>
            <Pressable
            style={styles.modalButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.text}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
        <Search />
        <FlatList
        data={data}
        keyExtractor={({ uid }) => uid}
        renderItem={({ item }) => (
          <Animated.View entering={SlideInDown.duration(600).delay(100)}>
          <ScrollView {...scrollProps} onScroll={(e) => onScroll(e, item)}>
          <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.name}>{item.properties.name}</Text>
            <Text style={styles.text}>Population: {item.properties.population}</Text>
            <Text style={styles.text}>Climate: {item.properties.climate}</Text>
            <Text style={styles.text}>Terrain: {item.properties.terrain}</Text>
            <Text style={styles.text}>Surface water percentage: {item.properties.surface_water}</Text>
            <Text style={styles.text}>Diameter: {item.properties.diameter}</Text>
            <Text style={styles.text}>Rotation period: {item.properties.rotation_period} standard hours</Text>
            <Text style={styles.text}>Orbital period: {item.properties.orbital_period} standard days</Text>
            <Text style={styles.text}>Gravity: {item.properties.gravity}</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.blank} />
          </ScrollView>
          </Animated.View>
          )}
          />
      </View>
    );
  }