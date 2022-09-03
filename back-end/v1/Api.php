<?php
//getting the dboperation class
require_once '../includes/DbOperation.php';
require_once('../sms/ESMSWS.php');
require_once('../sms/pass.php');
require_once '../includes/DbConnect.php';
//Constants for our API
  //echo $smsuser;
 //sendOtp(123,710553989,$smsuser,$smspwd);
 
 //*****************This function will send the otp******************* 
 function sendOtp($otp, $EmpMobile,$smsuser,$smspwd){
 //This is the sms text that will be sent via sms 
 $sms_content = "Welcome to Simplified Coding: Your verification code is $otp";
 
 //Encoding the text in url format
 $sms_text = urlencode($sms_content);
 $session=createSession('',$smsuser,$smspwd,'');
 $responseOtp =  sendMessages($session,'GA MATALE',$sms_content,array($EmpMobile),0);
 closeSession($session);
 
 //Returning the response 
 return $responseOtp;
 }
//*******************End of sending OTP**********************************
//--------function validating all the parameters available---------------

function isTheseParametersAvailable($params){
	//asuming all parameters available
	$available=true;
	$missimgparam="";
	foreach($params as $param){
		if(!isset ($_REQUEST[$param])|| strlen($_REQUEST[$param])<=0){
			$available=false;
			$missimgparam=$missimgparam . ", " . $param;
		}
	}
	
//if parameters are missing
if(!$available){
	$response=array();
	$response['error']=true;
	$response['message']='Parameters ' . substr($missingparams,1,strlen($missimgparam)).' missing';

//Displaying error
echo json_encode($response);

//Stopping further execution
die();
}
}
//------------End of function validation parameters-----------------------
//an array to display response

$response=array();

//=======================if it is an api call=============================== 
 //that means a get parameter named api call is set in the URL 
 //and with this parameter we are concluding that it is an api call

if(isset($_GET['apicall'])){
	
	switch($_GET['apicall']){
 //the CREATE operation
 //****************Create cabuser**************************
 case 'otp':
 //first check the parameters required for this request are available or not 
 //isTheseParametersAvailable(array('phone'));
 $Received_JSON = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($Received_JSON,true);
  // Populate User name from JSON $obj array and store into $user_name variable.
 $phone= $obj['mobile_no'];
 
 //Generating a 6 Digits OTP or verification code 
 $otp = rand(100000, 999999);
 $db= new DbOperation();
 $result = $db->createCabUser($phone,$otp);
 if($result){
//printing the response given by sendOtp function by passing the otp and phone number 
 sendOtp($otp,$phone,$smsuser,$smspwd);
//  $response['error'] = false; 
//  $response['Message'] = 'success';
 $response = 'true';

   $json = json_encode($response);
 //$response='success';
  }else{
	$response = 'false';

	$json = json_encode($response);
 }
 
 break;
 
 //****************End of Create cabuser**************************
 /*
 ------------------OTP Validation start-----------------------------
  */
  case 'getOTP':
 // isTheseParametersAvailable(array('phone'));
 $Received_JSON = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($Received_JSON,true);
 
 // Populate User name from JSON $obj array and store into $user_name variable.
 $phone= $obj['mobile'];
 $otp = $obj['otp_no'];
  
 $db = new DbOperation();
 $result = $db->getOTP($phone);
 
 $realOTP=$result;
 
 if ($otp == $realOTP){
	 $result = $db->updateVerified($phone);
	 if($result){

	$response['error'] = false; 
	$response['Message'] = 'verified';
	}else{
	$response['error'] = true; 
	$response['Message'] = 'Your otp Not Valid';
	}
 }
 
 break; 
  
  //=================End of OTP validation==========================
  //******************PASSWORD insert********************************
   case 'updatePWD':
  //isTheseParametersAvailable(array('phone','password','name','email'));
 $Received_JSON = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($Received_JSON,true);
 
 // Populate User name from JSON $obj array and store into $user_name variable.
 $phone= $obj['user_mobile'];
 $pwd = $obj['user_password'];

 $password = md5($pwd);
  
 $db = new DbOperation();
 $result = $db->updateCabUser($phone,$password);
 
  if($result){
	 
	$response = 'true';

	$json = json_encode($response);
	}else{
		$response = 'false';

		$json = json_encode($response);
	//$response=$result;
	}
 
 
 break; 
  //******************End of PASSWORD insert**************************
 //===================Login===========================================
 case 'login':
 
 //isTheseParametersAvailable(array('phone', 'password'));
  $Received_JSON = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($Received_JSON,true);
 
 // Populate User name from JSON $obj array and store into $user_name variable.
 $phone= $obj['mobile_no'];
 $pwd = $obj['user_password'];
 
 
 
 $username = $phone;
 $password = md5($pwd); 
 //$username = '0710553989';
 //$password = md5(12345);
 
 $db = new DbOperation();
 $result = $db->login($username,$password);
 
 if($result==1){

	$HostName = "localhost";
	$DatabaseName = "rideshare";
	$HostUser = "root";
	$HostPass = "";
	$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	
	$Sql_Query = "SELECT * FROM tbl_user WHERE mobile_no='$phone'";
	
   $sql= mysqli_query($con,$Sql_Query);
   $num=mysqli_fetch_array($sql);
   
   if($num>0)
   {
   
	$response = 'a';

	$json = json_encode($response);
	}
   
	else{
		$response = 'b';

		$json = json_encode($response);
	}
   
	mysqli_close($con);

   
 }else{ 

	$response = 'false';

	$json = json_encode($response);

 }
 
 break; 
//====================End of Login==================================== 
 //the READ operation
 //if the call is getheroes
 case 'getheroes':
 $db = new DbOperation();
 $response['error'] = false; 
 $response['message'] = 'Request successfully completed';
 $response['heroes'] = $db->getHeroes();
 break; 
 
 
 //the UPDATE operation
 case 'updatehero':
 isTheseParametersAvailable(array('id','name','realname','rating','teamaffiliation'));
 $db = new DbOperation();
 $result = $db->updateHero(
 $_POST['id'],
 $_POST['name'],
 $_POST['realname'],
 $_POST['rating'],
 $_POST['teamaffiliation']
 );
 
 if($result){
 $response['error'] = false; 
 $response['message'] = 'Hero updated successfully';
 $response['heroes'] = $db->getHeroes();
 }else{
 $response['error'] = true; 
 $response['message'] = 'Some error occurred please try again';
 }
 break; 
 
 //the delete operation
 case 'deletehero':
 
 //for the delete operation we are getting a GET parameter from the url having the id of the record to be deleted
 if(isset($_GET['id'])){
 $db = new DbOperation();
 if($db->deleteHero($_GET['id'])){
 $response['error'] = false; 
 $response['message'] = 'Hero deleted successfully';
 $response['heroes'] = $db->getHeroes();
 }else{
 $response['error'] = true; 
 $response['message'] = 'Some error occurred please try again';
 }
 }else{
 $response['error'] = true; 
 $response['message'] = 'Nothing to delete, provide an id please';
 }
 break; 
 }
 
 }else{
 //if it is not api call 
 //pushing appropriate values to response array 
 $response['error'] = true; 
 $response['message'] = 'Invalid API Call';
	}
	//displaying the response in json structure 
 echo json_encode($response);

 
 
?>
