<?php
//class DbConnect

class DbConnect{
	//variable to store database link
	private $con;
	
	//class constructor
	function __construct(){
		
	}
	//this method will connect to database
	function connect(){
		//including the constant.php file to get the database constant
		include_once dirname(__FILE__).'/Constant.php';
		
		//connecting to mysqldatabase
		$this->con = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
		//checking any error ouccurs while connecgting
		if(mysqli_connect_errno()){
	echo "Failed to connect mysql".mysqli_connect_error();
			}
		
			
			
			
			
			//finally returning the connection link 
		return $this->con;
	}
	
}
?>