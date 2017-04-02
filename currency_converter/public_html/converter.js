//JSON data ze souboru do selectu + výpočet měny
$.getJSON('http://homel.vsb.cz/~mor03/TAMZ/cnb_json.php',function(data){  
   for(var i=0; i< data['data'].length;i++){
       $('#Myselect').append('<option id='+i+' >'+data['data'][i]['code']+'= '+data['data'][i]['country_label']+'</option>');
   }
   $('#Myselect').change(function(){
       var id
        $('select option:selected').each(function(){
           id = $(this).attr('id'); 
        });
        var rate= data['data'][id]['rate'];
        var x =$('#Current').val() * rate;
        document.getElementById('Next').value = x + ' '+data['data'][id]['code'];
        
        if($('#datum').val()===""){
            $('#datum').append(data['data'][id]['code']+' '+data['date'] +', ');
        }
        
   });
}); 