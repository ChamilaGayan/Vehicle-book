<?php
 $HostName = "localhost";
 $DatabaseName = "rideshare";
 $HostUser = "root";
 $HostPass = "";
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $Received_JSON = file_get_contents('php://input');
 $obj = json_decode($Received_JSON,true);

 $mobile = $obj['mobile'];


$us = $con->query("SELECT * from tbl_user  WHERE mobile_no = '$mobile' ");
if($us !== false && $us->num_rows > 0){
while($row=$us->fetch_assoc()){
$user_name=$row["user_name"]; 

$Response[]=array("user_name"=>$user_name);
echo $json = json_encode($Response);

} 
}


mysqli_close($con);
?>