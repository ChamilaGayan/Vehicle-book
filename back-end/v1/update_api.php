<?php
 $HostName = "localhost";
 $DatabaseName = "rideshare";
 $HostUser = "root";
 $HostPass = "";
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 $Received_JSON = file_get_contents('php://input');
 $obj = json_decode($Received_JSON,true);

 $Longitude = $obj['Longitude'];
 $Latitude = $obj['Latitude'];
 $mobile = $obj['mobile'];

    $Sql_Query = "UPDATE tbl_sheet_offering SET longitude='$Longitude',latitude='$Latitude' WHERE mobile_no='$mobile'";
 
 
 if(mysqli_query($con,$Sql_Query)){
 
    $MSG = 'true';
    $json = json_encode($MSG);
    echo $json ;
 
 }
 else{
 
    $MSG = 'false';
    $json = json_encode($MSG);
    echo $json ;
 }
 

 

?>