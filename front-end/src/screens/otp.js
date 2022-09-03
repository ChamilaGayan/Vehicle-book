import React, {Component} from "react";
import { StyleSheet, SafeAreaView, TextInput, View, Alert,TouchableOpacity,Text,Image } from "react-native";
export default class OTP extends Component{
  constructor(props){
    super(props)
    this.state={
        otp: ''
        
    } 
  } 

  verify_Function = () => {

    var otp_no=this.state.otp;
    var mobile= this.props.route.params.tpno;
  
    //otp validation
  if(otp_no.length==0)
    {
      alert("OTP number can't be empty.")
    }

    //api
    else
    {

       fetch('http://192.168.1.130/goto/v1/Api.php?apicall=getOTP', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           otp_no: this.state.otp,
           mobile:this.props.route.params.tpno, 
          
         })
    
       }).then((response) => response.json())
         .then((responseJson) => {
           //Showing response message comming from server after inserting records
           //Alert.alert(JSON.stringify(responseJson));
           const myJSON=JSON.stringify(responseJson);
           let obj = JSON.parse(myJSON);
           var msg1;
           msg1=obj.Message;

           if(msg1=='verified'){
            this.props.navigation.navigate('RegisterScreen', {tp:  mobile})
           }else{
            Alert.alert('OTP Verification failed, Try again with correct OTP');
           }
       }).catch((error) => {
          console.error(error);
        });

      
    }
   }


   resendotp_Function = () => {
    
   }


 
render() {
  
  const {tpno} = this.props.route.params
  
  return(

<View style={styles.MainContainer}>

    <Image source={require('../assets/otp.png')} style={styles.img} />
    <Text style={{fontSize: 25, color: "#0099ff",textAlign: 'center', marginBottom: 15}}>OTP</Text>
    <SafeAreaView> 
      <View >
        <Text onChangeText={data => this.setState({tpno:data})} style={{textAlign: 'center', color: 'green' , fontSize:17 , paddingBottom:20}}>
          Mobile Number - {JSON.stringify(tpno)}

        </Text>
      </View>
    </SafeAreaView>
    <TextInput
    placeholder="Enter OTP Number"
    onChangeText={data => this.setState({otp:data})}
    underlineColorAndroid='transparent'
    style={styles.TextInputStyleClass}
    keyboardType="numeric"
    />
<TouchableOpacity style={styles.button} onPress={this.verify_Function}>
  <Text style={styles.text}>Verify</Text>
</TouchableOpacity>

<View style={styles.row}>
        <Text>Didn't Receive OTP? </Text>
        <TouchableOpacity onPress={this.resendotp_Function}>
          <Text style={styles.link}>Resend OTP</Text>
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
  
  }
});