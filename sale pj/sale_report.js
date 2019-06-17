$(document).ready(function() {
	$.ajax({
		url: "http://localhost:8000/Sales/1/"
	}).then(function(data) {
		console.log(data);
		/*alert(data.transaction_date);*/
		$('.person_id').append(data.person_id);
		/*var transaction_date=data.transaction_date;*/
		/*var d = new Date();*/
		/*transaction_date = moment().format(" DD MM YYYY")*/
        /*var transaction= transaction_date.toDateString();*/  
  
		//console.log(transaction_date.toDateString());
		 $('.transaction_date').append(data.transaction_date);
		// transaction_date.toISOString().slice(0,10);
		/*alert(transaction_date);*/
		/*$('.transaction_date').append( transaction_date.toDateString());*/
		$('.amount_paid').append(data.amount_paid);
		$('.paid').append(data.paid);
	});
});



