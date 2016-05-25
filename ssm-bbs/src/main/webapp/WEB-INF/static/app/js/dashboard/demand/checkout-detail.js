$(function(){
    $('#qyfwxt').addClass('active open');
    if (enterprises == 'henterprises') {
        $('#bqysqztc').addClass('active open');
        $('#bqyhfsq').addClass('active');
    } else if (enterprises == 'tenterprises') {
        $('#qqysqztc').addClass('active open');
        $('#qqyhfsq').addClass('active');
    } else if (enterprises == 'menterprises'){
        $('#qyfwgl').addClass('active open');
        $('#qyfwhfsq').addClass('active');
    } else {
        $('#public-service').addClass('active open');
        $('#checkout_demand').addClass('active');
    }

    $('#rating').raty({
        'cancel' : false,
        'half': true,
        'starType' : 'i',
        readOnly: true,
        score: score
    });
});
