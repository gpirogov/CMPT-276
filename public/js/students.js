var counter = 0;

$(document).ready(function(){

	$('#new-student-div').hide();

	$('#new-student-button').click(function(){
	  $('#info-div').hide();
	  $('#new-student-div').show();
	  $('#new-student-div').focus();
	});

	$('#delete-student-button').click(function(){
		var curId = $('#id').attr('value').toString();

		$.ajax({						//this doesnt work either...
		  url:'/students/'+curId,
		  type: 'delete'
		});

	});

	$('#prev-student-button').click(function(){
	  counter--;
	  $('#id').text(counter.toString());
	  $('#id').attr("value", counter.toString());
	  var curId = $('#id').attr('value').toString();
	  $('.form').attr("action", ("/students/" + curId));	//would have changed this to
	  $('.form2').attr("action", ("/students/" + curId));	//only 1 class if i had time.
	  $('.form3').attr("action", ("/students/{{" + curId + "}}?_method=DELETE"));
	  $('.form4').attr("action", ("/students/" + curId));
	  //alert("counter = " + counter);
	});

	$('#next-student-button').click(function(){
	  counter++;
	  $('#id').text(counter.toString());
	  $('#id').attr("value", counter.toString());
	  var curId = $('#id').attr('value').toString();
	  $('.form').attr("action", ("/students/" + curId));	//would have changed this to
	  $('.form2').attr("action", ("/students/" + curId));	//only 1 class if i had time.
	  $('.form3').attr("action", ("/students/{{" + curId + "}}?_method=DELETE"));
	  $('.form4').attr("action", ("/students/" + curId));
	  //alert("counter = " + counter);
	});

});

/*module.exports.testFunc = function (msg){
	console.log(msg);
	alert(msg);
};*/
