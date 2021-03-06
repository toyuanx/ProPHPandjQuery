<?php
	session_start();

	include_once '../../../sys/config/db-cred.inc.php';

	foreach( $C as $name => $val){
		define($name,$val);
	}

	$actions = array(
		'event_view' => array(
			'object' => 'Calendar',
			'method' => 'displayEvent'
			),
		'edit_event' => array(
			'object' => 'Calendar',
			'method' => 'displayForm'
			),
		'event_edit' => array(
			'object' => 'Calendar',
			'method' => 'processForm'
			)
	);

	if( isset($actions[$_POST['action']])){
		$use_array = $actions[$_POST['action']];
		$obj = new $use_array['object']();

		if(isset($_POST['event_id'])){
			$id=(int)$_POST['event_id'];
		}else{$id=NULL;}

		echo $obj->$use_array['method']($id);
	}



	function __autoload($class_name){
		$filename = '../../../sys/class/class.'.strtolower($class_name).'.inc.php';
		if(file_exists($filename)){
			include_once $filename;
		}
	}
?>