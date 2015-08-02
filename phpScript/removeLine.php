<?php

// Load properties file
$properties = parse_ini_file( "../cucurbitaMaxima.properties" );
$lineNumber = $_GET['ln'];

$arrayFile = file($properties["dataFile"]);
unset($arrayFile[$lineNumber]);
file_put_contents($properties["dataFile"], implode($arrayFile));

?>