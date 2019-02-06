<?php

	$inData = getRequestInfo();

	$number = $inData["number"];
	$fname = $inData["fname"];
	$lname = $inData["lname"];
	$userID = $inData["userID"];

	$conn = new mysqli("localhost", "poopspg2_user", "mV?n+Y@^_xq=", "poopspg2_contactManager");
	if($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "insert into CONTACT (userID, number, fname, lname) VALUES (" . $userID . ",'" . $number . "','" . $fname . "','" . $lname . "')";

		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
        else
        {
            returnWithError("");
        }

		$conn->close();
	}



	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

