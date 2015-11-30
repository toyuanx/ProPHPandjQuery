<?php

if(isset($_GET['event_id'])){
	$id = preg_replace('/[^0-9]/','',$_GET['event_id']);

	if(empty($id)){
		header("Location: ./");
		exit;
	}
}
else{
	header("Location: ./");
	exit;
}
// $id = $_GET['event_id'];
// echo $id;

include_once '../sys/core/init.inc.php';

$page_title = "View Event";
$css_files = array("style.css","admin.css");
include_once 'assets/comm/header.inc.php';

$cal = new Calendar($dbo);

?>

<div id="content">
	<?php echo $cal->displayEvent($id) ?>

	<a href= "./">&laquo; Back to the calendar</a>
</div>

<?php
include_once 'assets/comm/footer.inc.php';

?>
