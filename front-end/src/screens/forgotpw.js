import React, {Component} from "react";
import { StyleSheet, TextInput, View, Alert,TouchableOpacity,Text,Image } from "react-native";
export default class ForgotPw extends Component{
  constructor(props){
    super(props)
    this.state={
        email: ''
    } 
  }

  verify_Function = () => {

    const re = /\S+@\S+\.\S+/
    var Email=this.state.email;

   //email validation
  if(Email.length==0)
  {
    alert("Email can't be empty.")
  }
  else if(!re.test(Email))
  {
    alert("Ooops! We need a valid email address.")
  }
      
    //api
    else
    {
      this.props.navigation.navigate('LoginScreen')
    }

   }

   Login_Function = () => {
    this.props.navigation.navigate('LoginScreen')
   }



render() {
  return(

    <View style={styles.MainContainer}>
      <Image source={require('../assets/key.png')} style={styles.img} />
    <Text style={{fontSize: 22, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Password Reset</Text>
    <TextInput
    placeholder="Enter User Email Address"
    onChangeText={data => this.setState({email:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    autoCapitalize="none"
    autoCompleteType="email"
    textContentType="emailAddress"
    eyboardType="email-address"
    
    />
    <Text style={styles.forgot}>You will receive email with</Text>
    <Text style={styles.forgot}>password reset link.</Text>
<TouchableOpacity style={styles.button} onPress={this.verify_Function}>
  <Text style={styles.text}>Send Instructions</Text>
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
  
  },
  forgot: {
    fontSize: 13,
    color: 'black',
  }

});