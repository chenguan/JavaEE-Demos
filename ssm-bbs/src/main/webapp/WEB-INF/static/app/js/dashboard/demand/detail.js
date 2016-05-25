$(function(){
    $('#public-service').addClass('active open');
    $('#demand').addClass('active');

    $('#rating').raty({
        'cancel' : false,
        'half': true,
        'starType' : 'i',
        readOnly: true,
        score: score
    });

});
