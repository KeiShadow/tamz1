//JSON data ze souboru do selectu + výpočet měny
var userLang = navigator.language || navigator.userLanguage;
var url = 'http://homel.vsb.cz/~mor03/TAMZ/cnb_json.php'+'?lang='+userLang;
$(document).on("pagecreate", "#page1", function (event) {
    getData(url);

});
function getData(url) {
    $.getJSON(url, function (data) {
        $('#MySelect').empty();
        for (var i = 0; i < data['data'].length; i++) {
            $('#MySelect').append('<a href="" id="' + i + '" class="a ui-btn ui-corner-all ui-shadow ui-shadow ui-screen-hidden">' + data['data'][i]['code'] + '= ' + data['data'][i]['country_label'] + '</a>');
            ;
        }
        $('.a').click(function () {
            var id;
            id = $(this).attr('id');

            var current = $('#Current').val();
            if (current !== "") {
                var currentString = current.toString();//prevede input na string
                var Split = currentString.split(" ");//split rozdeli slova podle mezery do objektu
                for (var j = 0; j < data['data'].length; j++) {//projizdim data ktere jsou na strance url v getJSON
                    for (var i = 0; i < Split.length; i++) {//projizdim dane slovo 

                        if (Split[i] === data['data'][j]['code']) {//hledam zda se oznaceni meny z inputu rovna s menou v datech
                            var rate1 = data['data'][j]['rate'];
                            var rate2 = data['data'][id]['rate'];
                            var x = ((Split[0] / rate2) * rate1);
                            document.getElementById('Next').value = x.toFixed(4) + " " + data['data'][id]['code'];
                            ////logika vezmu nejdrive kolik chci rozmenit vydelim to menou cim to chci rozmenit a vynasobim to menou kterou to rozmenuji napr
                            // 100 eur na usd vezmu (100/usd)*EUR
                        } else if (Split[i] === "CZE") { // měna pro české koruny se počítá jinak.
                            var rate1 = data['data'][id]['rate']; // rate z dat  
                            var x = ((Split[0] / rate1));
                            document.getElementById('Next').value = x.toFixed(4) + " " + data['data'][id]['code'];
                        }
                    }
                }
            }
        });
    });
}

function getDatum(val) {
    var newDatum = url + '&date=' + val;
    getData(newDatum);
}