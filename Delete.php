<?php

	$inData = getRequestInfo();

	$userID = $inData["userID"];
    $lname = $inData["lname"];


	$conn = new mysqli("localhost", "poopspg2_user", "mV?n+Y@^_xq=", "poopspg2_contactManager");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{

		$sql = "SELECT lname FROM CONTACT WHERE lname='" .  $lname . "' AND userID=" . $userID;
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$deleted = $row["lname"];
            
            $sql = "DELETE FROM CONTACT WHERE lname='" . $lname . "' AND userID=" . $userID;
            $result = $conn->query($sql);
            $conn->close();
            
            returnWithInfo($deleted);
		}
		else
		{
			returnWithError( "No Records Found" );
		}

		
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
    
	function returnWithInfo( $del )
	{
		$retValue = '{"Deleted":"' . $del . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
