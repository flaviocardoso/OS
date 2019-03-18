<?php

$path = json_decode(file_get_contents("php://input"), true);

$file = $path['path'];

//header("Content-type:application/pdf");

// It will be called downloaded.pdf
//header("Content-Disposition:attachment;filename='downloaded.pdf'");
//. urlencode($file)
// The PDF source is in original.pdf
//readfile($file);
header("Content-Type: application/octet-stream");

//$file = $_GET["file"] .".pdf";
header("Content-Disposition: attachment; filename='downloaded.pdf'");   
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
header("Content-Description: File Transfer");            
header("Content-Length: " . filesize($file));
flush(); // this doesn't really matter.
$fp = fopen($file, "r");
while (!feof($fp))
{
    echo fread($fp, 65536);
    flush(); // this is essential for large downloads
} 
fclose($fp); 
?>