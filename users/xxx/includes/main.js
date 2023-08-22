var urlSrv = main_url + 'users/' + user_id + '/'
var mobileInd = false;
var step = 1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
// mobile device detected
    mobileInd = true;
}
var sillyArr = ['', '152 GIFs .com', '52 GIFTs .com', '52 GIFs .com', '25 GIFs .com', '152 GIFs .com', '52GIFTs .com', '52 GIFs .biz', '25 GIFs .com', '52 GIFs .com'];

var vSrc = "http://captcha/users/xxx/images/52gifs_video.mp4"

function ini(arg) {
    var videoSrc = document.getElementById("video1")

    function setVideo() {
        videoSrc.innerHTML = '<source src="' + vSrc + '" type="video/mp4">'
    }

    setVideo()
    switch (arg) {
        case 1:
            str = '<div id="pic2">';
            for (i = 1; i < 10; i++) {
                str += '<div id="t' + i + '" class="tile" onclick="fClick(' + i + ')">';
                // str += '<img id="i' + i + '" src="images/answers/a100-' + i + '.jpg"  />';
                str += '<picture id="i' + i + '"> <source srcset="' + urlSrv + 'images/answers/a100-' + i + '.webp" type="image/webp">  <img src=http://android.ho.ua/node/users/xxx/images/answers/a100-' + i + '.jpg"></picture>';
                str += '</div>';
            }
            str += '</div>';
            $("#question").html('In the video I saw:');
            $("#pic").html(str);
            break;
        case 2:
            str = '<div id="pic2">';
            for (i = 1; i < 10; i++) {
                str += '<div id="t' + i + '" class="tile" onclick="fClick(' + i + ')"><div>' + sillyArr[i] + '</div></div>';
            }
            str += '</div>';
            $("#question").html('Website was:');
            $("#pic").html(str);
            break;
    }
}

var cntTrue = 0;
var cntFalse = 0;
var cntTrue2 = 0;
var cntFalse2 = 0;

function go() {
    switch (step) {
        case 1:
            for (i = 1; i < 10; i++) {
                if ($("#t" + i + " picture").hasClass("selected")) {

                    if ($("#t" + i).html().indexOf("x_100-1.jpg") > 0) {
                        cntTrue++
                    } else if ($("#t" + i).html().indexOf("x_100-2.jpg") > 0) {
                        cntTrue++
                    } else if ($("#t" + i).html().indexOf("x_100-6.jpg") > 0) {
                        cntTrue++
                    } else if ($("#t" + i).html().indexOf("x_100-7.jpg") > 0) {
                        cntTrue++
                    } else {
                        cntFalse++
                    }
                }
            }
            step = 2;
            $("#dot1").addClass("green");
            ini(2);
            break;
        case 2:
            for (i = 1; i < 10; i++) {
                if ($("#t" + i).hasClass("selected")) {

                    if (i == 3) {
                        cntTrue2++
                    } else if (i == 9) {
                        cntTrue2++
                    } else {
                        cntFalse2++
                    }
                }
            }

            $("#question").html(' ');
            if (cntTrue == 4 && cntFalse == 0 && cntTrue2 == 2 && cntFalse2 == 0) {
                $("#dot2").addClass("green");
                $("#pic").html("<span>Congratulations!</span>");
                setTimeout(function () {
                    modal.style.display = 'none';
                }, 1000);
                const userFunc = window[userFuncName]();
                resetCount()
                delScript(user_id)
            } else {
                $("#pic").html("<span>Better luck next time!</span>");
                setTimeout(function () {
                    modal.style.display = 'none';
                }, 1000);
                resetCount()
                delScript(user_id)
            }
            break;
    }
}

function resetCount() {
    step = 1
    con = ''
    cntTrue = 0;
    cntFalse = 0;
    cntTrue2 = 0;
    cntFalse2 = 0;
}

function fClick(id) {
    console.log("fClick:" + id + "; step:" + step);
    switch (step) {
        case 1:
            $("#i" + id).toggleClass("selected");
            console.log("fvasdf:");
            break;
        case 2:
            $("#t" + id).toggleClass("selected");
            break;
    }
}