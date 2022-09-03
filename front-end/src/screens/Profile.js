import React, {Component} from "react";
import RadioButtonRN from 'radio-buttons-react-native';
import * as ImagePicker from "react-native-image-picker";
import { StyleSheet, Button, Image, TextInput, View, Alert,TouchableOpacity,Text } from "react-native";



export default class Profile extends Component{
  
  handleChoosePhoto = () => {
    const option = {};
    ImagePicker.launchImageLibrary(option, response => {
    console.log ("response", response);
    });
  };

  constructor(props){
    super(props)
    this.state={
      name: '', 
      nic:'',
      city: '',
      img: '',
      address: ''
    }
    const {tpno} = this.props.route.params
  };
     

  Save_Function = () => {

    var user_name=this.state.name;
    var user_nic=this.state.nic;
    var user_address=this.state.address;
    var user_city=this.state.city;
    var user_image=this.state.img;
    var mobile= this.props.route.params.tpno;
  

    // name validation
   if(user_name.length==0)
  {
    alert("Name can't be empty.")
  }

   // nic validation
   if(user_nic.length==0)
  {
    alert("NIC can't be empty.")
  }


// address validation
else if(user_address.length==0)
{
  alert("Address can't be empty.")
}

// city validation
else if(user_city.length==0)
{
  alert("City can't be empty.")
}

  // image validation
  // else if(user_image.length==0)
  // {
  //  alert("Image can't be empty.")
  // }

  else
  {

    fetch('http://192.168.1.130/goto/v1/profile_api.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({ 
      user_name:this.state.name,
      user_nic:this.state.nic,
      user_city:this.state.city,
      user_address:this.state.address,
      user_image:this.state.img,
      mobile:this.props.route.params.tpno,
    })
  }).then((response) => response.json())
  .then((responseJson) => {
    //Showing response message comming from server after inserting records
    if(responseJson=='true')
    {
    
      this.props.navigation.navigate('Dashboard' , {tpno: mobile})
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
  
  return(

    <View style={styles.MainContainer}>
      <Image source={require('../assets/logo.png')} style={styles.img} />
    <Text style={{fontSize: 25, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Profile</Text>

<TextInput
    placeholder="Enter User Name"
    onChangeText={data => this.setState({name:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    />

<TextInput
    placeholder="Enter User NIC"
    onChangeText={data => this.setState({nic:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    />

<TextInput
    placeholder="Enter Your Home Address"
    onChangeText={data => this.setState({address:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    />

<TextInput
    placeholder="Enter City"
    onChangeText={data => this.setState({city:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    
    />





    <TouchableOpacity style={styles.button2} onChangeText={data => this.setState({img:data})} onPress={this.handleChoosePhoto}>
  <Text style={styles.text}>Choose Photo</Text>
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
  borderRadius: 50,
  marginTop: 20,
  marginBottom: 10,
},
text: {
  color: '#fff',
  fontSize: 18,
  textAlign: 'center',
  padding: 5
}



});