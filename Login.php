<?php
    
    $inData = getRequestInfo();
    
    $id = 0;
    $firstName = "";
    $lastName = "";
    
    $conn = new mysqli("localhost", "poopspg2_user", "mV?n+Y@^_xq=", "poopspg2_contactManager");
    if($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $sql = "SELECT userID,fname,lname FROM USER where login='" . $inData["login"] . "' and password ='" . $inData["password"] . "'";
        $result = $conn->query($sql);
        if($result->num_rows > 0)
        {
            $row = $result->fetch_assoc();
            $firstName = $row["fname"];
            $lastName = $row["lname"];
            $id = $row["userID"];
            
            $conn->close();
            
            returnWithInfo($firstName, $lastName, $id );
        }
        else
        {
            $conn->close();
            
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
        $retValue = '{"userID":0,"fname":"","lname":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $firstName, $lastName, $id )
    {
        $retValue = '{"userID":' . $id . ',"fname":"' . $firstName . '","lname":"' . $lastName . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
    
?>
