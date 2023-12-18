<?php
$conn=pg_connect("host=localhost port=5432 dbname=15052023 user=postgres password=chaima");

$listetables=[];
//$region=$_GET['region'];
$result = pg_query($conn, " SELECT distinct table_name
FROM information_schema.tables
WHERE table_schema='public'
 AND table_type='BASE TABLE' AND table_name != 'spatial_ref_sys' AND table_name != 'pointcloud_formats'; ");

$resultArray = pg_fetch_all($result);
echo json_encode($resultArray);
 
 
 ?>

