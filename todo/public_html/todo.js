/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("pagecreate", "#page1", function(event)
{
    showTodo();
});

function saveTodo()
{
    var indx = localStorage.length;
    var todoText = $("#taskName").val();
    var todoDate = $("#date").val();
    if(todoText.length)
    {
        localStorage['task_'+indx] = todoText +" Date: " +todoDate ;
        //localStorage.setItem('task_'+indx,todoText);
	$("#todoList").listview();
	$("#todoList").listview("refresh"); 
        
    }
    
    
    showTodo();
    
}

function clearTodo()
{
    localStorage.clear();
    indx = localStorage.length;
    $("#todoList").empty();
    $("#todoList").listview ("refresh");

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
    var todoText = "";
    var todoDate ="";
    $("#todoList").empty();
    for (var i = 0; i < localStorage.length; i++)
    {
        todoText = localStorage.getItem('task_'+i);
        //todoDate = localStorage.getItem('task_'+i);
       //$("#todoList").append("<li>"+todoText+"</li>"); 
       $("#todoList").append('<li><a href="#">'+todoText+" "+todoDate+'</a><a href="#"data-role="button" data-icon="delete" onClick="removeTodo(id);" id="task_'+i+'">Remove</a></li>'); 
       // $("#todoList").append('<li><a href="#">'+task.name+" "+task.date+'</a><a href="#" data-role="button" data-icon="delete" onClick="removeTodo(id);" id="task_'+i+'">Remove</a></li>');                     
    } 
    $("#todoList").listview();
    $("#todoList").listview("refresh"); 
}
