import React, { useState, useEffect, useRef, Component } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Modal, Pressable, ScrollView, TouchableOpacity, Image } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import styles from "./styles";
import Search from "./Search";
import LoadImage from "./LoadImage";

export default function Films({navigation}) {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalText, setModalText] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRefs = useRef({});
  
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (searchData) => {
    setData(searchData);
  };

  function onScroll(e, item) {
        if (e.nativeEvent.contentOffset.x > 350) {
            navigation.navigate("Details", {item: item});
            scrollViewRefs.current[item.uid]?.scrollTo({ x: 0, y: 0, animated: true });
            
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
          const response = await fetch('https://www.swapi.tech/api/films?page=1&limit=inf&expanded=true');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setFullData(json.result);
          setData(json.result);
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
              <Search fullData={fullData} onSearch={handleSearch} searchMode={"title"} />
              <FlatList
              data={data}
              keyExtractor={({ uid }) => uid}
              renderItem={({ item }) => (
                <Animated.View entering={SlideInDown.duration(500).delay(100)}>
                <ScrollView style={styles.scrollView} ref={(ref) => { scrollViewRefs.current[item.uid] = ref; }} {...scrollProps} onScroll={(e) => onScroll(e, item)}>
                <TouchableOpacity>
                <View style={styles.item}>
                  <Text style={styles.name}>{item.properties.title}</Text>
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