// don't add db stuff here.

//INSERT INTO students VALUES(0, 'Clarke', 'Melissa', 'Female', 'Caucasian', 'Blonde', 'Brown', 165.0, 'lbs', 5, 10, 3.4);



$(document).ready(function(){

	$('#new-student-div').hide();

	$('#new-student-button').click(function(){
	  $('#info-div').hide();
	  $('#new-student-div').show();
	  $('#new-student-div').focus();

	  
	});

	$('new-student-submit-button').click(function(){
		var curId = 0;
		$.ajax({
			url: '/students'+curId,
			type: 'PUT',
			success: function(response){
				console.log("test7");
			}
		});
	});

	$('#next-student-button').click(function(){
	  console.log("test1");

	  var testVar = $.get('./students.html');

	  alert(testVar);
	  console.log(testVar);
	  console.log("test3");
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