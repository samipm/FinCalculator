 function processFormData(){
// This JavaScript will
// Check input values
// Calculate output values
// Enable output form and display data

// JavaScript does not define different types of numbers, like integers, short, long, floating-point etc.
// JavaScript numbers are always stored as double precision floating point numbers, following the international IEEE 754 standard

// Validate the number of children
 	 var children_val = document.getElementById('Children');

// We append .value to the end of name so that it sets the variable name
// to be equal to a property which is the value, not the object.
	 if (children_val.value > 10){
		 alert( "Number of Children MUST be between 0 and 10" );
		 document.indata.Children.focus() ;
		 return false;
	 }

// Setup constant tables declaration
	 var INCTBL = [21000, 35000, 75000, 150000, 200000, 1000000];
 	 var BANDTBL = [2, 3, 4, 5, 6, 7];

	 var EXPENSESTBL = [
	 [26123.57, 28574.29, 31755.00, 34466.43, 38533.57, 40254.29],
	 [28782.86, 31181.43, 34205.71, 36812.86, 40723.57, 42392.14],
	 [33840.71, 36395.71, 39680.71, 42496.43, 46720.00, 48492.86],
	 [38116.43, 40775.71, 44217.14, 47189.29, 51569.29, 53446.43],
	 [42392.14, 45155.71, 48753.57, 51882.14, 56418.57, 58400.00],
	 [46667.86, 49535.71, 53290.00, 56575.00, 61267.86, 63353.57],
	 [50943.57, 53915.71, 57826.43, 61267.86, 66117.14, 68307.14],
	 [55219.29, 58295.71, 62362.86, 65960.71, 70966.43, 73260.71],
	 [59495.00, 62675.71, 66899.29, 70653.57, 75815.71, 78214.29],
	 [63770.71, 67055.71, 71435.71, 75346.43, 80665.00, 83167.86],
	 [16790.00, 19449.29, 22838.57, 25758.57, 30138.57, 31963.57]
     ];
            
 	 var TAXTBL = [
	 [0, 18200, 37000, 87000, 180000],
	 [0, 0.19, 0.325, 0.37, 0.45],
	 [0, 0, 3572, 19822, 54232]
	 ];

// Input variables declaration
 	 var gross_val = document.getElementById('Gross');
 	 var rental_val = document.getElementById('Rental');	 

// Output variables declaration
     var inc_tax_val = document.getElementById('inctax');
     var rent_inc_val = document.getElementById('rentinc');
     var tot_inc_val = document.getElementById('totinc');
     var expense_amt_val = document.getElementById('expenseamt');
	 var surplus_amt_val = document.getElementById('surplusamt');

// If any of the input values are negative or null then change to zero
	 if (gross_val.value < 0 || !gross_val.value){
		 gross_val.value = 0;
	 }

	 if (rental_val.value < 0 || !rental_val.value){
		 rental_val.value = 0;
	 }

	 if (children_val.value < 0 || !children_val.value){
		 children_val.value = 0;
	 }

// Calculate financial-calculator-test-1.1.xls Output Income Tax
	 var tbl_entry = TAXTBL[0].length;
	 var tax_pos = tbl_entry

	 for (var i = 0; i < tbl_entry; i++) {
		 if (TAXTBL[0][i] > gross_val.value) {
			 tax_pos = i;
			 break;
		 }
	 }

	 tax_pos  -= 1;
	 var inc_tax = (gross_val.value - TAXTBL[0][tax_pos]) * TAXTBL[1][tax_pos] + TAXTBL[2][tax_pos];

// Calculate financial-calculator-test-1.1.xls Output Rental Income
	 var rent_inc = rental_val.value * 0.8;

// Calculate financial-calculator-test-1.1.xls Output Total Income
	 var tot_inc = gross_val.value - inc_tax + rent_inc;

// Calculate financial-calculator-test-1.1.xls Output Expense
	 var tbl_entry = INCTBL.length;
	 var band_pos = tbl_entry;

	 for (var i = 0; i < tbl_entry; i++) {
		 if (tot_inc <= INCTBL[i]) {
			 band_pos = i;
			 break;
		 }
	 }
	 
     var inc_band = BANDTBL[band_pos] - 2;
	 var expense_amt = EXPENSESTBL[children_val.value][inc_band];

// Calculate financial-calculator-test-1.1.xls Output Surplus
	 var surplus_amt = tot_inc - expense_amt;

// Setup data to the output form in currency format using the replace command
     inc_tax_val.value = inc_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

// Setup data to the output form in currency format using API, this is the preferred method
     rent_inc_val.value = rent_inc.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
     tot_inc_val.value = tot_inc.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
     expense_amt_val.value = expense_amt.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
     surplus_amt_val.value = surplus_amt.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });

// Display the ouput form
	 document.forms['outdata'].style.display="block";
 }