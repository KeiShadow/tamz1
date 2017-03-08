/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function LoadKey() {
    var jqxhr = $.ajax({
        url: $("#URLCode").val(),
        type: "GET", // Also: "GET", …
        data: {'login': $("#Login").val()}, //'nog0030': 
        //headers: {'APIKEY': 'Header value 1'},
        success: function (data) {
            alert('I was successful and received data: ' + data);
            $("#APIKEY").val(data);
        }
    })
            .fail(function (err) {
                alert("Something went wrong: " + err.responseText);
            });
}

function testApi(){
       var s1 =$("#Login").val()+":"+$("#APIKEY").val();
        var s2=btoa(s1);
  var jqxhr = $.ajax({
        url: $("#URLCode").val(),
        type: "POST", // Also: "GET", …
        data: {'login': $("#Login").val()}, //'nog0030': 
        headers: {'API-Token':s2},
        success: function (data) {
            alert('I was successful and received data: ' + data);
        }
    })
            .fail(function (err) {
                alert("Something went wrong: " + err.responseText);
            });  
    
    
    
    
    
}


