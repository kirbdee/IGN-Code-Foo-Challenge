$('#three-calculate').click(function(){
	var intregexp = /^[0-9]{1,}$/;
	if(!intregexp.test($('#three-population').val())){ 
		alert('Please enter an integer' );
		return;
	}
	var result = calculate($('#three-population').val());
	$('#three-population2').val($('#three-population').val());
	$('#three-pattern').val(result.numbers + ' number(s), ' + result.letters + ' letter(s)');
	$('#three-plates').val(result.plates);
	$('#three-excess').val(result.excess);
});

function calculate(population){
	var lb = Math.floor( (Math.log(population)/Math.LN10) / (Math.log(26)/Math.LN10) );
	var ub = Math.ceil( Math.log(population)/Math.LN10 );
	var result = new Object();
	for(i=lb;i<=ub;i++){
		for(j=0;j<=i;j++){
			var temp_r = Math.pow(10,j) * Math.pow(26,i-j);
			if( (temp_r-population >= 0) && (result.excess == null || result.excess > temp_r-population)){
				result.letters = i-j;
				result.numbers = j;
				result.plates = temp_r;
				result.excess = temp_r-population;
			}
		}
	}
	return result;
}