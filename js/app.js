/**
 * Created by hydee on 6/6/17.
 */
var baseURL = window.location.href;
$(document).on('submit', '#myForm', function(event){
    event.preventDefault();

    var input = $('.search-box').val().trim();
    if (input){
        console.log(encodeURI(input));
        window.location.replace(baseURL + 'search_result.html?q='+encodeURI(input));
    }
    return false;
});
