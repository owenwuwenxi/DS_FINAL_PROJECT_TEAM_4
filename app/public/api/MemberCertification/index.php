<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT *, NOW()>expirationDate as expired FROM MemberCertification';
$vars = [];
#May not be Now(), but it's that idea

if (isset($_GET['mcID'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT *, NOW()>expirationDate as expired FROM MemberCertification WHERE mcID = ?';
  $vars = [ $_GET['mcID'] ];
}
#?

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);
#?

// Step 4: Output
header('Content-Type: application/json');
echo $json;
