<?php
    
    $inData = getRequestInfo();
    
    $userID = $inData["userID"];
    $search = $inData["search"];
    
    $searchResults = "";
    $searchCount = 0;
    
    $conn = new mysqli("localhost", "poopspg2_user", "mV?n+Y@^_xq=", "poopspg2_contactManager");
    if($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $sql = "select fname, lname, number from CONTACT where userID =" . $userID . " AND lname like '%" . $search . "%'";
        $result = $conn->query($sql);
        if($result->num_rows > 0)
        {
            while($row = $result->fetch_assoc())
            {
                if( $searchCount > 0 )
                {
                    $searchResults .= ",";
                }
                $searchCount++;
                $searchResults .= '["' . $row["fname"] . '","' . $row["lname"] . '","' . $row["number"] . '"]';
            }
            $conn->close();
            
            returnWithInfo( $searchResults );
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
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $searchResults )
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>
