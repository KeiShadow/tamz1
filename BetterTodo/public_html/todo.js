/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("pagecreate", "#page1", function (event)
{
    showTodo();
});

//song Trndsttr (Lucian﻿ Remix) [feat. M. Maggie]” ― Black Coast

var index = localStorage.length;
function getPriority()
{
    if (document.getElementById('Low').checked) {

        var priority = $("#Low").val();
        return priority;
    } else if (document.getElementById('Medium').checked) {

        var priority = $("#Medium").val();
        return priority;
    } else {
        var priority = $("#High").val();
        return priority;
    }

}

function saveTodo()
{
    //deklarace proměnných
    var myTask, myObj, i, value, index;

    var taskName = $("#taskName").val();
    var taskNote = $("#taskNote").val();
    var date = $("#date").val();
    var volume = $("#slider-1").val();
    var vibration = $("#flip-1").val();
    var pr = getPriority();
    myObj = {
        "task": {
            "Name": "" + taskName + "",
            "Note": "" + taskNote + "",
            "Date": "" + date + "",
            "Priority": "" + pr + "",
            "Volume": "" + volume + "",
            "Vibration": "" + vibration + ""
        }
    };
    index = localStorage.length;
    if (typeof (Storage) !== "undefined" && localStorage !== null)
    {
        //Vytvoření objektu myTask a poté se hodnoty z myObj pomoci json nahraji do myTask
        var myTask = new Object();
        myTask = JSON.stringify(myObj.task, (key, value) => {
            return value;
        });
        //pomocí lokalStorage.setItem nastavíme hodnoty z tasku do paměti
        localStorage.setItem("myNote" + index, myTask);
        index++;
    }
    showTodo();

}
/*Funkce pro smazání localStorage*/
function clearTodo()
{
    localStorage.clear();
    $("#set").empty();
    $("#set").collapsibleset("refresh");
}
/*Funkce která maže id objektu*/
function removeTodo(id) {
    var text, index, key, value;
    index = localStorage.length;
    localStorage.removeItem(id);
    for (var i = 0; i < localStorage.length; i++) {
        if (!localStorage.getItem("myNote" + i)) {
            localStorage.setItem("myNote" + i, localStorage.getItem("myNote" + (i + 1)));
            localStorage.removeItem("myNote" + (i + 1));
        }
    }
    showTodo();
}
function getInfo(id){
   var i,value,key;
  for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(id)) { 
            var Obj = new Object();
            var text = localStorage.getItem(id);
            Obj = JSON.parse(text, (key, value) => {
                return value;
            });
            $("#taskNameU").val(Obj.Name); 
//            Obj.Name = $("#taskNameU").val();
//            Obj.Note = $("#taskNoteU").val();
//            Obj.Date = $("#dateU").val();
//            Obj.Priority= getPriority();
//            Obj.Volume = $("#slider-1U").val();
//            Obj.Vibration = $("#flip-1U").val();
          
        }
    }  
     $("#set").listview();
    $("#set").collapsibleset("refresh");
    
}
function update(id) {
    var i,value,key;
    
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(id)) { 
            var Obj = new Object();
            var text = localStorage.getItem(id);
            Obj = JSON.parse(text, (key, value) => {
                return value;
            });

            Obj.Name = $("#taskNameU").val();
            Obj.Note = $("#taskNoteU").val();
            Obj.Date = $("#dateU").val();
            Obj.Priority= getPriority();
            Obj.Volume = $("#slider-1U").val();
            Obj.Vibration = $("#flip-1U").val();
           var myTask = new Object();
           myTask = JSON.stringify(Obj, (key,value)=>{
               return value;
               
           });
           localStorage.setItem(id,myTask);
        }
    }
     $("#set").listview();
    $("#set").collapsibleset("refresh");
    showTodo();

}

/*Ukazuje seznam poznámek*/
function showTodo()
{
    var text, key, value, i, index;
    var nextId = 1;

    index = localStorage.length;
    var obj = new Object(); //Vytvoření objektu pro JSON.parse
    $("#set").empty();
    if (localStorage.length !== 0)
    {
        for (var i = 0; i < localStorage.length; i++) {
            text = localStorage.getItem("myNote" + i);

            /*pomocí getItem můžeme vytáhneme hodnoty z paměti a uložíme je do objektu obj.
             *  JSON parse tyto objekty vratí do obj (objekt)
             */

            obj = JSON.parse(text, (key, value) => {
                return value;
            });

            var content = '<div data-role="collapsible" id="set"' + nextId + '"><h3>' + obj.Name + '</h3>\n\
                           <p>Note: <br>' + obj.Note + '<br> \n\
                            Date: <br> ' + obj.Date + '<br> \n\
                            Priority: <br>' + obj.Priority + '<br> \n\
                            Volume: <br> ' + obj.Volume + '<br> \n\
                            Vibration: <br>' + obj.Vibration + '</p>\n\
                            <button class="ui-btn "data-role="button" data-icon="delete" onClick="removeTodo(id);" id="myNote' + i + '">Remove</button>\n\
                            <a href="#UpdateDialog" data-transition="fade" class="ui-btn" onClick ="getInfo(id);" id="myNote' + i + '">Update</a></div>'
                    ;
            
            $("#set").append(content);
           //document.getElementById("submit1").id = "myNote" + i +""; 
        }
        
    }
    
    $("#set").listview();
    $("#set").collapsibleset("refresh");

    nextId++;
}