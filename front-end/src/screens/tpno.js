import React, {Component} from "react";
import { StyleSheet, TextInput, View, Alert,TouchableOpacity,Text,Image } from "react-native";
export default class TPNO extends Component{
  constructor(props){
    super(props)
    this.state={
        mobile: ''
    }  
  }

  verify_Function = () => {

    var mobile_no=this.state.mobile;

    //mobileno validation
    if(mobile_no.length==0)
    {
      alert("Mobile number can't be empty.")
    }
    else if(mobile_no.length!=10)
      {
        alert("Wrong mibile mumber")
      }
      
    //api
    else
    {
       fetch('http://192.168.1.130/goto/v1/Api.php?apicall=otp', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       mobile_no: this.state.mobile, 
     })

    }).then((response) => response.json())
    .then((responseJson) => {
      //Showing response message comming from server after inserting records
      if(responseJson=='true')
      { 
      
        this.props.navigation.navigate('OTP' , {tpno: mobile_no})
      }

      else{
        Alert.alert('Please Try Again!');
      }


    }).catch((error) => {
      console.error(error);
    });



     

      
    } 

   }

   Login_Function = () => {
    this.props.navigation.navigate('LoginScreen')
   }



render() {
  return(

    <View style={styles.MainContainer}>
      <Image source={require('../assets/mobile.png')} style={styles.img} />
    <Text style={{fontSize: 22, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Enter Your Mobile Number</Text>
    <TextInput
    placeholder="Enter Mobile Number"
    onChangeText={data => this.setState({mobile:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    keyboardType="numeric"
    />
<TouchableOpacity style={styles.button} onPress={this.verify_Function}>
  <Text style={styles.text}>Submit</Text>
</TouchableOpacity>

<View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={this.Login_Function}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

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

button: {
  width: '80%',
  paddingTop: 2,
  paddingBottom: 2,
  backgroundColor: '#0099ff',
  borderRadius: 3,
  marginTop: 20,
},
text: {
  color: '#fff',
  fontSize: 20,
  textAlign: 'center',
  padding: 5
},

link: {
  fontWeight: 'bold',
  color: '#0099ff',
  alignSelf: 'flex-end'
},

row: {
  flexDirection: 'row',
  marginTop: 15,
},

  img: {
    width: 90,
    height: 90,
    marginBottom:20
  
  }

});