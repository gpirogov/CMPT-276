var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
     49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var bounds = [0,0,0,0,0,0,0,0,0,0,0];
var output = [0,0,0,0,0,0,0,0,0,0,0];
var histogramLength = bounds.length;

var histogramBarColors = ["rgb(221,126,107)",	// dark red
						  "rgb(234,153,153)",	// red
						  "rgb(249,203,156)",	// orange
					   	  "rgb(255,229,153)",	// yellow
						  "rgb(182,215,168)"]	// green
var histogramNameColors = ["rgb(166,28,0)",			// dark red
						  "rgb(204,0,0)",			// red
						  "rgb(230,145,56)",		// orange
					   	  "rgb(241,194,50)",		// yellow
						  "rgb(106,168,79)"]		// green
var histogramNumColors = histogramBarColors.length;


// copied bubble sort from https://khan4019.github.io/front-end-Interview-Questions/sort.html
function bubbleSort(arr){ 
   var len = arr.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(arr[j-1]>arr[j]){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}


function getGradeInfo(){
	// check if grades input has changed
	// if so: 
	var gradesSorted = bubbleSort(grades);
	grades = gradesSorted;
	// else do nothing
}


function updateBoundInfo(){
	var boundClassArr = document.getElementsByClassName("histogram-bound");
	for(var j = 0; j < histogramLength; j++){
		bounds[j] = boundClassArr[j].value;
	}
}

function calculateOutput(gradesArr, boundArr){

	var histogramVals = [0,0,0,0,0,0,0,0,0,0,0];
	var boundsLeft = histogramLength;
	var i = 0;

	var gradesArrLen = gradesArr.length;

	while(i < gradesArrLen){
		var curGrade = gradesArr[i];

		if (curGrade <= boundArr[boundsLeft]){
			if(curGrade == boundArr[boundsLeft]){ //fixes 1 edge case (without this, if "grades" var 
				if(boundsLeft == 0){			  //starts w/ a "100.00", the program will infinitely loop)
					histogramVals[boundsLeft]++;
					i++;
				}else{
					boundsLeft--;
				}
			}else{
				histogramVals[boundsLeft]++;
				i++;
			}
		}else{
			boundsLeft--;
		}
		//console.log("test");
	}
	return histogramVals;
}


function updateHistogram(){
	var histogram = document.getElementsByClassName("histogram-output");
	for(var j = 0; j < histogramLength; j++){
		curOutput = output[j];
		// learned about non-breaking space from https://www.computerhope.com/issues/ch001662.htm
		histogram[j].innerHTML= ("&nbsp;" + curOutput); // (just added so number wasn't sticking right to the side)
		histogram[j].style.width=((curOutput*2)+"em");	

		if (curOutput >= histogramNumColors){
			histogram[j].style.backgroundColor = histogramBarColors[histogramNumColors-1];
			histogram[j].style.color = histogramNameColors[histogramNumColors-1];
		}else if (curOutput > 0){
			histogram[j].style.backgroundColor = histogramBarColors[curOutput-1];
			histogram[j].style.color = histogramNameColors[curOutput-1];
		}else{
			histogram[j].style.backgroundColor = "rgb(204,204,204)";	// light grey
			histogram[j].style.color = "rgb(183,183,183)";				// grey
		}

		
	}
}

// this is effectively a "input change" event listener
function checkBoundValidity(newInput, inputNum){
	// learned about "isNaN" from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
	if(isNaN(newInput)){
		alert("Not a number! \nReverting input to previous value.");
		document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
		return;
	}else if(newInput == ""){
		alert("Cannot be blank! \nReverting input to previous value.");
		document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
		return;
	}else{ // then input is a number
		if(inputNum == 0){
			if(newInput > 100.00){ //let's assume bonus marks are possible
				alert("Max grade is over 100%! \nKeeping input, however, as \nperhaps bonus marks are possible.");
			}else if (newInput < grades[grades.length-1]){ 
				alert("Max bound cannot be less than any grade! \nReverting input to previous value.");
				document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
				return;
			}else if ((newInput - bounds[inputNum+1]) <= 0){
				alert("Cannot be less than or equal to a worse letter grade's lower bound! \nReverting input to previous value.");
				document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
				return;
			}
		}else if(inputNum == histogramLength-1){
			if(newInput < 0.00){ 
				alert("Cannot be negative! \nReverting input to previous value.");
				document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
				return;
			}else if ((newInput - bounds[inputNum-1]) >= 0){
				alert("Cannot be greater than or equal to a better letter grade's lower bound! \nReverting input to previous value.");
				document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
				return;
			}
		}else{
			if ((newInput - bounds[inputNum-1]) >= 0){
				alert("Cannot be greater than or equal to a better letter grade's lower bound! \nReverting input to previous value.");
				document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
				return;
			}else if ((newInput - bounds[inputNum+1]) <= 0){
				alert("Cannot be less than or equal to a worse letter grade's lower bound! \nReverting input to previous value.");
				document.getElementsByClassName("histogram-bound")[inputNum].value = bounds[inputNum];
				return;
			}

		}
	}

	//getGradeInfo();	// commented out as there's no way to change "grades" var from just the website
	updateBoundInfo();
	output = calculateOutput(grades,bounds);
	updateHistogram();
}



// learned about "load" event from https://stackoverflow.com/a/36096571
window.addEventListener("load", function(){
	getGradeInfo();
	updateBoundInfo();
	output = calculateOutput(grades,bounds);
	updateHistogram();
});