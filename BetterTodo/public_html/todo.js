/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("pagecreate", "#page1", function(event)
{ 
    showTodo();
});


//song Trndsttr (Lucian﻿ Remix) [feat. M. Maggie]” ― Black Coast
 var myObj, myNote, text, obj;
var indx = localStorage.length;
  
   
   function getPriority(){
       if(document.getElementById('Low').checked){
    
       var priority = $("#Low").val();
       return priority;
    }
    else if(document.getElementById('Medium').checked){
    
       var priority = $("#Medium").val(); 
       return priority;
    }
    else{
    var priority = $("#High").val();
      return priority;
    }
    
   }
   


function saveTodo()
{
    var taskName = $("#taskName").val();
    var taskNote = $("#taskNote").val();
    var date = $("#date").val();
    var volume =$("#slider-1").val();
    var vibration= $("#flip-1").val();
    var text ={"Name":""+taskName+"","Note":""+taskNote+"","Date":""+date+"","Priority":""+getPriority()+"","Volume":""+volume+"","Vibration":""+vibration+""};
    
    var myNote = JSON.stringify(text);
    localStorage.setItem("myNote",myNote);
    
    showTodo();
    
}

function clearTodo()
{
    localStorage.clear();
    indx = localStorage.length;
    $("#set").empty();
    $("#set").listview ("refresh");

}

function removeTodo(id){
  
  indx=localStorage.length;
  
  alert(id);
  localStorage.removeItem(id);
  for(var i=0;i<localStorage.length;i++){
     if(!localStorage.getItem('myNote'+i)){
         localStorage.setItem('myNote'+i,localStorage.getItem('myNote'+(i+1)));
         localStorage.removeItem('myNote'+(i+1));
         
     }
  
  }
    showTodo();
}

function showTodo()
{
    text = localStorage.getItem('myNote');
    obj = JSON.parse(text);   
     
       var nextId = 1;
       var content = "<div data-role='collapsible' id='set" + nextId + "'><h3>" + obj.Name + "</h3>\n\
        <p>Note: <br>"+obj.Note+"<br> Date: <br> "+obj.Date+"<br> Priority: <br>"+obj.Priority+"<br> Volume: <br> "+obj.Volume+"<br> Vibration: <br>"+obj.Vibration+"</p></div>";
    $( "#set" ).append( content ).collapsibleset( "refresh" );
    
    $("#set").listview();
    $("#set").listview("refresh"); 
      $( "#expand" ).click(function() {
        $("#set").children(":last").collapsible( "expand" );
    });
    $( "#collapse" ).click(function() {
        $( "#set" ).children( ":last" ).collapsible( "collapse" );
    });
}
