$(function(){
    $('#public-service').addClass('active open');
    $('#checkout_demand').addClass('active');

    $('#rating').raty({
        'cancel' : false,
        'half': true,
        'starType' : 'i',
        readOnly: true,
        score: score
    });

});
