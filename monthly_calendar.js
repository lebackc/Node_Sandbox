let cal_days_in_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let cal_months = ["January", "February ", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
				"November", "December"];
let cal_current_date = new Date();


function MonthlyCalendar(month_start_ts) {
	this.cal_month_start = new Date(parseInt(month_start_ts));
}


MonthlyCalendar.prototype.generateHTML = function(){
	let curr_month = this.cal_month_start.getMonth();
	let curr_year = this.cal_month_start.getFullYear();
	let html = '<div class = "calendar_div">';
	let first_day = new Date(curr_year, curr_month, 1);
	let starting_day = first_day.getDay();
	let month_length = cal_days_in_month[curr_month];
	let prev_month_length = (curr_month == 0) ? cal_days_in_month[11] : cal_days_in_month[curr_month - 1];
	let next_month_start = new Date(first_day);
	let prev_month_start = new Date(first_day);
	let day = 1;

	next_month_start.setDate(first_day.getDate() + month_length);
	prev_month_start.setDate(first_day.getDate() - prev_month_length);

	html += '<ul class = "calendar_header">';
	html += '<li>';
	html += '<a href = "/calendar?month_start=' + prev_month_start.getTime() + '"> Prev </a>';
	html += '</li><li>';
	html += cal_months[curr_month] + ", " + curr_year;
	html += '</li><li>';
	html += '<a href = "/calendar?month_start=' + next_month_start.getTime() + '"> Next </a>';
	html += '</li>';
	html += '</ul>';
	
	html += '<ul class = "weekdays">';
	for(let i = 0; i < 7; i++) {
		html += '<li>';
		html += cal_days_in_week[i];
		html += '</li>';
	}
	html += '</ul>';

	for(let i = 0; i < 9; i++) {
		html += '<ul class = "days">';
		for(let j = 0; j < 7; j++) {
			html += '<li>';
			if(day <= month_length && (i > 0 || j >= starting_day)) {
				html += day;
				day++;
			}
			html += '</li>';
		}
		if(day > month_length) {
			break;
		} 
		else {
    		html += '</ul>';
		}
	}
	html += '</div>';

	this.html = html;
}

MonthlyCalendar.prototype.getHTML = function() {
  return this.html;
}

