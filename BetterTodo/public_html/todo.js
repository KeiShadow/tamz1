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

var indx = localStorage.length;   
    function getPriority()
   {
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
    var myTask, myObj,i,value,index;
        index = localStorage.length;
        alert(index);
        var taskName = $("#taskName").val();
        var taskNote = $("#taskNote").val();
        var date = $("#date").val();
        var volume =$("#slider-1").val();
        var vibration= $("#flip-1").val();
        var pr= getPriority();
        myObj ={
          "task":{ "Name":""+taskName+"","Note":""+taskNote+"","Date":""+date+"","Priority":""+pr+"","Volume":""+volume+"","Vibration":""+vibration+""}
        }; 
        
        if (typeof(Storage)!=="undefined" && localStorage != null)
        {
         
         var myTask = new Object();
         myTask = JSON.stringify(myObj.task,(key,value)=>{
             return value;
         });
          
          localStorage.setItem("myNote"+index,myTask);  
          $("#set").listview();
          $("#set").listview("refresh"); 
          index++;
        } 
        showTodo();   
    
}

function clearTodo()
{
  localStorage.clear(); 
  $("#set").empty();
  $("#set").listview ("refresh");
}

function removeTodo(id){
  var text, indx, key, value;
  indx=localStorage.length;
  localStorage.removeItem(id);
  for(var i=0;i<localStorage.length;i++){
     if(!localStorage.getItem("myNote"+i)){
         localStorage.setItem("myNote"+i,localStorage.getItem("myNote"+(i+1)));
         localStorage.removeItem("myNote"+(i+1));   
     }
  }
  showTodo();  
}

function showTodo()
{
    var text,key,value,i, index;
    var nextId = 1;
    index=localStorage.length;
    if (localStorage.length!=0) 
    {
       for(var i=0;i<localStorage.length;i++){  
        text = localStorage.getItem("myNote"+i);   
         
        var obj = new Object();
         obj= JSON.parse(text,(key,value)=>{
          return value;
         });     
        
        var content = '<div data-role="collapsible" id="set"'+nextId+'"><h3>'+obj.Name+'</h3>\n\
        <p>Note: <br>'+obj.Note+'<br> \n\
        Date: <br> '+obj.Date+'<br> \n\
        Priority: <br>'+obj.Priority+'<br> \n\
        Volume: <br> '+obj.Volume+'<br> \n\
        Vibration: <br>'+obj.Vibration+'</p>\n\
        <a href="#" data-role="button" data-icon="delete" onClick="removeTodo(id);" id="myNote'+i+'">Remove</a></div>';
            
        $( "#set" ).append( content ).collapsibleset( "refresh" );      
       }
   }    

      
       $("#set").listview();
    $("#set").listview("refresh");   
   
      $( "#expand" ).click(function() {
        $("#set").children(":last").collapsible( "expand" );
    });
    $( "#collapse" ).click(function() {
        $( "#set" ).children( ":last" ).collapsible( "collapse" );
    });
    nextId++;
}