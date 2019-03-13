<?
$user=$_SERVER['eppn'];
file_put_conents("users/$user", $_POST);
?>
