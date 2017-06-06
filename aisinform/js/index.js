/*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
var html = document.getElementsByTagName('html')[0];
//console.log(html);
/*取到屏幕的宽度*/
var width = window.innerWidth;
/* 640 100  320 50 */
var fontSize = 100 / 640 * width;
/*设置fontsize*/
if (width > 640) {
    fontSize = 100;
}
html.style.fontSize = fontSize + 'px';
window.onresize = function () {
    var html = document.getElementsByTagName('html')[0];
    //console.log(html);
    /*取到屏幕的宽度*/
    var width = window.innerWidth;
//        console.log(width);
    /* 640 100  320 50 */
    var fontSize = 100 / 640 * width;
//        console.log(fontSize);

    html.style.fontSize = fontSize + 'px';
}
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    zoom:true,
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true,
    autoplayDisableOnInteraction: false,
    observer: true,
    observeParents: true,

});
$(function () {
    $("#top").on("click", function () {
        window.location.href="./details.html?/"+Math.random();
    })
})
$(function () {
    $(".desc").on("click", function () {
        var mask = document.getElementById("mask");
        mask.style.display = "block";
        $("#mask").animate({left: "0%"})
    })
    $(".return").on("click", function () {
        //$("#mask").css({"display":"none"});
        $("#mask").animate({left: "100%"})

    })
    var sel = document.getElementById("sel");
    var txt = document.getElementById("free");
    txt.onchange = function () {
        var text = txt.value;
        if (text != " ") {
            var varOption = new Option(text, text);
            varOption.selected = "selected";
            sel.options.add(varOption);
        }
    }
});
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};

$("#btn").click(function () {
    var params = $("#myform").serialize();
    console.log(params);
    var name=$("#username").val();
    console.log(name);
    var sex=$("#sex").val();
    var userbirth=$("#userbirth").val();
    var edu=$("#edu").val();
    var pol=$("#pol").val();
    var sel=$("#sel").val();
    var school=$("#school").val();
    var adress=$("#adress").val();
    var useridcard=$("#useridcard").val();
    var useremail=$("#useremail").val();
    var userphone=$("#userphone").val();
    if( (name!="")&&(sex!="")&&(userbirth!="")&&(edu!="")&&(pol!="")&&(sel!="")&&(school!="")&&(adress!="")&&(useridcard!="")
        &&(useremail!="")&&(userphone!="")
    ){
        $.ajax({
            type: "POST",
            contentType:"application/x-www-form-urlencoded",
            url: "https://rest.cnaisin.com:8443/AXGY_OP/actVolunteer/add",
            data: params,
            success: function (msg) {
                console.log(msg)
                console.log(typeof msg.result);
                if(msg.result=="0"){
                    alert("请填写必填项");
                }
                else{
                    console.log(msg.result);
                    $("input[type=reset]").trigger("click");
                    window.location.href="./success.html?/"+Math.random();
//                            window.location.href="success.html"
                }
            }
        });
    }
    else{
        alert("请填写必填项");
        switch (true){
            case !name :{
              $("#username").prev("span").html("(请输入姓名)");
                $("#username").prev("span").css("color","red")
                break;
            }
            case !school :{
                $("#school").prev("span").html("(请输入学校)");
                $("#school").prev("span").css("color","red")
                break;
            }
            case !adress :{
                $("#adress").prev("span").html("(请输入地址)");
                $("#adress").prev("span").css("color","red")
                break;
            }
            case !useridcard :{
              $("#useridcard").prev("span").html("(请输入身份证)");
                $("#useridcard").prev("span").css("color","red")
                break;
            }
            case !useremail :{
              $("#useremail").prev("span").html("(请输入邮箱)");
                $("#useremail").prev("span").css("color","red")
                break;
            }
            case !userphone :{
              $("#userphone").prev("span").html("(请输入手机号)");
                $("#userphone").prev("span").css("color","red")
                break;
            }
        }
    }
})
var inpName=document.getElementById("username")
var regName=/^[\u4e00-\u9fa5]{2,}$/;
check(inpName,regName);
var inpSchool=document.getElementById("school");
//    var regSchool=/^[\u4e00-\u9fa5]{4,}$/;
var regSchool=/^[\u4e00-\u9fa5\-a-zA-Z\d]{4,}/
check(inpSchool,regSchool);
var  inpAdress=document.getElementById("adress");
var regAdress=/^(?=.*?[\u4E00-\u9FA5])[\d\u4E00-\u9FA5]+/
check(inpAdress,regAdress);

function IdentityCodeValid(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "输入错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "输入错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "输入错误";
                pass =false;
            }
        }
    }
    if(!pass){
        $("#span").css("color","red")
        $("#span").html("("+tip+")");
    }
    else{
        $("#span").css("color","green")
        $("#span").html("(输入正确)")
    }
    return pass;
}

$("#useridcard").on("blur", function () {
    var c=$("#useridcard").val();
    console.log(c);
    IdentityCodeValid(c);
})
var inpEmail=document.getElementById("useremail");
var regEmail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
check(inpEmail,regEmail);
var inpPhone=document.getElementById("userphone");
var regPhone=/^0?(13|14|15|18)[0-9]{9}$/
check(inpPhone,regPhone);
function check(inp, reg) {
    inp.onblur = function () {
        if (reg.test(this.value)) {
            this.previousElementSibling.innerHTML = "(输入正确)";
            this.previousElementSibling.className = "right";
        } else {
            this.previousElementSibling.innerHTML = " (输入错误)";
            this.previousElementSibling.className = "wrong";
        }
    };
}


