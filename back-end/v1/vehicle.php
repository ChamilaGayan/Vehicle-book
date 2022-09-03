<?php
 $HostName = "localhost";
 $DatabaseName = "rideshare";
 $HostUser = "root";
 $HostPass = "";
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $Received_JSON = file_get_contents('php://input');
 $obj = json_decode($Received_JSON,true);
 
 $vehi_no = $obj['vehi_no'];
 $facilitie = $obj['facilitie'];
 $vehi_type = $obj['vehi_type'];
 $no_of_seats = $obj['no_of_seats'];
 $insurances = $obj['insurances'];
 $mobile = $obj['mobile'];




 $Sql_Query = "SELECT * FROM tbl_vehicle WHERE mobile_no='$mobile'";
	
 $sql= mysqli_query($con,$Sql_Query);
 $num=mysqli_fetch_array($sql);
 
 if($num>0)
 {
 
 $MSG = 'already';

 $json = json_encode($MSG);
 echo $json ;
 }
 
 else{
   $Sql_Query = "insert into tbl_vehicle (VehicleNo,AC,VehicleType,no_of_sheets,insurance,mobile_no) values ('$vehi_no','$facilitie','$vehi_type','$no_of_seats','$insurances','$mobile')";
 
 
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
 }
 mysqli_close($con);
?>