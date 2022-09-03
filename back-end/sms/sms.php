<?php 
include_once('ESMSWS.php');
include_once('pass.php');

$sms='message';
$phone='0776537606';
echo $smsuser;

////$st= serviceTest("","esmsusr_13tn","Wim@l#413","");
////print_r($st);
////$ali='GA Matale';
function sendsms($sms,$phone,$smsuser,$smspwd){
    $session=createSession('',$smsuser,$smspwd,'');
$sts=sendMessages($session,'GA MATALE',$sms,array($phone),0); // 1 for promotional messages, 0 for normal message
    print_r($sts);
closeSession($session);
}


sendsms($sms,$phone,$smsuser,$smspwd);
?>