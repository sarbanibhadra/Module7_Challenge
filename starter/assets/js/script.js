// var rootEl = document.getElementById("root");
var now = dayjs()
let timeMap = new Map();

// var titleEl = document.createElement("h1");
var currentDayEl = $('#currentDay');
console.log(now)
currentDayEl.text(now)

if (localStorage.getItem("myMap")) {
    timeMap = new Map(JSON.parse(localStorage.myMap));

} else {
    let timeMap = new Map();
}



var slot = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
var slotAMPM = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM"]
var currentHour = dayjs().hour()

for (var h in slot) {
    var timeBlock = $("<div >");
    var hour = slot[h];
    console.log(hour);    
    let timeDiv = $("<div>");
    timeDiv.text(slotAMPM[h]);
    //timeDiv.addClass('time-div');

    // 2nd column: events (big/wide)
    let descriptionDiv = $("<div>");
    let textAreaForDiv = $("<textarea>");
    textAreaForDiv.attr('id', 'textarea' + hour);
    localStorage.setItem('textarea' + hour, textAreaForDiv.text)

    descriptionDiv.append(textAreaForDiv);
    descriptionDiv.addClass("description");
    descriptionDiv.css("width", "80%");
   


    // creates floppy disk icon for save button
    let saveIcon = $('<i>');
    saveIcon.addClass("fa fa-save");

    // 3rd column: save button 
    let saveDiv = $("<div>");
    saveDiv.addClass("saveBtn ");
    saveDiv.attr('id',  hour);
 

    // add icon to save button
    saveDiv.append(saveIcon);

    // append all three individual blocks to the bigger div
    timeBlock.append(timeDiv, descriptionDiv, saveDiv);

    timeBlock.addClass("time-block row");

    console.log("currentHour="+ currentHour)
    if (currentHour > hour) {

        // if the hour has passed, make the background grey
        timeBlock.addClass("past");

    } else if (currentHour < hour) {

        // if the hour happens in the future, make the background green
        timeBlock.addClass("future");
        textAreaForDiv.attr("placeholder", "Enter a task to complete this hour...");

    } else {

        // make the background red
        timeBlock.addClass("present");
        textAreaForDiv.attr("placeholder", "Enter a task to complete this hour...");
    }

    // add completed time block to the main container 
    $("#time-content").append(timeBlock);

}

timeMap.forEach(function (text, key) {

    // load anything saved in localStorage onto the calendar

    let textAreaVar = "#textarea" + key;
    document.querySelector(textAreaVar).value = text;

});

// when the user clicks the save button on that hour it will be written to memory and persist with window reloads
$(".saveBtn").on('click', function () {

    let textAreaVar = "#textarea" + (this.id);


    // write to the daily timeMap Map
    timeMap.set((this.id), document.querySelector(textAreaVar).value);

    // write the Map to storage  
    localStorage.myMap = JSON.stringify(Array.from(timeMap.entries()));


});
