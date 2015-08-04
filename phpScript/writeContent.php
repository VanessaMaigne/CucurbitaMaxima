<?php

// Load properties file
$properties = parse_ini_file( "../cucurbitaMaxima.properties" );
$file = $_GET['fileName'];
$content = $_GET['content'];
$lineNumber = $_GET['ln'];

$arrayFile = file($properties[$file]);

// Write only header
if(empty($arrayFile)){
    $fullContent = $content;
} else {
    if(!empty($lineNumber)){
        // Modify values
        $arrayFile[$lineNumber] = $content."\n";
        $fullContent = implode($arrayFile);
    } else {
        // Add new values
        $fullContent = implode($arrayFile)."\n".$content;
    }
}

file_put_contents($properties[$file], $fullContent);
fclose($properties[$file]);

?>