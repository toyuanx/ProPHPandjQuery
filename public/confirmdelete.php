<?php

	session_start();

	if(isset($_POST['event_id']) && isset($_SESSION['user'])){
		$id=(int)$_POST['event_id'];
	}
	else{
		header("Location: ./");
		exit;
	}


	include_once '../sys/core/init.inc.php';

	$cal = new Calendar($dbo);
	$markup = $cal->confirmDelete($id);

	$page_title = "View Event";
	$css_files = array("style.css","admin.css");
	include_once 'assets/comm/header.inc.php';
?>


<div id="content">
<?php echo $markup; ?> 
</div>
<?php
include_once 'assets/comm/footer.inc.php';
?> 