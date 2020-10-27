<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM UserTable';
$vars = [];


if (isset($_GET['email'])) {
	$sql = 'SELECT * FROM UserTable WHERE email = ?';
	$vars = [ $_GET['certificationID'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$UserTable = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
