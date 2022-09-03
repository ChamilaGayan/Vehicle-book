import React, {Component} from "react";
import { StyleSheet, SafeAreaView, TextInput, View, Alert,TouchableOpacity,Text,Image } from "react-native";
export default class RegisterScreen extends Component{
  constructor(props){
    super(props)
    this.state={
      password: ''
    }
  }

registration_Function = () => {
 
  
  var Password=this.state.password;
  var mobile=this.props.route.params.tp;



  //password validation
  
  if(Password.length==0)
  {
    alert("Password can't be empty.")
  }
  else if(Password.length < 5 || Password.length>15)
  {
    alert("Password must be at least 5 characters and less than 15 characters.")
  }

  //api
  else 
  {
    fetch('http://192.168.1.130/goto/v1/Api.php?apicall=updatePWD', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_mobile: this.props.route.params.tp, 
        user_password: this.state.password,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      //Showing response message comming from server after inserting records
      if(responseJson=='true')
      {
        Alert.alert('Hi! Now You Can Login.');
        this.props.navigation.navigate('LoginScreen')
      }

      else{
        Alert.alert('Mobile Number or Password Incorrect!');
      }


    }).catch((error) => {
      console.error(error);
    });



  }

    
}

render() {
  const {tp} = this.props.route.params
  return(

    <View style={styles.MainContainer}>
    <Image source={require('../assets/logo.png')} style={styles.img} />
    <Text style={{fontSize: 25, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Register</Text>
    <SafeAreaView> 
      <View >
        <Text onChangeText={data => this.setState({tpno:data})} style={{textAlign: 'center', color: 'green' , fontSize:17 , paddingBottom:20}}>
          Mobile Number - {JSON.stringify(tp)}

        </Text>
      </View>
    </SafeAreaView>
    
<TextInput
    placeholder="Enter User Password"
    onChangeText={data => this.setState({password:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    secureTextEntry={true}
    />
<TouchableOpacity style={styles.button} onPress={this.registration_Function}>
  <Text style={styles.text}>Register</Text>
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

img: {
  width: 90,
  height: 90,
  marginBottom:20
}

});