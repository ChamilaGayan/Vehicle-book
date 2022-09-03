import React, {Component, useRef, useEffect} from "react";
import { StyleSheet, Animated, TextInput, Button, View, Alert,TouchableOpacity,Text,Image } from "react-native";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}


export default class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state={
        
    } 
    const {tpno} = this.props.route.params
  }

   

   logout_Function = () => {
    this.props.navigation.navigate('LoginScreen')
   }
 
   booking_Function = () => {

    var mobile= this.props.route.params.tpno;

    this.props.navigation.navigate('Booking' , {tpno: mobile})
   }

   offering_Function = () => {

    var mobile= this.props.route.params.tpno;
    
    this.props.navigation.navigate('Offering'  , {tpno: mobile})
   }

   vehicle_Function = () =>{

    var mobile= this.props.route.params.tpno;
    
    this.props.navigation.navigate('Vehicle'  , {tpno: mobile})

   }
   
render() {

  //Getting user Name
  fetch('http://192.168.1.130/goto/v1/get_user_details.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({ 
      mobile:this.props.route.params.tpno,
      user_name:this.state.user_name,

    })
  }).then((response) => response.json())
  .then((responseJson) => {
    //Showing response message comming from server after inserting records

    this.setState({user_name:responseJson[0].user_name});
    

  }).catch((error) => {
    console.error(error); 
  });
  
  return(

    <View style={styles.MainContainer}>
{/* View User Name */}
<FadeInView style={{alignSelf: 'flex-end', backgroundColor: 'lavender'}}>
<Text style={{ alignSelf: 'flex-end', textAlign: 'center', color: '#331100' , fontSize:17 , paddingBottom:1}}>
         Welcome! - {this.state.user_name}
        </Text>
        </FadeInView>

        <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end'}} onPress={this.logout_Function}>
  <Text style={{ color: '#0099ff' , fontSize:15}}>Logout</Text>
</TouchableOpacity>


<Image source={require('../assets/s2.png')} style={styles.img} />
    <Text style={{fontSize: 27, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>Seat Booking</Text>

  
<View>
<Text style={styles.forgot}>Select Seat Booking or Seat Offering to Continue.</Text></View>

<View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this.booking_Function}
            title="Seat Booking"
          />
          <Button
            onPress={this.offering_Function}
            title="Seat Offering"
            color="#841584"
          />
        </View>
        <Button
            onPress={this.vehicle_Function}
            title="Vehicle Info"
            color="#009966"
          />
        
       
          <Text style={styles.aa}>Update Your Vehicle Infomation</Text>
  
     

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView style={{width: 250, height: 70, backgroundColor: 'powderblue'}}>
        <Text style={{fontSize: 20, textAlign: 'center', margin: 10}}>We are Trying to Make Your Life Easier.</Text>
      </FadeInView>
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

  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent:'center',
    marginBottom:50,
    
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    paddingTop:4,
  },

  aa: {
    fontSize: 14,
    color: 'black',
    paddingTop:4,
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