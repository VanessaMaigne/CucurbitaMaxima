<?php

// Load properties file
$properties = parse_ini_file( "../cucurbitaMaxima.properties" );
$file = $_GET['fileNameProperties'];
$lineNumber = $_GET['ln'];

$arrayFile = file($properties[$file]);
echo $arrayFile[$lineNumber];
fclose($properties[$file]);

?>