import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text,View, ImageBackground ,TouchableOpacity} from 'react-native';
import { Linking } from 'react-native';

import * as Location from 'expo-location';

import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'
const API_KEY ='a2cc0d387f965c31cdbd4dec452d7e75';
const img = require('./assets/background.png')
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.8110158", "0.5209333")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {

    // url api weather bona funcionant correctament
    //https://api.openweathermap.org/data/2.5/onecall?lat=40.8124900&lon=0.5216000&exclude=hourly,minutely&units=metric&appid=a2cc0d387f965c31cdbd4dec452d7e75

    //Comprovant d´aquesta manera si funciona tambe la app.
    //fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=40.8124900&lon=0.5216000&exclude=hourly,minutely&units=metric&appid=a2cc0d387f965c31cdbd4dec452d7e75`).then(res => res.json()).then(data => {

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      setData(data)
      })
    }
  
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image} >
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily}/>
        <Text style={styles.title}>Informacion Tiempo</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.weatherapi.com/weather/q/tortosa-catalonia-spain-724308')}>
</TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  },
  title: {
    flex:40, 
    fontSize: 30,
    color: '#98fa00',
 },
});

