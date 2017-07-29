$(document).ready(function() {

// on load setup 

 // $(".bookingsQuota").val(4800000);
 // $(".quotaReps").val(8);
 $(".salesCycleDays").val(120);
 $(".avgDealSize").val(20000);
 $(".winRate").val(20);

 $(".monthsRamp").val(6);
 $(".prodInput").val(25);


// this line needs to be fixed
$(".qualifiedDeals").val(  $(".bookingsQuota").val() /   $(".avgDealSize").val() / ( 360 / $(".salesCycleDays").val() ) / ($(".winRate").val() / 100 )  ); 

// value slider event listener

$(".prodSlider").mousemove(function() {
    $(".prodInput").val($(".prodSlider").val());
});

$(".prodInput").change(function() {
    $(".prodSlider").val($(".prodInput").val());
});

// bookings quota flux event
$(".bookingsQuota").change(function() {
    $(".qualifiedDeals").val(  Math.floor($(".bookingsQuota").val() /   $(".avgDealSize").val() / ( 360 / $(".salesCycleDays").val() ) / ($(".winRate").val() / 100 ))  );
});
$(".avgDealSize").change(function() {
    $(".qualifiedDeals").val(  Math.floor($(".bookingsQuota").val() /   $(".avgDealSize").val() / ( 360 / $(".salesCycleDays").val() ) / ($(".winRate").val() / 100 ))  );
});
$(".qualifiedDeals").change(function() {
    $(".bookingsQuota").val( $(".avgDealSize").val() * $(".qualifiedDeals").val() * ($(".winRate").val() / 100 ) * ( 360 / $(".salesCycleDays").val() )   ); 
});




// calculator submit event 
$(".calcSubmit").click(function(){

       $(".repAnnualQuota").val( $(".bookingsQuota").val() / $(".quotaReps").val() );
// validation 
    
    if( ( ($(".bookingsQuota").val() == "" ) || $(".quotaReps").val() == "" ) ) {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        event.preventDefault();
        
        $(".bookingsQuota").addClass("requiredField");
        $(".quotaReps").addClass("requiredField");
        $(".bookingsQuota").after("<p class='validatePlease' style='color: red;'>Please enter annual bookings quota in dollars.<p>");
        $(".quotaReps").after("<p class='validatePlease' style='color: red;'>Please enter number of quota carrying reps.<p>");
        console.log("validate failed");
        
    } else {
        
        $('html, body').animate({ scrollTop: $(".resultsSection").offset().top }, 'slow');
         
        $(".calc-section").removeClass("hiddenOnLoad");
        $(".resultsSection").removeClass("hiddenOnLoad");
        $(".content-wrapper").removeClass("noShow");
        
        $(".bookingsQuota").removeClass("requiredField");
        $(".quotaReps").removeClass("requiredField");
       
        $(".validatePlease").addClass("noShow");
        $(".pleaseCalculate").addClass("noShow");
// set variables


    var bookingsQuota =   $(".bookingsQuota").val();
    var quotaReps =  $(".quotaReps").val();
    var salesCycleDays =  $(".salesCycleDays").val();
    var avgDealSize =  $(".avgDealSize").val();
    var winRate =  $(".winRate").val();
    var repAnnualQuota =  $(".repAnnualQuota").val();
    var monthsRamp =  $(".monthsRamp").val();
    
// set the flexbile input of Qualified Deals in Pipeline

    var qualifiedDeals = $(".qualifiedDeals").val(); 
    
// seperte productivity increase modifier, currently it is fixed at 25% as this section has been removed
 
    var prodInput = $(".prodInput").val();
    
// modifiers for comparison 

    var increaseMulti = 1 + ((prodInput) / 100);
    var decreaseMulti = ((100 - prodInput) / 100);

    
// check that the multiplier is calculating correctly


//  results calculations 

var currentCosts =  avgDealSize * qualifiedDeals * (winRate / 100) / salesCycleDays ;
var futureCosts =  (avgDealSize * increaseMulti) * (qualifiedDeals * increaseMulti) * ((winRate / 100) * increaseMulti)  / (salesCycleDays * decreaseMulti) ;

var currentBookings =  (avgDealSize * qualifiedDeals * (winRate / 100) * (360 / salesCycleDays) ) ;
var futureBookings = (avgDealSize * increaseMulti) * (qualifiedDeals * increaseMulti) * ((winRate / 100) * increaseMulti)  *  (360 / (salesCycleDays * decreaseMulti)) ;

console.log( currentBookings );
console.log( futureBookings );

// outputs - for future iterations

 $("#salesCycleDaysGrowth").html(salesCycleDays * decreaseMulti);
 $("#avgDealSizeGrowth").html(avgDealSize * increaseMulti);
 $("#qualifiedDealsGrowth").html(qualifiedDeals * increaseMulti);
 $("#winRateGrowth").html(winRate * increaseMulti);
 $("#repAnnualQuotaGrowth").html(repAnnualQuota  * increaseMulti);
 $("#monthsRampGrowth").html(monthsRamp  * decreaseMulti);



$(".velocityOutcome").html( Math.floor((futureCosts - currentCosts) / currentCosts * 100 ).toLocaleString() + "%" );
$(".bookingsOutcome").html("$" + Math.floor(futureBookings - currentBookings ).toLocaleString() );

$(".velocityCurrent").html("$" + Math.floor( currentCosts  ).toLocaleString() );
$(".velocityAfter").html("$" + Math.floor(futureCosts ).toLocaleString()  );

$(".bookingsCurrent").html("$" + Math.floor(currentBookings ).toLocaleString() );
$(".bookingsAfter").html("$" + Math.floor(futureBookings).toLocaleString() );
 console.log("click debug");

    
    }
    
$(".current").height( ($(".chart-container").height()) * (1 - (prodInput / 100) ) );   
$(".after").height($(".chart-container").height()) ;  
});
    
// show/hide div functionality
/*
$(".angle-circle").click(function(){
    if( $(this).hasClass("angle-circle-down")) {
        $(this).parents(".calc-section").removeClass("calc-section-collapse")
    } else {
        $(this).parents(".calc-section").addClass("calc-section-collapse")
    }
    
    $(this).toggleClass("angle-circle-down");
});
console.log("calculator load");
*/
$(".tool-tip-icon").hover( function(){$(this).parent().parent().siblings().toggleClass("tool-tip-show"); } , function(){$(this).parent().parent().siblings().toggleClass("tool-tip-show"); } );

/* $(".tool-tip-icon").click( function() {
    $(this).parent().parent().siblings().toggleClass("tool-tip-show");
    }); */

});



























