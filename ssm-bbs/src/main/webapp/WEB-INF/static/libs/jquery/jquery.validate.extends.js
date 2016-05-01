(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["", "jquery-validator"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
$.extend($.validator.messages, {
	required: "必须填写",
	remote: "已使用",
	email: "请输入有效的电子邮件",
	url: "请输入有效的网址",
	date: "请输入有效的日期",
	dateISO: "请输入有效的日期 (YYYY-MM-DD)",
	number: "请输入正确的数字",
	digits: "只可输入数字",
	creditcard: "请输入有效的信用卡号码",
	equalTo: "你的输入不相同",
	extension: "请输入有效的后缀",
	maxlength: $.validator.format("最多 {0} 个字"),
	minlength: $.validator.format("最少 {0} 个字"),
	rangelength: $.validator.format("请输入长度为 {0} 至 {1} 之间的字串"),
	range: $.validator.format("请输入 {0} 至 {1} 之间的数值"),
	max: $.validator.format("请输入不大于 {0} 的数值"),
	min: $.validator.format("请输入不小于 {0} 的数值")
});

var isDate = function(x){
    return "undefined" == typeof x.getDate;
};

$.extend($.validator.addMethod("isIdCardNo", function(value, element){
    if (this.optional(element)) {
        return true;
    }
    var idcard = value;
    var reg = /^\d{17}[0-9xX]$/i;
    if (!reg.test(idcard)) {
        return false;
    }
    var n = new Date();
    var y = n.getFullYear();
    if (parseInt(idcard.substr(6, 4)) < 1900 || parseInt(idcard.substr(6, 4)) > y) {
        return false;
    }
    var birth = idcard.substr(6, 4) + "-" + idcard.substr(10, 2) + "-" + idcard.substr(12, 2);
    if (!isDate(birth)) {
        return false;
    }
    iW = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    iSum = 0;
    for (i = 0; i < 17; i++) {
        iC = idcard.charAt(i);
        iVal = parseInt(iC);
        iSum += iVal * iW[i];
    }
    iJYM = iSum % 11;
    if (iJYM == 0) sJYM = "1";
    else if (iJYM == 1) sJYM = "0";
    else if (iJYM == 2) sJYM = "x";
    else if (iJYM == 3) sJYM = "9";
    else if (iJYM == 4) sJYM = "8";
    else if (iJYM == 5) sJYM = "7";
    else if (iJYM == 6) sJYM = "6";
    else if (iJYM == 7) sJYM = "5";
    else if (iJYM == 8) sJYM = "4";
    else if (iJYM == 9) sJYM = "3";
    else if (iJYM == 10) sJYM = "2";
    var cCheck = idcard.charAt(17).toLowerCase();
    if (cCheck != sJYM) {
        return false;
    }
    return true;
    }, "请正确填写您的身份证号码"));

}));

$.extend($.validator.addMethod("isLowLetterAndNum", function(value, element) {
    if (this.optional(element)) {
        return true;
    }
    var str = /^[a-z][a-z0-9]*$/;
    return str.test(value);
}, "只能包含小写字母和数字，并且以字母开头!"));

$.extend($.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码"));

$.extend($.validator.addMethod("isPassword", function(value) {
    var str =  /^(?![^a-zA-Z]+$)(?!\D+$).{8,30}$/;
    return str.test(value);
}, "请输入长度为 8 至 30 之间的字串，必须包含字母和数字!"));

$.extend($.validator.addMethod("isUsername", function(value) {
    var str =  /^[a-z][a-z0-9_]+$/;
    return str.test(value);
}, "必须是小写字母、数字或下划线，并且以字母开头!"));

$.extend($.validator.addMethod("isTel", function(value, element) {
    if (this.optional(element)) {
        return true;
    }
    var str =  /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    return str.test(value);
}, "请输入正确的格式(021-2222222-100)"));

$.extend($.validator.addMethod("isChineseAndEnglish", function(value) {
    var str =  /^[A-Za-z\u4e00-\u9fa5]+$/;
    return str.test(value);
}, "请输入中文或者英文!"));

$.extend($.validator.addMethod("isEntityCode", function(value) {
    var str =  /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/;
    return str.test(value);
}, "请输入正确的格式(12345678-x)"));

$.extend($.validator.addMethod("isBizRegNo", function(value) {
    var str =  /^(\d{15})$/;
    return str.test(value);
}, "请输入正确的格式"));
