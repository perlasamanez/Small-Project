//var APIRoot = "http://.../API"; .......needed?
//var fileExtension = ".php";         ...
//var userId = 0;                     ...
var list = new Array(); // list of contacts
var arr = ["Name", "Phone", "Email"];
list[0] = arr;

function doLogin()
{
	var login = document.getElementById("userName").value;
	var password = document.getElementById("password").value;


        //insert user authentication here//

        // Hide login boxes 
        document.getElementById("loginUI").style.visibility = 'hidden';
         
        var div = document.getElementById("searchAdd");
        div.style = 'visible'
         
        makeTable();
        
        // Adds the logged in label
        div = document.getElementById("outerLogin");
        var userLabel = document.createElement("label");
        userLabel.innerText = "Logged in as: " + login + "\n\n\n";
        div.append(userLabel);
        
        // expose the poor logout button from its hidden state
        document.getElementById("logout").style.visibility = 'visible';
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

  
function searchContact(){

    alert("attempting to search for contact:");
}

function addContact(){
    alert("attempting to add contact:");
}