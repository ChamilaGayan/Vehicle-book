import React, {Component} from "react";
import { StyleSheet, TextInput, View, Alert,TouchableOpacity,Text,Image } from "react-native";
export default class StartScreen extends Component{
  constructor(props){
    super(props)
    this.state={
        
    } 
  }

  

   login_Function = () => {
    this.props.navigation.navigate('LoginScreen')
   }

  tpno_Function = () => {
    this.props.navigation.navigate('TPNO')
   }
   


render() {
  return(

    <View style={styles.MainContainer}>
    <Image source={require('../assets/car.png')} style={styles.img} />
    <Text style={{fontSize: 27, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Welcome!</Text>



<View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={this.Forgetpw_Function}>
          <Text style={styles.forgot}>Login or Get Started to Continue.</Text>
        </TouchableOpacity>
      </View>

<TouchableOpacity style={styles.button} onPress={this.login_Function}>
  <Text style={styles.text}>LOGIN</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={this.tpno_Function}>
  <Text style={styles.text}>GET STARTED</Text>
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
    width: 110,
    height: 110,
    marginBottom:5
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