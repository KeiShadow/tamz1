$.getJSON('data.JSON',function(data){  
    var pole= new Array();
   for(var i=0; i< data['mena'].length;i++){
       $('#Myselect').append('<option id='+i+' >'+data['mena'][i]['code']+'= '+data['mena'][i]['country_label']+'</option>');
       pole[i] = data['mena'][i]['code']+' '+data['mena'][i]['rate'];
   }
   
   $('#Myselect').change(function(){
       var id
        $('select option:selected').each(function(){
           id = $(this).attr('id'); 
        });
        var rate= data['mena'][id]['rate'];
        var x =$('#Current').val() * rate;
        document.getElementById('Next').value = x + ' '+data['mena'][id]['code'];
        console.log(x);
       console.log(rate);
   });
   
   
   
   
}); 

