$(function(){
    $('#public-service-accept').addClass('active open');
    $('#forwarding_demand').addClass('active');

    $('#rating').raty({
        'cancel' : false,
        'half': true,
        'starType' : 'i',
        readOnly: true,
        score: score
    });

});
