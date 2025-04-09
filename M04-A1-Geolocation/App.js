import React, { useState, useEffect } from 'react';
import { View, StatusBar } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import styles from "./styles";
import * as Location from 'expo-location';

StatusBar.setBarStyle("dark-content");
    
export default function app() {
  const [location, setLocation] = useState(null);
  const [permission, setPermission] = useState(null);
  
  useEffect(() => {
    async function getLocationPermission() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Best });
      setLocation(loc);
    }
    getLocationPermission();
  }, []);

  return (
  <View style={styles.container}>
    {permission === 'granted' && location && (
        <MapView
          style={styles.map}
          showPointsOfInterest={false}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
        <Marker
        title="McDonalds"
        description="fast food restaraunt"
        coordinate={{
          latitude: 40.438860,
          longitude: -84.978514,
        }}
        />
        </MapView>
        
      )}
      
  </View>
);
}