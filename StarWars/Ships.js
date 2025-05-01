import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Modal, Pressable, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Search from "./Search";
import Animated, { SlideInDown } from "react-native-reanimated";
import LoadImage from "./LoadImage";

export default function Ships({ navigation }) {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalText, setModalText] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (searchData) => {
    setData(searchData);
  };

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
          const response = await fetch('https://www.swapi.tech/api/starships?page=1&limit=inf&expanded=true');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setFullData(json.results);
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
    <LoadImage/>
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
        <Search fullData={fullData} onSearch={handleSearch}  searchMode={"name"} />
        <FlatList
        data={data}
        keyExtractor={({ uid }) => uid}
        renderItem={({ item }) => (
          <Animated.View entering={SlideInDown.duration(600).delay(100)}>
          <ScrollView style={styles.scrollView} {...scrollProps} onScroll={(e) => onScroll(e, item)}>
          <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.name}>{item.properties.name}</Text>
            <Text style={styles.text}>Model: {item.properties.model}</Text>
            <Text style={styles.text}>Class: {item.properties.starship_class}</Text>
            <Text style={styles.text}>Manufacturer: {item.properties.manufacturer}</Text>
            <Text style={styles.text}>Cost: {item.properties.cost_in_credits} credits</Text>
            <Text style={styles.text}>Length: {item.properties.length} meters</Text>
            <Text style={styles.text}>Crew required: {item.properties.crew}</Text>
            <Text style={styles.text}>Passenger capacity: {item.properties.passengers}</Text>
            <Text style={styles.text}>Max speed in atmosphere: {item.properties.max_atmosphering_speed} km/h</Text>
            <Text style={styles.text}>Hyperdrive rating: {item.properties.hyperdrive_rating}</Text>
            <Text style={styles.text}>MGLT per hour: {item.properties.MGLT}</Text>
            <Text style={styles.text}>Cargo capacity: {item.properties.cargo_capacity} kg</Text>
            <Text style={styles.text}>Max time without resupply: {item.properties.consumables}</Text>
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