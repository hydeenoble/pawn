/**
 * Created by hydee on 6/10/17.
 */


// alert('I am shit!');
var URLString = window.location.href;
// var url = new URL(URLString);
// var searchInput = encodeURI(url.searchParams.get("q"));
searchInput = URLString.split("=")[1];
var totalPrice = 0;

function displySearchResult(searchInput, pageNumber){
    $.ajax(
        {
            url: "https://svcs.ebay.com/services/search/FindingService/v1?" +
            "OPERATION-NAME=findCompletedItems" +
            "&SERVICE-VERSION=1.0.0" +
            "&SECURITY-APPNAME=EMEHINOL-demo-PRD-27a98c702-469e444a" +
            "&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD" +
            "&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true"+
            "&paginationInput.pageNumber="+pageNumber+
            "&paginationInput.entriesPerPage=20"+
            "&keywords="+searchInput,
            type: "GET",
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);

                if (data.findCompletedItemsResponse[0].ack[0] === "Success") {
                    var _items = data.findCompletedItemsResponse[0].searchResult[0].item;
                    var _paginateOBJ = data.findCompletedItemsResponse[0].paginationOutput[0];
                    // console.log(data.findCompletedItemsResponse[0].paginationOutput[0]);
                    if (_items){
                        _items.forEach(function (_item) {
                            var item = '<li class="item">'
                                +'<div class="row">'
                                +'<div class="col-md-2 col-sm-4">'
                                +'<div class="adimg"><img src="'+_item.galleryURL[0]+'" alt="ad Name" /></div>'
                                +'</div>'
                                +'<div class="col-md-10 col-sm-8">'
                                +'<div class="jobinfo">'
                                +'<div class="row">'
                                +'<div class="col-md-8 col-sm-7">'
                                +'<h3><a href="#.">'+_item.title[0]+'</a></h3>'
                                +'<div class="cateName"> <a href="#.">'+'Category'+'</a> <i class="fa fa-angle-double-right" aria-hidden="true"></i> <a href="#.">'+_item.primaryCategory[0].categoryName+'</a> </div>'
                                +'<div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i> <span>'+ _item.location[0]+'</span></div>'
                                +'<div class="clearfix"></div>'
                                // +'<p class="test">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus...</p>'
                                // +'<div class="listbtn"><a href="#.">View Details</a></div>'
                                +'</div>'
                                +'<div class="col-md-4 col-sm-5 text-right">'
                                // +'<div class="adprice">'+_item.sellingStatus[0].currentPrice[0]['@currencyId']+' '+_item.sellingStatus[0].currentPrice[0].__value__+'</div>'
                                // +'<div class="adverify"><i class="fa fa-check-square-o" aria-hidden="true"></i> Verified Seller</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</li>';
                            $('.searchList').append(item);

                            totalPrice = totalPrice + parseInt(_item.sellingStatus[0].currentPrice[0].__value__);
                        });

                        $('.loading').hide();

                        // paginate(_paginateOBJ);


                        generatePrice(totalPrice / 20);
                    }

                }else {
                    $('.loading').text("Opps! Something went wrong");
                }

            },
            error: function(xhr, ajaxOptions, thrownError){
                console.log("Error..");
                console.log(xhr.status);
                console.log(xhr);
                $('.loading').text("Opps! Something went wrong. Please try again");
            }
        }
    );
}

function generatePrice(avg) {
    var buyPrice = (avg * 0.5).toFixed(2);
    var pawnPrice = (avg * 0.4).toFixed(2);
    var lowPrice = (avg * 0.3).toFixed(2);

    $('#buy-price').text("$ " + buyPrice);
    $('#pawn-price').text("$ " + pawnPrice);
    $('#low-price').text("$ " + lowPrice);
}
// function paginate(pg){
//     console.log("Paginate funtion", pg);
//
//     var from = ((pg.pageNumber[0] - 1) * pg.entriesPerPage[0]) + 1;
//     var to = (pg.pageNumber[0] * pg.entriesPerPage[0]);
//
//     var paginate_text = "Showing "+ from +" - "+ to +" of " + pg.totalEntries[0];
//     $('.showreslt').text(paginate_text);
//     $('#pageno').text(pg.pageNumber[0]);
//     // prev();
// }

// function prev() {
//
//     var page = parseInt($('#pageno').text()) - 1;
//     if (page >= 1){
//         $('.item').hide();
//         $('.loading').show();
//         displySearchResult(searchInput, page);
//     }
//
// }
//
//
// function next() {
//     $('.item').hide();
//     $('.loading').show();
//     var page = parseInt($('#pageno').text()) + 1;
//     // alert(parseInt($('#pageno').text()));
//     displySearchResult(searchInput, page);
// }

displySearchResult(searchInput, 1);
