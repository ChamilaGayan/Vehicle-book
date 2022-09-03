import React, {Component} from "react";
import * as ImagePicker from "react-native-image-picker";
import { StyleSheet, Button, Image, TextInput, View, Alert,TouchableOpacity,Text, ToastAndroid, Platform } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import RadioForm, {
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';



export default class Vehicle extends Component{
  
  handleChoosePhoto = () => {
    const option = {};
    ImagePicker.launchImageLibrary(option, response => {
    console.log ("response", response);
    });
  };

  constructor(props){
    super(props)
    this.state={
      vehicle_no: '', 
      facilities:'',
      vehicle_type: '',
      total_seats: '',
      insurance: '',
      img: ''
    }
    const {tpno} = this.props.route.params
  };
     

  Save_Function = () => {

    var vehi_no=this.state.vehicle_no;
    var facilitie=this.state.facilities;
    var vehi_type=this.state.vehicle_type;
    var no_of_seats=this.state.total_seats;
    var insurances=this.state.insurance;
    var mobile= this.props.route.params.tpno;
  

    // vehicle type validation
   if(vehi_type.length==0)
  {
    alert("Please select vehicle type.")
  }

   // vehicle no validation
  else if(vehi_no.length==0)
  {
    
    alert("Vehicle number can't be empty.")
  }


// seats validation
else if(no_of_seats.length==0)
{

  alert("Please enter the total seats of your vehicle.")
}

// facilities validation
else if(facilitie.length==0)
{
  
  alert("Please select vehicle facilities.")
}

 // insurances validation
  else if(insurances.length==0)
  {
   alert("insurances can't be empty.")
  }

  else
  {

    fetch('http://192.168.1.130/goto/v1/vehicle.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({ 
        vehi_no:this.state.vehicle_no,
        facilitie:this.state.facilities,
        vehi_type:this.state.vehicle_type,
        no_of_seats:this.state.total_seats,
        insurances:this.state.insurance,
        mobile:this.props.route.params.tpno,

    })
  }).then((response) => response.json())
  .then((responseJson) => {
    //Showing response message comming from server after inserting records

    if(responseJson=='already')
    {
    
      Alert.alert('Vehicle infomations already exists.');
    }

    else if(responseJson=='true')
    {
    
      this.props.navigation.navigate('Dashboard' , {tpno: mobile})
      Alert.alert('Successfully Completed!.');
    }

    else{
      Alert.alert('Opps! Something went wrong.');
    }


  }).catch((error) => {
    console.error(error); 
  });

    
  }
   }

   
render() {
    var vehi_type = ["Car ", "Van", "Bus", "Three Wheel"];
    
    var facilities = [
      {label: "AC     ", value: "AC"},
      {label: "Non-AC ", value: "Non-AC"},
    ];
    
    
    var insurance = [
      {label: "Full     ", value: "Full"},
      {label: "Third Party ", value: "Third Party"},
    ];
  return(

    <View style={styles.MainContainer}>
      <Image source={require('../assets/car.png')} style={styles.img} />
    <Text style={{fontSize: 25, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Vehicle Info</Text>

    <Text style={styles.aa}>Select Vehicle Type</Text>
    <SelectDropdown
	data={vehi_type}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
       this.setState({vehicle_type:selectedItem})
        
    
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>


<TextInput
    placeholder="Enter Vehicle No."
    onChangeText={data => this.setState({vehicle_no:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    />

<TextInput
    placeholder="Enter Total Seats"
    onChangeText={data => this.setState({total_seats:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    />

<Text style={styles.aa}>Select Vehicle Facilities</Text>
<View style={styles.container}>
        <RadioForm
          radio_props={facilities}
          initial={2}
          onPress={(value) => {ToastAndroid.show(value.toString(this.setState({facilities:value})), ToastAndroid.SHORT)}}
          buttonSize={18}
          buttonOuterSize={18}
          selectedButtonColor={'#009966'}
          selectedLabelColor={'#009966'}
          labelStyle={{ fontSize: 16, }}
          disabled={false}
          formHorizontal={true}
          
        />
      </View>


      <Text style={styles.aa}>Select Vehicle Insurance Type</Text>
      <View style={styles.container}>
        <RadioForm
          radio_props={insurance}
          initial={2}
          onPress={(value) => {ToastAndroid.show(value.toString(this.setState({insurance:value})), ToastAndroid.SHORT)}}
          buttonSize={18}
          buttonOuterSize={18}
          selectedButtonColor={'#009966'}
          selectedLabelColor={'#009966'}
          labelStyle={{ fontSize: 16, }}
          disabled={false}
          formHorizontal={true}
        />
      </View>

    <TouchableOpacity style={styles.button2} onChangeText={data => this.setState({img:data})} onPress={this.handleChoosePhoto}>
  <Text style={styles.text}>Vehicle Photo</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={this.Save_Function}>
  <Text style={styles.text}>Save Profile</Text>
</TouchableOpacity>

    </View>
   
  );
}

}

const styles = StyleSheet.create({
  MainContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    margin:50
  },

TextInputStyleClass: {
  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  width: '80%',
  borderWidth: 1,
  borderColor: '#0099ff',
  borderBottomEndRadius: 5

},

img: {
  width: 90,
  height: 90,
  marginBottom:20
},

button: {
  width: '80%',
  paddingTop: 2,
  paddingBottom: 2,
  backgroundColor: '#0099ff',
  borderRadius: 3,
  marginTop: 15,
},
button2: {
  width: '45%',
  paddingTop: 2,
  paddingBottom: 2,
  backgroundColor: '#3366ff',
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 10,
},
text: {
  color: '#fff',
  fontSize: 18,
  textAlign: 'center',
  padding: 5
},
container: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: '#F5FCFF',
}



});