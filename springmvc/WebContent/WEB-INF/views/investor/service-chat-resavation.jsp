<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE HTML >
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="/stylesheets/business-header.css" />
	<link rel="stylesheet" type="text/css" href="/stylesheets/service-chat-reservation.css" />
    
</head>

<body marginheight=0 marginwidth=0 topmargin=0 rightmargin=0 leftmargin=0>
	<jsp:include page="investor-header.jsp"></jsp:include>
    <div class="wrap">
        <p class="title">您当前预约的是：某某某公司</p>
        <p class="select_time">请选择时间：</p>
        <form action="#" method="#">
            <table>
                <tr>
                    <td align=left id="calOne" valign=top>
                        loading calendar one...
                    </td>
                </tr>
                <tr>
                    <td>
                        <button class="time_button first_but">一周之内</button>
                        <button class="time_button">一个月内</button>
                        <button class="time_button">三个月内</button>
                        <button class="time_button">半年内</button>
                        <button class="time_button">一年</button>
                        <button class="time_button">中秋</button>
                        <button class="time_button">国庆</button>
                    </td>
                </tr>
            </table>
            <p class="notice">
                您的姓名:
            </p>
            <input type="text">
            <p class="notice">
                您的联系方式:
            </p>
            <input type="text">
            <input class="reservation" type="submit" value="确认预约">
        </form>
    </div>
    
    <script  type="text/javascript" src="/javascripts/jq.js"></script>
    <script  type="text/javascript" src="/javascripts/jquery.color.js"></script>
    <script  type="text/javascript" src="/javascripts/jquery.animate.clip.js"></script>
    <script  type="text/javascript" src="/javascripts/jCal.js"></script>
    
    
    <script>
    $(document).ready(function() {
        $('#calOne').jCal({
            day: new Date(),
            days: 1,
            showMonths: 2,
            monthSelect: true,
            drawBack: function() {
                return false;
            },
            dCheck: function(day) {
                if (day.getTime() == (new Date('8/7/2008')).getTime())
                    return 'invday';
                else if (day.getDate() != 3)
                    return 'day';
                else
                    return 'day';
            },
            callback: function(day, days) {
                $('#calOneDays').val(days);
                $(this._target).find('.dInfo').remove();
                var dCursor = new Date(day.getTime());
                for (var di = 0; di < days; di++) {
                    var currDay = $(this._target).find('[id*=d_' + (dCursor.getMonth() + 1) + '_' + dCursor.getDate() + '_' + dCursor.getFullYear() + ']');
                    if (currDay.length) currDay.append('<div class="dInfo"><span style="color:#ccc">$</span>1231</div>');
                    dCursor.setDate(dCursor.getDate() + 1);
                }
                // if calling the function on already selected day(s)
                if (typeof $(this._target).data('day') == 'object' &&
                    $(this._target).data('day').getTime() == day.getTime() &&
                    $(this._target).data('days') == days) {
                    $('#calOneResult').append('<div style="clear:both; font-size:7pt;">' + days + ' days starting ' +
                        (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear() + ' RECLICKED</div>');
                } else {
                    $('#calOneResult').append('<div style="clear:both; font-size:7pt;">' + days + ' days starting ' +
                        (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear() + '</div>');
                }
                return true;
            }
        });

    });
    
    </script>
</body>

</html>
    