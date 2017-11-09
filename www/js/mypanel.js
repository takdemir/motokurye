/**
 * Created by taner on 14.11.2016.
 */

$(document).ready(function () {

    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

});




var mypanel={

    checklogin: function () {

        if(window.localStorage.getItem("kuryeID")=="" || window.localStorage.getItem("kuryeID")==null){
           window.location.href="index.html";
        }
    },
    logout: function () {
        window.localStorage.removeItem("kuryeID");
        window.localStorage.removeItem("kuryeName");
        window.localStorage.removeItem("ipurl");
        window.location.href="index.html";
    },
    getjobsOnkurye: function (kuryeID) {

        var data={"kuryeID":kuryeID};

        $.ajax({
            url: window.localStorage.getItem("ipurl")+"/getjobsonkurye",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            beforeSend: function () {
                //alert("işler geliyor "+window.localStorage.getItem("ipurl")+" kuryeID:"+kuryeID);
            },
            error: function (a,b,c) {
                alert("Hata: getonjobkurye" + a.responseText);
            },
            success: function (data) {



                    if(data.data!=""){

                        var table="";



                        var i=1;
                        $.each(data.data, function (k,v) {

                            var accordionOpen="";
                            if(i==1){
                               accordionOpen="";
                            }

                            var headId="heading"+i;
                            var collapseId="collapse"+i;



                                table+='<div class="panel panel-default">'+


                                '<div class="panel-heading" role="tab" id="'+headId+'">'+
                                '<h4 class="panel-title">'+
                                '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#'+collapseId+'" aria-expanded="true" aria-controls="'+collapseId+'">'+
                                i+'.Gönderi ('+v.alinansemt+' - '+v.teslimsemt+')'+
                                '</a>'+
                                '</h4>'+
                                '</div>'+
                                '<div id="'+collapseId+'" class="panel-collapse collapse '+accordionOpen+'" role="tabpanel" aria-labelledby="'+headId+'">'+
                                '<div class="panel-body">'+


                                '<table class="table table-bordered">'+
                                '<tr>'+
                                '<th>Gönderi Nu.:</th>'+
                                '<td>'+v.id+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Al.Kişi</th>'+
                                '<td>'+v.alinankisi+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Al.Semt</th>'+
                                '<td>'+v.alinansemt+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Al.Adres</th>'+
                                '<td>'+v.alinanadres+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Tes.Kisi</th>'+
                                '<td>'+v.teslimkisi+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Tes.Semt</th>'+
                                '<td>'+v.teslimsemt+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Tes.Adres</th>'+
                                '<td>'+v.teslimadres+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Tutar</th>'+
                                '<td>'+v.tutar+' TL</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<tr>'+
                                    '<th>İşlem Tipi</th>'+
                                    '<td>'+v.islemtipi+'</td>'+
                                    '</tr>'+
                                '<th>Ödeme</th>'+
                                '<td>'+v.odemedurumu+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                '<th>Ok.Saati</th>'+
                                '<td>'+v.okumasaati+'</td>'+
                                '</tr>'+
                                    '<tr>'+
                                    '<th>Yetkili</th>'+
                                    '<td>'+v.yetkiliname+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<th>Yetkili Telefon</th>'+
                                    '<td>'+v.yetkilitel+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<th>Not</th>'+
                                    '<td>'+v.not+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<th>Kayıt Veren (F1):</th>'+
                                    '<td>'+v.kayitveren+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<th>Kayıt Veren Tel.:</th>'+
                                    '<td>'+v.kayitverencep+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<th>F2 Tel.:</th>'+
                                    '<td>'+v.f2cep+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<th>F3 Tel.:</th>'+
                                    '<td>'+v.f3cep+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<td></td>'+
                                    '<td><input type="button" onclick="mypanel.executeonjob('+v.id+',\'alindi\','+(i-1)+')" class="btn btn-warning" value="Alındı" /> </td>'+
                                    '</tr>'+
                                    '<tr>'+
                                    '<td>' +
                                    '<input type="text" placeholder="Teslim Edilen" name="teslimEdilen" class="form-control" />' +
                                    '<input type="text" placeholder="Teslim Saati" name="teslimSaati" class="form-control" onclick="mypanel.getteslimsaati('+(i-1)+')" /> </td>'+
                                    '<td><input type="button" onclick="mypanel.executeonjob('+v.id+',\'teslim\','+(i-1)+')" class="btn btn-success" value="Teslim" /> </td>'+
                                    '</tr>'+
                                '</table>'+


                                '</div>'+
                                '</div>'+
                                '</div>';



                            i++;

                        });

                        $("#accordion").html("");

                        $("#accordion").html(table);

                    }else{
                        $("#accordion").html("Üzerinizde iş bulunmamaktadır!");
                    }

            }

        });
    },
    getdeliveredjobsOnkurye: function (kuryeID) {

        var data={"kuryeID":kuryeID};

        $.ajax({
            url: window.localStorage.getItem("ipurl")+"/getdeliveredjobsonkurye",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            beforeSend: function () {
                //alert("işler geliyor "+window.localStorage.getItem("ipurl")+" kuryeID:"+kuryeID);
            },
            error: function (a,b,c) {
                alert("Hata: getdeliveredjob" + a.responseText);
            },
            success: function (data) {



                if(data.data!=""){

                    var table="";



                    var i=1;
                    $.each(data.data, function (k,v) {

                        var accordionOpen="";
                        if(i==1){
                            accordionOpen="";
                        }

                        var headId="heading"+(i+100);
                        var collapseId="collapse"+(i+100);



                        table+='<div class="panel panel-default">'+


                            '<div class="panel-heading" role="tab" id="'+headId+'">'+
                            '<h4 class="panel-title">'+
                            '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#'+collapseId+'" aria-expanded="true" aria-controls="'+collapseId+'">'+
                            i+'.Teslimat'+
                            '</a>'+
                            '</h4>'+
                            '</div>'+
                            '<div id="'+collapseId+'" class="panel-collapse collapse '+accordionOpen+'" role="tabpanel" aria-labelledby="'+headId+'">'+
                            '<div class="panel-body">'+


                            '<table class="table table-bordered">'+
                            '<tr>'+
                            '<th>Gönderi Nu.:</th>'+
                            '<td>'+v.id+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Al.Kişi</th>'+
                            '<td>'+v.alinankisi+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Al.Semt</th>'+
                            '<td>'+v.alinansemt+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Al.Adres</th>'+
                            '<td>'+v.alinanadres+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Tes.Kisi</th>'+
                            '<td>'+v.teslimkisi+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Tes.Semt</th>'+
                            '<td>'+v.teslimsemt+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Tes.Adres</th>'+
                            '<td>'+v.teslimadres+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Tutar</th>'+
                            '<td>'+v.tutar+' TL</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<tr>'+
                            '<th>İşlem Tipi</th>'+
                            '<td>'+v.islemtipi+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Ödeme</th>'+
                            '<td>'+v.odemedurumu+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Ok.Saati</th>'+
                            '<td>'+v.okumasaati+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Alım Saati</th>'+
                            '<td>'+v.alimsaati+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Teslim Saati</th>'+
                            '<td>'+v.teslimsaati+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Teslim Alan</th>'+
                            '<td>'+v.teslimalan+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Yetkili</th>'+
                            '<td>'+v.yetkiliname+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Yetkili Telefon</th>'+
                            '<td>'+v.yetkilitel+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<tr>'+
                            '<th>Not</th>'+
                            '<td>'+v.not+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Kayıt Veren (F1):</th>'+
                            '<td>'+v.kayitveren+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>Kayıt Veren Tel.:</th>'+
                            '<td>'+v.kayitverencep+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>F2 Tel.:</th>'+
                            '<td>'+v.f2cep+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>F3 Tel.:</th>'+
                            '<td>'+v.f3cep+'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<th>İşlemi Geri al</th>'+
                            '<td><input type="button" onclick="mypanel.getjobback('+v.id+')" value="Geri al" class="btn btn-danger" /></td>'+
                            '</tr>'+
                            '</table>'+


                            '</div>'+
                            '</div>'+
                            '</div>';

                        i++;

                    });

                    $("#accordion2").html("");

                    $("#accordion2").html(table);

                }else{
                    $("#accordion2").html("Teslim Edilen iş bulunmamaktadır!");
                }

            }

        });
    },
    executeonjob: function (jobID,executetype,eq) {

        if(executetype=='alindi') {

            var data = {"islem": jobID, "action": "alındı"};

            $.ajax({
                url: window.localStorage.getItem("ipurl") + "/registerislemlerikurye",
                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                beforeSend: function () {
                    //alert("işler geliyor "+window.localStorage.getItem("ipurl")+" kuryeID:"+kuryeID);
                },
                error: function (a, b, c) {
                    alert("Hata: executejob" + a.responseText);
                },
                success: function (data) {

                    if(!data.hasError){

                        mypanel.getjobsOnkurye(window.localStorage.getItem("kuryeID"));
                        mypanel.getdeliveredjobsOnkurye(window.localStorage.getItem("kuryeID"));
                        alert("Alındı bildirisi merkeze kaydedildi!");

                    }else{
                        alert("Alındı bildirilirken bir hata oluştu!");
                    }

                }

            });

        }else{

            var teslimEdilen=$("input[name='teslimEdilen']:eq(" + eq + ")").val();
            var teslimsaati=$("input[name='teslimSaati']:eq(" + eq + ")").val();
            if(teslimEdilen!="") {
                var data = {
                    "islem": jobID,
                    "action": "teslim",
                    "teslimalan": teslimEdilen,
                    "teslimsaati": teslimsaati
                };

                $.ajax({
                    url: window.localStorage.getItem("ipurl") + "/registerislemlerikurye",
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    beforeSend: function () {
                        //alert("işler geliyor "+window.localStorage.getItem("ipurl")+" islem:"+jobID);
                    },
                    error: function (a, b, c) {
                        alert("Hata:" + a.responseText);
                    },
                    success: function (data) {

                        if (!data.hasError) {

                            mypanel.getjobsOnkurye(window.localStorage.getItem("kuryeID"));
                            mypanel.getdeliveredjobsOnkurye(window.localStorage.getItem("kuryeID"));
                            alert("İşlem teslim edildi!");

                        } else {
                            alert("Teslim edilirken bir hata oluştu!"+data.msg);
                        }
                    }

                });

            }else{
                alert("Teslim edilen kişiyi giriniz!");
            }

        }
        
    },
    getjobback: function (jobID) {

        var data = {
            "id": jobID
        };

        $.ajax({
            url: window.localStorage.getItem("ipurl") + "/teslimedilenisigerialkurye",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            beforeSend: function () {
                //alert("işler geliyor "+window.localStorage.getItem("ipurl")+" kuryeID:"+kuryeID);
            },
            error: function (a, b, c) {
                alert("Hata: jobback" + a.responseText);
            },
            success: function (data) {

                if (!data.hasError) {

                    mypanel.getjobsOnkurye(window.localStorage.getItem("kuryeID"));
                    mypanel.getdeliveredjobsOnkurye(window.localStorage.getItem("kuryeID"));
                    alert("Teslimat geri alındı!");

                } else {
                    alert("İşlem geri alınırken bir hata oluştu!");
                }
            }

        });

    },
    getteslimsaati: function (eq) {

        var date=new Date();
        var day=date.getDate();
        var month=date.getMonth()+1;
        if(month<10){
            month="0"+month;
        }
        var year=date.getFullYear();
        var hour=date.getHours();
        if(hour<10){
            hour="0"+hour;
        }
        var minute=date.getMinutes();
        if(minute<10){
            minute="0"+minute;
        }
        var second=date.getSeconds();
        if(second<10){
            second="0"+second;
        }
        var teslimSaati=day+"-"+month+"-"+year+" "+hour+":"+minute+":"+second;
        $("input[name='teslimSaati']:eq("+eq+")").val(teslimSaati);
    }
};


mypanel.checklogin();
if(window.localStorage.getItem("kuryeID")!="" && window.localStorage.getItem("kuryeID")>0) {
    mypanel.getjobsOnkurye(window.localStorage.getItem("kuryeID"));
    mypanel.getdeliveredjobsOnkurye(window.localStorage.getItem("kuryeID"));
}
