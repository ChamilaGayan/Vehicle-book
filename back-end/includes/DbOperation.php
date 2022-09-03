<?php
class DbOperation{
	// Database connection Link
	private $con;
	
	//class Constructor
	
	function __construct(){
		//Getting the DbConnection.php file
		require_once dirname(__FILE__).'/DbConnect.php';
		//Creating a DbConnect Object to connect to database
		$db = new DbConnect();
		//Initializing our connection link of this class
        //by calling the method connect of DbConnect class
		$this->con=$db->connect();
	}
	/*
 * The create operation
 * When this method is called a new record is created in the database
 */
 function createCabUser($phone,$otp){
	 $stmt=$this->con->prepare("INSERT INTO tbl_login(mobile_no,OTP) VALUES(?,?)");
	 $stmt->bind_param("ss",$phone,$otp);
	 if($stmt->execute())
		 return true;
		 return false;
		 //return die('execute() failed: ' . htmlspecialchars($stmt->error));
 }
 //----------Get OTP for Verificatin-------------
 function getOTP($phone){
	 $stmt=$this->con->prepare("SELECT OTP FROM tbl_login WHERE mobile_no = ?");
	 $stmt->bind_param("s",$phone);
	 $stmt->execute();
	 $stmt->bind_result($otp);
	 
	 $heroes=array();
	 
	 while($stmt->fetch()){
		 //$hero=array();
		 $dbOTP=$otp;
		 //array_push($heroes,$hero);		 
	 }
	 return $dbOTP;
	 
 }
 //---------end of getting OTP------------------
 //---------update Verificatin--------------------
 function updateVerified($phone){
 $stmt = $this->con->prepare("UPDATE tbl_login SET verified = 1 WHERE mobile_no = ?");
 $stmt->bind_param("s",$phone);
 if($stmt->execute())
 return true; 
 return false;
 }
  //---------end of update Verificatin-------------
  
 //===============insert password==========================
 function updateCabUser($phone,$password,){
 $stmt = $this->con->prepare("UPDATE tbl_login SET password = ? WHERE mobile_no = ?");
 $stmt->bind_param("ss",$password,$phone);
 if($stmt->execute())
 return true; 
 return false; 
 }
 //===============End of insert password===================
 //===============Login====================================
 function login($phone,$password){
 $stmt = $this->con->prepare("SELECT * FROM tbl_login WHERE mobile_no = ? AND password = ?");
 $stmt->bind_param("ss",$phone, $password);
 
 $stmt->execute();
 
 $stmt->store_result();
 
 if($stmt->num_rows > 0){
	 $result=1;
 
 
 /*$stmt->bind_result($id, $mobileNo, $email, $fname);
 $user1 = array();
 while($stmt->fetch()){
 $user = array();
 $user['id']=$id;
 $user['mobileNo']=$mobileNo;
 $user['email']=$email;
 $user['fname']=$fname;*/
 
 //array_push($user1,$user);
 //}*/
 //return $user;
 }
 else{
	 $result=0;
 }
 return $result;
 }
 //================End of login============================
 /*
 * The read operation
 * When this method is called it is returning all the existing record of the database
 */
 function getHeroes(){
	 $stmt=$this->con->prepare("SELECT id,name,realname,rating,teamaffiliation FROM heroes");
	 $stmt->execute();
	 $stmt->bind_result($id,$name,$realname,$rating,$teamaffiliation);
	 
	 $heroes=array();
	 
	 while($stmt->fetch()){
		 $hero=array();
		 $hero['id']=$id;
		 $hero['name']=$name;
		 $hero['realname']=$realname;
		 $hero['rating']=$rating;
		 $hero['teamaffiliation']=$teamaffiliation;
		 
		 array_push($heroes,$hero);		 
	 }
	 return $heroes;
 }
 /*
 * The update operation
 * When this method is called the record with the given id is updated with the new given values
 */
 function updateHero($id, $name, $realname, $rating, $teamaffiliation){
 $stmt = $this->con->prepare("UPDATE heroes SET name = ?, realname = ?, rating = ?, teamaffiliation = ? WHERE id = ?");
 $stmt->bind_param("ssisi",$name, $realname, $rating, $teamaffiliation, $id);
 if($stmt->execute())
 return true; 
 return false; 
 }
 
 
 /*
 * The delete operation
 * When this method is called record is deleted for the given id 
 */
 function deleteHero($id){
 $stmt = $this->con->prepare("DELETE FROM heroes WHERE id = ? ");
 $stmt->bind_param("i", $id);
 if($stmt->execute())
 return true; 
 
 return false; 
 }
}
?>