// don't add db stuff here.

//INSERT INTO students VALUES(0, 'Clarke', 'Melissa', 'Female', 'Caucasian', 'Blonde', 'Brown', 165.0, 'lbs', 5, 10, 3.4);


var counter = 0;

$(document).ready(function(){

	$('#new-student-div').hide();

	$('#new-student-button').click(function(){
	  $('#info-div').hide();
	  $('#new-student-div').show();
	  $('#new-student-div').focus();

	  
	});

	$('#delete-student-button').click(function(){
		//var curId = $('#id').attr('value');
		console.log("test9");

		/*var data = {"key":"value"};
		$.ajax({
			//url: '/students/'+curId,
			url: '/students/1',
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function(response){
				console.log("test7");
			}
		});*/

		/*var testVar2 = $.get('./students/1', function(data){
			$("body")
			.append("Test: " + data.gpa);
		}, "json" );
		console.log(testVar2);
		alert(testVar2);*/

		$.get( "students/1", function( data ) {
		  $( ".result" ).html( data );
		  alert(data);
		  alert( "Load was performed." );
		});
	});

	$('#prev-student-button').click(function(){
	  counter--;
	  $('#id').text(counter.toString());
	  $('#id').attr("value", counter.toString());
	  var curId = $('#id').attr('value').toString();
	  $('.form').attr("action", ("/students/" + curId));
	  //alert("counter = " + counter);
	});

	$('#next-student-button').click(function(){
	  counter++;
	  $('#id').text(counter.toString());
	  $('#id').attr("value", counter.toString());
	  var curId = $('#id').attr('value').toString();
	  $('.form').attr("action", ("/students/" + curId));
	  //alert("counter = " + counter);
	});

});

/*module.exports = function() {
	this.foo = function(){

	};
	
	this.bar = function(){
		
	};
};*/



/*function nextStudent(){
	console.log("test6");
	$('#input-div').hide();
}*/