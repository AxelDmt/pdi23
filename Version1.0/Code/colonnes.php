<?php
$conn=pg_connect("host=localhost port=5432 dbname=15052023 user=postgres password=chaima");

$listetables=[];
$table=$_GET['table'];
$result = pg_query($conn, " SELECT distinct column_name FROM information_schema.columns WHERE table_name  = '$table' AND column_name != 'geom'");

$resultArray = pg_fetch_all($result);
echo json_encode($resultArray);
 
 
 ?>