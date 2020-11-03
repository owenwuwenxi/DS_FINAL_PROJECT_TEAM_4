<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT Certification.certificationName, Certification.certifyingAgency,
MemberTable.firstName, MemberTable.lastName, MemberTable.isActive,
MemberCertification.mcID, MemberCertification.certificationID, MemberCertification.memberID,
MemberCertification.renewedDate, MemberCertification.expirationDate, now()>expirationDate as expired FROM MemberCertification
JOIN Certification ON Certification.certificationID = MemberCertification.certificationID
JOIN MemberTable ON MemberTable.memberID = MemberCertification.memberID';
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

$mc = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($mc, JSON_PRETTY_PRINT);
#?

// Step 4: Output
header('Content-Type: application/json');
echo $json;
