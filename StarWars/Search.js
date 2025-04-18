import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Modal, Pressable } from "react-native";
import styles from "./styles";
import Animated, { SlideInUp } from "react-native-reanimated";

const Search = () => {
    const [searchText, setSearchText] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Animated.View entering={SlideInUp.duration(500)}>
            <TextInput 
            style={styles.textInput} 
            placeholder="Search" 
            returnKeyType="search"
            onSubmitEditing={(e) => {
                setSearchText(e.nativeEvent.text)
                setModalVisible(!modalVisible)
            }}
            />
            
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText} >{searchText}</Text>
                        <Pressable
                        style={styles.modalButton}
                        onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.text}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    )
}

export default Search;