<?php

// Load properties file
$properties = parse_ini_file( "../cucurbitaMaxima.properties" );
$file = $_GET['fileNameProperties'];
$lineNumber = $_GET['ln'];

$arrayFile = file($properties[$file]);
unset($arrayFile[$lineNumber]);
file_put_contents($properties[$file], implode($arrayFile));
fclose($properties[$file]);

?>