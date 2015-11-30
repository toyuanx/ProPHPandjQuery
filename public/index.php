<?php

	include_once '../sys/core/init.inc.php';

	$cal = new Calendar($dbo,"2010-01-01 12:00:00");
	//$cal = new Calendar($dbo);

	$page_title = "Events Calendar";
	$css_files = array('style.css','admin.css','ajax.css');

	include_once 'assets/comm/header.inc.php';
?>

<div id="content">
<?php

	echo $cal->buildCalendar();

?>

</div>


<?php

include_once 'assets/comm/footer.inc.php';

?>