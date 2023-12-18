<?php
$conn=pg_connect("host=localhost port=5432 dbname=15052023 user=postgres password=chaima");

$listetables=[];
$table=$_GET['table'];
$champ=$_GET['champ'];
$result = pg_query($conn, " SELECT distinct $champ FROM $table ORDER BY $champ ");

$resultArray = pg_fetch_all($result);
echo json_encode($resultArray);
 
 
 ?>