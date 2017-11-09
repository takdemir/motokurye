/**
 * Created by taner on 12.11.2016.
 */


document.addEventListener("deviceready",onDeviceReady,false);

<!--Device Ready Function-->
function onDeviceReady(){
    //alert("Device Ready");

    <!--Initializing Push Notification-->
    var push = PushNotification.init({

        <!--Setting attributes for Android, IOS and Windows-->
        android: {
            senderID: "809436805306"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    <!--This will alert registration ID which is returned by the GCM-->
    push.on('registration', function(data) {
        window.localStorage.setItem("regid",data.registrationId);
    });
    push.on('notification', function(data) {

        if(window.localStorage.getItem("kuryeID")!="" && window.localStorage.getItem("kuryeID")>0) {
            mypanel.getjobsOnkurye(window.localStorage.getItem("kuryeID"));
            mypanel.getdeliveredjobsOnkurye(window.localStorage.getItem("kuryeID"));
        }

        navigator.notification.alert(
            data.message,         // message
            null,                 // callback
            data.title,           // title
            'Tamam'                  // buttonName
        );


    });
    push.on('error', function(e) {
    });

}


var ajax={

    sessionID: null,
    sessionName: null,
    sessionKuryeId: null,
    getipurl: "https://tbmsoft.xyz",

    getip: function () {

        var sirketid=$("#txt-sirketid").val();
        var data={"sirketid":sirketid};

        $.ajax({
            url: ajax.getipurl+"/getsirketip",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            beforeSend: function () {
                //alert("ip alınıyor"+ajax.getipurl);
            },
            error: function (a,b,c) {
                alert("Hata:" + a.responseText);
            },
            success: function (data) {

                if(!data.hasError){
                    window.localStorage.setItem("ipurl",data.data);
                    ajax.login();
                }else{
                    alert(data.msg);
                }
            }

        });

    },
    login: function () {

        var username=$("#txt-email").val();
        var password=$("#txt-password").val();
        var data={"username":username,"password":password};

        $.ajax({
            url: window.localStorage.getItem("ipurl")+"/kuryelogin",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            beforeSend: function () {
                //alert(window.localStorage.getItem("ipurl"));
            },
            error: function (a,b,c) {
                alert("Hata:" + a.responseText);
            },
            success: function (data) {

                if(!data.hasError){
                    ajax.opensession(data.data.id,data.data.kuryeAdi);
                    ajax.creategcm();
                }else{
                    alert(data.msg);
                }
            }

        });
    },
    opensession: function (sessionKuryeId,kuryeName) {

        if (typeof(Storage) !== "undefined") {
            window.localStorage.setItem("kuryeID",sessionKuryeId);
            window.localStorage.setItem("kuryeName",kuryeName);
            if(window.localStorage.getItem("kuryeID")>0 && window.localStorage.getItem("kuryeID")!=""){
                window.location.href="mypage.html";
            }else{
                alert("Oturum açılamıyor. Lütfen yöneticinize başvurun!");
            }
        } else {

        }

    },

    creategcm: function () {

        var regid = window.localStorage.getItem("regid");
        var kuryeID = window.localStorage.getItem("kuryeID");
        var email = "";

        var data={"regid": regid,"kuryeID": kuryeID, "email":email}
        <!--Passing those values to the insertregid.php file-->
        $.ajax({
            url: window.localStorage.getItem("ipurl")+"/insertregid",
            type: "POST",
            data: JSON.stringify(data),
            dataType:'json',
            beforeSend: function () {
                //alert(regid);
            },
            error: function (a,b,c) {
              alert("hata:" + a.responseText);
            },
            success: function(data){
                //alert(data);
                if(!data.hasError){
                    return true;
                }
            }
        });

    },
    setlocation: function () {

        var regid = window.localStorage.getItem("regid");
        var kuryeID = window.localStorage.getItem("kuryeID");

        if(kuryeID!="" && kuryeID>0) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;



                    if (latitude != "" && longitude != "") {

                        var data = {"regid": regid, "kuryeID": kuryeID, "latitude": latitude, "longitude": longitude}
                        <!--Passing those values to the insertregid.php file-->
                        $.ajax({
                            url: window.localStorage.getItem("ipurl") + "/insertposition",
                            type: "POST",
                            data: JSON.stringify(data),
                            dataType: 'json',
                            beforeSend: function () {
                                //alert(regid);
                            },
                            error: function (a, b, c) {
                                alert("hata:" + a.responseText);
                            },
                            success: function (data) {
                                //alert(data);
                                if (!data.hasError) {
                                    return true;
                                }
                            }
                        });

                    }

                }, function () {

                },{enableHighAccuracy: true});
            }

        }





    },
    onError: function () {
        //alert("değişiklik yok");
    }

};


function callLocation() {
    ajax.setlocation();

}



ajax.setlocation();
setInterval("callLocation()",60000);