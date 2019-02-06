<?php
	$inData = getRequestInfo();

    $firstName = $inData["fname"];
    $lastName = $inData["lname"];
    $login = $inData["login"];
    $password = $inData["password"];


	$conn = new mysqli("localhost", "poopspg2_user", "mV?n+Y@^_xq=", "poopspg2_contactManager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $sql = "select fname, lname from USER where login ='" . $login . "'";
        $result = $conn->query($sql);
        if($result->num_rows > 0)
        {
            returnWithError("Username already exists");
        }
        else{
            $sql = "insert into USER (fname, lname, login, password) VALUES ('" . $firstName . "','" . $lastName . "','" . $login . "','" . $password . "')";

            if( $result = $conn->query($sql) != TRUE )
            {
                returnWithError( $conn->error );
            }
            else
            {
                returnWithError("");
            }
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
