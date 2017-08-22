let cal_days_in_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let cal_months = ["January", "February ", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
				"November", "December"];


function WeeklyCalendar(week_start) {
	this.cal_current_date = new Date(week_start);
}


WeeklyCalendar.prototype.generateHTML = function(){
	let html = '<div class = "calender_div">';
	let month_length = cal_days_in_month[this.cal_current_date.getMonth()];
	let curr_month = this.cal_current_date.getMonth();
	let curr_date = this.cal_current_date.getDate();
	let curr_day = this.cal_current_date.getDay();
	let curr_year = this.cal_current_date.getFullYear();
	let next_week_start;
	let prev_week_start;
	let start_date;
	//Week starts in previous month
	if(curr_date < (curr_day + 1)) {
		//Week starts in previous year
		if(curr_month == 0) {
			start_date = new Date((curr_year - 1), 11, 31 - (curr_day - curr_date));
			prev_week_start = new Date(start_date.getFullYear(), start_date.getMonth(), (start_date.getDate() - 7));
			next_week_start = new Date(curr_year, curr_month, (curr_date + (7 - curr_day)));
		}
		//After first month
		else {
			let prev_month = curr_month - 1;
			start_date = new Date(curr_year, prev_month, cal_days_in_month[prev_month] - (curr_day - curr_date));
			prev_week_start = new Date(start_date.getFullYear(), start_date.getMonth(), (start_date.getDate() - 7));
			next_week_start = new Date(curr_year, curr_month, (curr_date + (7 - curr_day)));
		}
	}
	//Starting date 
	else {
		start_date = new Date(curr_year, curr_month, (curr_date - curr_day));

		if(start_date.getDate() < 8) {
			if(curr_month == 0) {
				prev_week_start = new Date(curr_year - 1, 11, 31 - (7 - start_date.getDate()));
				next_week_start = new Date(curr_year, curr_month, (start_date.getDate() + 7));
			}
			else {
				let prev_month = curr_month - 1;
				prev_week_start = new Date(curr_year, prev_month, cal_days_in_month[prev_month] - (7 - start_date.getDate()));
				next_week_start = new Date(curr_year, curr_month, (start_date.getDate() + 7));
			}
		}
		else if(start_date.getDate() + 7 > month_length) {
			if(curr_month == 11) {
				prev_week_start = new Date(curr_year, curr_month, start_date.getDate() - 7);
				next_week_start = new Date(curr_year + 1, 0, (7 - month_length - start_date.getDate()));
			}
			else {
				let next_month = curr_month + 1;
				prev_week_start = new Date(curr_year, curr_month, start_date.getDate() - 7);
				next_week_start = new Date(curr_year, next_month, (7 - month_length - start_date.getDate()));
			}
		}
		else {
			prev_week_start = new Date(curr_year, curr_month, start_date.getDate() - 7);
			next_week_start = new Date(curr_year, curr_month, start_date.getDate() + 7);
		}
	}


	html += '<ul class = "calender_header">';
	html += '<li>';
	html += '<a href = "/weekly_calender?week_start=' + prev_week_start + '"> Prev </a>';
	html += '</li><li>';
	html += cal_days_in_week[curr_day] + ", " + cal_months[curr_month] + " " + curr_date + ", " + curr_year;
	html += '</li><li>';
	html += '<a href = "/weekly_calender?week_start=' + next_week_start + '"> Next </a>';
	html += '</li>';
	html += '</ul>';
	
	/*html += '<ul class = "weekdays">';
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
	}*/
	html += '</div>';

	this.html = html;
}


WeeklyCalendar.prototype.getHTML = function() {
  return this.html;
}

