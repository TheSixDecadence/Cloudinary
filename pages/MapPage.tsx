import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export default function MapPage() {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<LocationObject>(null as any);
    useEffect(() => {
        (async () => {
          let { status } = await requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          let location = await getCurrentPositionAsync({});
          setLocation(location);
          setLoading(false);
        })();
    },[]);

    if(loading){
        return <ActivityIndicator/>
    }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude, 
        latitudeDelta: 0.001, 
        longitudeDelta: 0.001}}>
            <Marker coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude}} image={require("../assets/favicon.png")}>
            </Marker>
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});