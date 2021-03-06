<?php

require 'common.php';

// Only need this line if we're creating GUIDs (see comments below)
#use Ramsey\Uuid\Uuid;

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// As part of this step, create a new GUID to use as primary key (suitable for cross-system use)
// If we weren't using a GUID, allowing auto_increment to work would be best (don't pass `id` to `INSERT`)
#$guid = Uuid::uuid4()->toString(); // i.e. 25769c6c-d34d-4bfe-ba98-e0ee856f3e7a
#?

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  'UPDATE MemberTable SET firstName = ?, lastName = ?, radioNumber = ?, stationNumber = ?, preferredEmail = ? WHERE memberID=?'
);

$stmt->execute([
  #$guid,
  $_POST['firstName'],
  $_POST['lastName'],
  $_POST['radioNumber'],
  $_POST['stationNumber'],
  $_POST['preferredEmail'],
  $_POST['memberID']
]);

$memberTable=$stmt->fetchAll();
$json=json_encode($memberTable, JSON_PRETTY_PRINT);
header('HTTP/1.1 303 See Other');
header('Location: ../member/');
