<?php

$conn=pg_connect("host=localhost port=5432 dbname=15052023 user=postgres password=chaima");

$portion=[];
$code=$_GET["code_ligne"];
$query = 'SELECT ((SELECT sum(ST_Length(c.geom)) FROM public."Capa_event" AS c WHERE code_ligne=$1 )*100) / (SELECT sum(ST_Length(p.geom)) FROM public."PLATINE" AS p WHERE ligne=$1 ) AS por';
$result=pg_query_params($query,array($code));
$resultArray = pg_fetch_all($result);
echo json_encode($resultArray);
 
 
 ?>