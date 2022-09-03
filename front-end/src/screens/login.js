import React, {Component} from "react";
import { StyleSheet, TextInput, View, Alert,TouchableOpacity,Text,Image } from "react-native";
export default class LoginScreen extends Component{
  constructor(props){
    super(props)
    this.state={
        mobile: '', 
        password: ''
    } 
  }

  login_Function = () => {
    var mobile_no=this.state.mobile;
    var Password=this.state.password;

    //mobile validation
    if(mobile_no.length==0)
    {
      alert("Mobile number can't be empty.")
    }
    else if(mobile_no.length!=10)
    {
      alert("Wrong mibile mumber")
    }

    //password validation
    else if(Password.length==0)
    {
      alert("Password can't be empty.")
    }

    //api
    else 
    {
      fetch('http://192.168.1.130/goto/v1/Api.php?apicall=login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_no: this.state.mobile,
        user_password: this.state.password 
      })
  
    }).then((response) => response.json())
      .then((responseJson) => {
        //Showing response message comming from server after inserting records
        if(responseJson=='a')
        {
        
        this.props.navigation.navigate('Dashboard' , {tpno: mobile_no})
        }

 
        else if(responseJson=='b')
        {
        this.props.navigation.navigate('Profile' , {tpno: mobile_no})
        
        }


        else{
          Alert.alert('Mobile Number or Password Incorrect!');
        }


      }).catch((error) => {
        console.error(error);
      });
      
    }

   }

   registration_Function = () => {
    this.props.navigation.navigate('TPNO')
   }

   Forgetpw_Function = () => {
    this.props.navigation.navigate('ForgotPw')
   }
   


render() {
  return(

    <View style={styles.MainContainer}>
    <Image source={require('../assets/logo.png')} style={styles.img} />
    <Text style={{fontSize: 27, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Login</Text>
    <TextInput
    placeholder="Enter Mobile Number"
    onChangeText={data => this.setState({mobile:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    keyboardType="numeric"
    />
<TextInput
    placeholder="Enter User Password"
    onChangeText={data => this.setState({password:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    secureTextEntry={true}
    />

<View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={this.Forgetpw_Function}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

<TouchableOpacity style={styles.button} onPress={this.login_Function}>
  <Text style={styles.text}>Login</Text>
</TouchableOpacity>

 <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={this.registration_Function}>
          <Text style={styles.link}>Sign up</Text>
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
    marginTop: 14,
  },

  img: {
    width: 90,
    height: 90,
    marginBottom:20
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 1,
  },
  forgot: {
    fontSize: 14,
    color: 'black',
  },

});