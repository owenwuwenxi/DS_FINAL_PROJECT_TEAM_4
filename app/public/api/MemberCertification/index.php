<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT *, NOW()>expirationDate as expired FROM MemberCertification';
$vars = [];
#May not be Now(), but it's that idea

if (isset($_GET['certificationID'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT *, NOW()>expirationDate as expired FROM MemberCertification WHERE certificationID = ?';
  $vars = [ $_GET['certification'] ];
}
#?

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$mc = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($mc, JSON_PRETTY_PRINT);
#?

// Step 4: Output
header('Content-Type: application/json');
echo $json;
