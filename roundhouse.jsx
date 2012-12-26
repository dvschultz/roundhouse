/*
* ROUNDHOUSE    
* Simple: round all objects to nearest whole number
* Caveats: •currently forces to pixels
                • probably has a likely +1px rounding issue in some circumstanes
*/

//set to false to hide annoying alerts
var debug = false;


//checks if a doc is open
if (  app.documents.length > 0 ){
    main();
} else {
    alert("Please open a file before using Roundhouse")
}


//main loop
function main() {
    var docRef = app.activeDocument;

    //set units to pixels just to be safe
    with(docRef.viewPreferences){
        //alert(docRef.viewPreferences.horizontalMeasurementUnits);
        horizontalMeasurementUnits = MeasurementUnits.pixels;
        verticalMeasurementUnits = MeasurementUnits.pixels;
    }
        
    //loop through pageItems
    var myPageItems = app.selection;
    
    for (var j = 0; j < myPageItems.length; j++ ) {
        if (!(myPageItems[j].locked)) // Skip locked objects
            {
                myPageItems[j].fit(FitOptions.frameToContent); // Fit frame to content
                roundPageItem(myPageItems[j]); // Round object dimensions
            }
    }
    
}


//main rounding function
function roundPageItem(pageItem) {
    
    if (debug) alert('was:'+ pageItem.visibleBounds);
    
    //get and round all pageItem points
    var y1 = Math.round(pageItem.visibleBounds[0]);
    var x1 = Math.round(pageItem.visibleBounds[1]);
    var y2 = Math.ceil(pageItem.visibleBounds[2]);
    var x2 = Math.round(pageItem.visibleBounds[3]);
    
    //update pageItem points
    pageItem.visibleBounds = [y1,x1,y2,x2];
    
    if (debug) alert('now:'+ pageItem.visibleBounds);
}
