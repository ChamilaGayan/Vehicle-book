<?php
 $HostName = "localhost";
 $DatabaseName = "rideshare";
 $HostUser = "root";
 $HostPass = "";
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 $Received_JSON = file_get_contents('php://input');
 $obj = json_decode($Received_JSON,true);

//  $Longitude = $obj['Longitude'];
//  $Latitude = $obj['Latitude'];
 $seat = $obj['seat'];
 $price = $obj['price'];
 $mobile = $obj['mobile'];
 $crntlocation = $obj['crntlocation'];
 $destination = $obj['destination'];

 $Sql_Query = "insert into tbl_sheet_offering (latitude,last_latitude,avai_sheet,amount,mobile_no) values ('$crntlocation','$destination','$seat','$price','$mobile')";
 
 
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