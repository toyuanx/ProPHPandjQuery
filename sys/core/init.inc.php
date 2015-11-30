<?php


	session_start();

	if(!isset($_SESSION['token'])){
		$_SESSION['token'] = sha1(uniqid(mt_rand(),TRUE));
	}
	
	include_once '../sys/config/db-cred.inc.php';

	foreach ($C as $name => $value) {
		define($name,$value);
	}

	$dsn = "mysql:host=". DB_HOST . ";dbname=" . DB_NAME;
	$dbo = new PDO($dsn, DB_USER, DB_PASS);

	function __autoload($class){
		$filename = "../sys/class/class." . $class . ".inc.php";
		if(file_exists($filename)){
			include_once $filename;
		}
	}

?>