$(document).ready(function() {	
	$.ajax({
		url: "http://localhost:8000/Sales/1/"
	}).then(function(data) {
		console.log(data);
		$('.sales_id').append(data.id);
		//$('.person_id').append(data.person_id);
		//$('.transaction_date').append(data.transaction_date);
		//$('.amount_paid').append(data.amount_paid);
		//$('.paid').append(data.paid);
		//$('.register_id').append(data.register_id);
		
	});
});