import React, { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { useRoute } from '@react-navigation/native';
const App = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...'); 
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const seat = ["1 Seat", "2 Seat", "3 Seat", "4 Seat"];
  const [selectedItem, setSeat] = useState('');
  const [price, setPrice] = useState('');
  const route = useRoute();
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('Your Current Location');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
        
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
    );
  };
  

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('Your Current Location');
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message); 
      },
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
  };


  const submit = () => {

  //selec validation
  if(selectedItem.length==0)
  {
    alert("Please Select Awailable Seats.")
  }

    //price validation
   else if(price.length==0)
    {
      alert("Price can't be empty.")
    }
 
      else{
        fetch('http://192.168.1.130/goto/v1/offering_api.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Longitude:currentLongitude,
            Latitude:currentLatitude,
            seat:selectedItem,
            price:price,
            mobile:route.params.tpno,
           
          })
      
        }).then((response) => response.json())
        .then((responseJson) => {
          //Showing response message comming from server after inserting records
          if(responseJson=='true')
          {
            Alert.alert('Succsess!');
          // this.props.navigation.navigate('Offering')
          }
    
          else{
            Alert.alert('Try Again......');
          }
    
    
        }).catch((error) => {
          console.error(error);
        });
      }
 
  };  


//----------------update function------------------------

const update = () => {

  fetch('http://192.168.1.130/goto/v1/update_api.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Longitude:currentLongitude,
      Latitude:currentLatitude,
      mobile:route.params.tpno,


    })

  });
  console.log(currentLongitude);
  console.log(currentLatitude);
}


useEffect(() => {
  const interval = setTimeout(() => {
    // setSeconds(seconds => seconds + 1);
    update();
    getOneTimeLocation();
  }, 1000);
  return () => clearInterval(interval);
}, [currentLongitude,currentLatitude]);

//---------------------------------------------------------

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>

        <Image source={require('../assets/s2.png')} style={styles.img} />
    <Text style={{fontSize: 27, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Seat Offering</Text>
    <Text style={{fontSize: 13, color: "black",textAlign: 'center', marginBottom: 2}}>Select Awailable Seats</Text>
         
  <SelectDropdown
	data={seat}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
    setSeat(selectedItem);
    
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>

<TextInput
    placeholder="Price - Rs."

    data={price}
    onChangeText={(price) => {
		console.log(price)
    setPrice(price);
	}}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    keyboardType="numeric"
    />

          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 0,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>

          <View style={{marginTop: 10}}>

          <TouchableOpacity
          onPress={getOneTimeLocation}>
          <Text style={styles.refresh}>Refresh Location</Text>
        </TouchableOpacity>

          </View>

          <View style={{ marginTop: 20 }}>

        <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.text}>Offer Seat</Text>
        </TouchableOpacity>
          </View>

        </View>
      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 20,
    color: 'red',
    marginVertical: 16,
  },
  img: {
    width: 110,
    height: 110,
    marginBottom:5
  },
  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    marginTop:15,
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#0099ff',
    borderBottomEndRadius: 5
  
  },
  refresh: {
    fontSize: 14,
    color: 'green',
    marginBottom:10,
  },

  button: {
    width: '100%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#0099ff',
    borderRadius: 3,
    marginTop: 20,
    marginBottom:20
  },

  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  },  

});

export default App;
