<?php
error_reporting(E_ALL);
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
}
	?>