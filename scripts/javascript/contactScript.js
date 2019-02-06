//var APIRoot = "http://.../API"; .......needed?
//var fileExtension = ".php";         ...
//var userId = 0;                     ...
/*var list = new Array(); // list of contacts
var arr = ["Name", "Phone", "Email"];
list[0] = arr;*/

var APIRoot = "http://poopspring2019.website/API";
var fileExtension = ".php";
var userId = 0;
var firstName = '', lastName = '';

function doLogin()
{
	var login = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    
    var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = APIRoot + '/Login' + fileExtension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type",   "application/json; charset=UTF");
	try
	{  
	    //console.log("Hey hello try");
	    xhr.onreadystatechange = function()   
	{    
	    if (this.readyState == 4 && this.status == 200)     
	    {       
	        var jsonObject = JSON.parse( xhr.responseText );
	        console.log(jsonObject.userID);
	        if(jsonObject.userID > 0)
	        {
	            document.cookie = jsonObject.userID;
	            window.location.href = "manage.html"
	        }
	        else
	        {
	            alert("Incorrect password");
	        }
	    }
	};  
	xhr.send(jsonPayload);
	
	    
	}
	catch(err)
	{  
	    alert(err.message);
	}
    //console.log(jsonPayload);


}

function doRegister()
{
    var login = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var verification = document.getElementById("confirmPassword").value
    var fname = document.getElementById("firstName").value;
    var lname = document.getElementById("lastName").value;
    var url = APIRoot + '/AddUser' + fileExtension;
    var jsonPayload ='{"fname" : "' + fname + '", "lname" : "' + lname + '", "login" : "' + login + '", "password" : "' + password + '"}';
//    console.log(jsonPayload);

	
	if(password != verification)
	{
	    alert("Passwords don't match!");
	    return;
	}
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type",   "application/json; charset=UTF");
	try
	{  
	    //alert("We are trying");
	    xhr.onreadystatechange = function()   
	{    
	    //alert("We are trying");
	    if (this.readyState == 4 && this.status == 200)     
	    {       
	        var jsonObject = JSON.parse( xhr.responseText );
	        window.location.href = "index.html"
	        //alert(jsonObject.error);
	    }

	};  
	xhr.send(jsonPayload);
	
	    
	}
	catch(err)
	{  
	    alert(err.message);
	}
    //console.log(jsonPayload);
}

function addContact()
{
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var number = document.getElementById("number").value;
    if(number.length > 10)
    {
        alert("Phone number too long.");
        return 0;
    }
    if(number.length < 10)
    {
        alert("Phone number too short.");
        return 0;
    }
    var userID = document.cookie;
    var url = APIRoot + '/AddContact' + fileExtension;
    var jsonPayload ='{"userID" : "' + userID + '", "number" : "' + number + '", "fname" : "' + fname + '", "lname" : "' + lname + '"}';
//    console.log(jsonPayload);

	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type",   "application/json; charset=UTF");
	try
	{  
	    //alert("We are trying");
	    xhr.onreadystatechange = function()   
	{    
	    //alert("We are trying");
	    if (this.readyState == 4 && this.status == 200)     
	    {       
	        var jsonObject = JSON.parse( xhr.responseText );
	        alert("Contact successfully added!");
	        
	        document.getElementById("fname").value = '';
            document.getElementById("lname").value = '';
            document.getElementById("number").value = '';
	        //alert(jsonObject.error);
	    }

	};  
	xhr.send(jsonPayload);
	
	    
	}
	catch(err)
	{  
	    alert(err.message);
	}
    //console.log(jsonPayload);
}

function makeTable(){
    var conTab = document.getElementById("conTab");
    
    
    
    // insert way to add contacts to list//
    
    
    
    
    var tab = document.createElement("table");
    tab.id = "tab";
    conTab.appendChild(tab); 
    
    tab.style.border = "thin solid #000000";
    
    // add all the stuff to the table
    // this will need to be dynamic
    for(var i = 0; i < list.length; i++){
        var row = tab.insertRow(i);
        
        var nameCell = row.insertCell(0);
        var phoneCell = row.insertCell(1);
        var emailCell = row.insertCell(2);
        
        nameCell.style.border = "thin solid #000000";
        phoneCell.style.border = "thin solid #000000";
        emailCell.style.border = "thin solid #000000";
            
        nameCell.innerText = list[i][0];
        phoneCell.innerText = list[i][1];
        emailCell.innerText = list[i][2];;
    }
    
 
}

function deleteTable(){
    var div = document.getElementById("conTab");
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
    
    div = document.getElementById("searchAdd");
    div.style = 'display:none'
}

function Logout(){
    // reset everything
    document.getElementById("loginUI").style.visibility = 'visible';
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    deleteTable();
    document.getElementById("logout").style.visibility = 'hidden';
    var div = document.getElementById("outerLogin");
    div.removeChild(div.lastChild);
    // will probably also need to clear the select list
}

  
function deleteContact(del,userID){

    //alert("attempting to delete contact:" + del + "->" + userID);
    var url = APIRoot + '/Delete' + fileExtension;
    var jsonPayload ='{"userID" : "' + userID + '", "lname" : "' + del + '"}';
    //console.log(jsonPayload);

	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type",   "application/json; charset=UTF");
	try
	{  
	    //alert("We are trying");
	    xhr.onreadystatechange = function()   
	{    
	    //alert("We are trying");
	    if (this.readyState == 4 && this.status == 200)     
	    {       
	        var jsonObject = JSON.parse( xhr.responseText );
	        location.reload();
	    }

	};  
	xhr.send(jsonPayload);
	
	    
	}
	catch(err)
	{  
	    alert(err.message);
	}
    //console.log(jsonPayload);
    //location.reload();
}

