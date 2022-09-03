<?php
 $HostName = "localhost";
 $DatabaseName = "rideshare";
 $HostUser = "root";
 $HostPass = "";
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $Received_JSON = file_get_contents('php://input');
 $obj = json_decode($Received_JSON,true);

 $crntlocation = $obj['crntlocation'];
 $destination = $obj['destination'];




$us = $con->query("SELECT * from tbl_sheet_offering  WHERE latitude = '$crntlocation' AND last_latitude = '$destination' ");
if($us !== false && $us->num_rows > 0){
while($row=$us->fetch_assoc()){
$latitude=$row["latitude"]; 
$last_latitude=$row["last_latitude"]; 

$Response[]=array("latitude"=>$latitude,"last_latitude"=>$last_latitude);
echo $json = json_encode($Response);

} 
}


mysqli_close($con);
?>