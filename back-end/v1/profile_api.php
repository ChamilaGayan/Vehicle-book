<?php
 $HostName = "localhost";
 $DatabaseName = "rideshare";
 $HostUser = "root";
 $HostPass = "";
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $Received_JSON = file_get_contents('php://input');
 $obj = json_decode($Received_JSON,true);
 
 $user_name = $obj['user_name'];
 $user_nic = $obj['user_nic'];
 $user_city = $obj['user_city'];
 $user_address = $obj['user_address'];
 $mobile = $obj['mobile'];

 $Sql_Query = "insert into tbl_user (user_name,nic,address,city,mobile_no) values ('$user_name','$user_nic','$user_address','$user_city','$mobile')";
 
 
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
 mysqli_close($con);
?>