import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Modal, Pressable } from "react-native";
import styles from "./styles";
import Animated, { SlideInUp } from "react-native-reanimated";

const Search = ({fullData, onSearch, searchMode}) => {
    const handleSubmitText = (e) => {
      if (searchMode == "name") {
        onSearch(fullData.filter((i) =>
  i.properties.name.toLowerCase().includes(e.nativeEvent.text.toLowerCase()) || e.nativeEvent.text.length === 0));
      } else if (searchMode == "title") {
        onSearch(fullData.filter((i) =>
  i.properties.title.toLowerCase().includes(e.nativeEvent.text.toLowerCase()) || e.nativeEvent.text.length === 0));
      }
    };

    return (
        <Animated.View entering={SlideInUp.duration(500)}>
            <TextInput 
            style={styles.textInput} 
            placeholder="Search" 
            returnKeyType="search"
            onSubmitEditing={ handleSubmitText }
            />
        </Animated.View>
    )
}

export default Search;