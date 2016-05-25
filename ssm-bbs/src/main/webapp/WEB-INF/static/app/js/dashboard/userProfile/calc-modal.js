$(function(){
    var tagId, tagName = "";
    var income = $("#income"), total = $("#total"), staff = $("#staff");
    var income_radio = $("#income_radio"), total_radio = $("#total_radio"), staff_radio = $("#staff_radio");
    var result = $("#result");
    var $staff_input = $("input[name=staff]"), $income_input = $("input[name=income]"), $total_input = $("input[name=total]");
    var $staff_1_text = $("#staff_1_text"), $staff_2_text = $("#staff_2_text"), $staff_3_text = $("#staff_3_text");
    var $income_1_text = $("#income_1_text"), $income_2_text = $("#income_2_text"), $income_3_text = $("#income_3_text");
    var $total_1_text = $("#total_1_text"), $total_2_text = $("#total_2_text"), $total_3_text = $("#total_3_text");

    income.addClass('hide');
    total.addClass('hide');

    $("#trade-133").attr({selected: "selected"});

    $("#user-tag-btn").click(function () {
        $("#tag").val(tagId);
    });

    var calculate = function () {
        var y = new Array();

        var staff = $("input[name='staff']:checked").val();
        if (staff != null) {
            if (staff == "1") {
                y[y.length] = 1;
            }
            if (staff == "2") {
                y[y.length] = 2;
            }
            if (staff == "3") {
                y[y.length] = 3;
            }
        }

        var income = $("input[name='income']:checked").val();
        if (income != null) {
            if (income == "1") {
                y[y.length] = 1;
            }
            if (income == "2") {
                y[y.length] = 2;
            }
            if (income == "3") {
                y[y.length] = 3;
            }
        }

        var total = $("input[name='total']:checked").val();
        if (total != null) {
            if (total == "1") {
                y[y.length] = 1;
            }
            if (total == "2") {
                y[y.length] = 2;
            }
            if (total == "3") {
                y[y.length] = 3;
            }
        }

        if (Math.min.apply(null, y) == 1) {
            tagName = "微型";
            tagId = 337;
        } else if (Math.min.apply(null, y) == 2) {
            tagName = "小型";
            tagId = 336;
        } else if (Math.min.apply(null, y) == 3) {
            tagName = "中型";
            tagId = 335;
        }
        result.text("您的企业规模为：" + tagName);
    };

    $("input").click(function () {
        calculate();
    });

    $("#trade").change(function () {
        staff.addClass('hide');
        income.addClass('hide');
        total.addClass('hide');
        result.text("");
        $staff_input.removeAttr("checked");
        $income_input.removeAttr("checked");
        $total_input.removeAttr("checked");

        switch($(this).val()) {
            case 133+"":
                staff.removeClass('hide');
                $staff_1_text.text("10人以下");
                $staff_2_text.text("10人及以上");
                $staff_3_text.text("100人及以上，300人以下");
                break;
            case 123+"":
                income.removeClass('hide');
                $income_1_text.text("50万以下");
                $income_2_text.text("50万及以上");
                $income_3_text.text("500万及以上，2亿以下");
                break;
            case 126+"":
                staff.removeClass('hide');
                $staff_1_text.text("20人以下");
                $staff_2_text.text("20人及以上");
                $staff_3_text.text("300人以上，1000人以下");
                income.removeClass('hide');
                $income_1_text.text("300万以下");
                $income_2_text.text("300万及以上");
                $income_3_text.text("2000万及以上，4亿以下");
                break;
            case 135+"":
                staff.removeClass('hide');
                $staff_1_text.text("5人以下");
                $staff_2_text.text("5人及以上");
                $staff_3_text.text("20人以上，200人以下");
                income.removeClass('hide');
                $income_1_text.text("1000万以下");
                $income_2_text.text("1000万及以上");
                $income_3_text.text("5000万及以上，4亿以下");
                break;
            case 130+"":
                staff.removeClass('hide');
                $staff_1_text.text("10人以下");
                $staff_2_text.text("10人及以上");
                $staff_3_text.text("50人以上，300人以下");
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("500万及以上，2亿以下");
                break;
            case 134+"":
                staff.removeClass('hide');
                $staff_1_text.text("20人以下");
                $staff_2_text.text("20人及以上");
                $staff_3_text.text("300人以上，1000人以下");
                income.removeClass('hide');
                $income_1_text.text("200万以下");
                $income_2_text.text("200万及以上");
                $income_3_text.text("3000万及以上，3亿以下");
                break;
            case 137+"":
                staff.removeClass('hide');
                $staff_1_text.text("20人以下");
                $staff_2_text.text("20人及以上");
                $staff_3_text.text("100人以上，200人以下");
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("1000万及以上，3亿以下");
                break;
            case 125+"":
                staff.removeClass('hide');
                $staff_1_text.text("20人以下");
                $staff_2_text.text("20人及以上");
                $staff_3_text.text("300人以上，1000人以下");
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("2000万及以上，3亿以下");
                break;
            case 131+"":
                staff.removeClass('hide');
                $staff_1_text.text("10人以下");
                $staff_2_text.text("10人及以上");
                $staff_3_text.text("100人以上，300人以下");
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("2000万及以上，1亿以下");
                break;
            case 128+"":
                staff.removeClass('hide');
                $staff_1_text.text("10人以下");
                $staff_2_text.text("10人及以上");
                $staff_3_text.text("100人以上，300人以下");
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("2000万及以上，1亿以下");
                break;
            case 124+"":
                staff.removeClass('hide');
                $staff_1_text.text("10人以下");
                $staff_2_text.text("10人及以上");
                $staff_3_text.text("100人以上，2000人以下");
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("1000万及以上，10亿以下");
                break;
            case 138+"":
                staff.removeClass('hide');
                $staff_1_text.text("10人以下");
                $staff_2_text.text("10人及以上");
                $staff_3_text.text("100人以上，300人以下");
                income.removeClass('hide');
                $income_1_text.text("50万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("1000万及以上，1亿以下");
                break;
            case 127+"":
                staff.removeClass('hide');
                $staff_1_text.text("100人以下");
                $staff_2_text.text("100人及以上");
                $staff_3_text.text("300人以上，1000人以下");
                income.removeClass('hide');
                $income_1_text.text("500万以下");
                $income_2_text.text("500万及以上");
                $income_3_text.text("1000万及以上，5000万以下");
                break;
            case 132+"":
                staff.removeClass('hide');
                $staff_1_text.text("10人以下");
                $staff_2_text.text("10人及以上");
                $staff_3_text.text("100人以上，300人以下");
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("8000万及以上，12亿以下");
                break;
            case 136+"":
                income.removeClass('hide');
                $income_1_text.text("300万以下");
                $income_2_text.text("300万及以上");
                $income_3_text.text("6000万及以上，8亿以下");
                total.removeClass('hide');
                $total_1_text.text("300万以下");
                $total_2_text.text("300万及以上");
                $total_3_text.text("5000万及以上，8亿以下");
                break;
            case 129+"":
                income.removeClass('hide');
                $income_1_text.text("100万以下");
                $income_2_text.text("100万及以上");
                $income_3_text.text("1000万及以上，20亿以下");
                total.removeClass('hide');
                $total_1_text.text("2000万以下");
                $total_2_text.text("2000万及以上");
                $total_3_text.text("5000万及以上，1亿以下");
                break;
        }
    });

});