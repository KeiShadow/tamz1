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
    var myTask, myObj,i,count, value;
        var taskName = $("#taskName").val();
        var taskNote = $("#taskNote").val();
        var date = $("#date").val();
        var volume =$("#slider-1").val();
        var vibration= $("#flip-1").val();
        var pr= getPriority();
        myObj ={
          "task":{ "Name":""+taskName+"","Note":""+taskNote+"","Date":""+date+"","Priority":""+pr+"","Volume":""+volume+"","Vibration":""+vibration+""}
        };
        count=0;
        i=0;
        if (typeof(Storage)!=="undefined" && localStorage != null){
         var myTask = new Object();
         myTask = JSON.stringify(myObj.task,(key,value)=>{
            return value;
         });
         localStorage.setItem("myNote",myTask);    
            
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
  
  indx=localStorage.length;
  
  alert(id);
  localStorage.removeItem(id);
  for(var i=0;i<localStorage.length;i++){
     if(!localStorage.getItem('task_'+i)){
         localStorage.setItem('task_'+i,localStorage.getItem('task_'+(i+1)));
         localStorage.removeItem('task_'+(i+1));
         
     }
  
  }
    showTodo();

    
}

function showTodo()
{
       var text,string,key,value, Name, Note, Date, Priority, Volume, Vibration;
       
   if (localStorage.length!=0) {
        text = localStorage.getItem("myNote");
        var obj = new Object();
         obj= JSON.parse(text,(key,value)=>{
          return value;
         });    
        var nextId = 1;
        var content = '<div data-role="collapsible" id="set"'+nextId+'"><h3>'+obj.Name+'</h3><p>Note: <br>'+obj.Note+'<br> Date: <br> '+obj.Date+'<br> Priority: <br>'+obj.Priority+'<br> Volume: <br> '+obj.Volume+'<br> Vibration: <br>'+obj.Vibration+'</p></div>';
        $( "#set" ).append( content ).collapsibleset( "refresh" );
             nextId++; 
   }    

     $("#set").listview();
    $("#set").listview("refresh");     

   
      $( "#expand" ).click(function() {
        $("#set").children(":last").collapsible( "expand" );
    });
    $( "#collapse" ).click(function() {
        $( "#set" ).children( ":last" ).collapsible( "collapse" );
    });
}