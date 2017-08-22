let cal_days_in_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let cal_months = ["January", "February ", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
				"November", "December"];


function WeeklyCalendar(week_start_ts) {
	this.cal_current_date = new Date(parseInt(week_start_ts));
}


WeeklyCalendar.prototype.generateHTML = function(){
	let html = '<div class = "calendar_div">';
	let curr_day = this.cal_current_date.getDay();
	let start_date = new Date(this.cal_current_date);
	start_date.setDate(this.cal_current_date.getDate() - curr_day);
	let next_week_start = new Date(start_date);
	let prev_week_start = new Date(start_date);
	prev_week_start.setDate(start_date.getDate() - 7);
	next_week_start.setDate(start_date.getDate() + 7);

	html += '<ul class = "calendar_header">';
	html += '<li>';
	html += '<a href = "/weekly_calendar?week_start=' + prev_week_start.getTime() + '"> Prev </a>';
	html += '</li><li>';
	html += 'Week of: ' + start_date.toLocaleDateString();
	html += '</li><li>';
	html += '<a href = "/weekly_calendar?week_start=' + next_week_start.getTime() + '"> Next </a>';
	html += '</li>';
	html += '</ul>';
	
	html += '<ul class = "weekly_days">';
	for(let i = 0; i < 7; i++) {
		html += '<li>';
		html += cal_days_in_week[i] + '<br>';
		html += '<a href = "/sign_in?date=' + start_date.getTime() + '", target = "_blank">' + start_date.getDate() + '</a>';
		html += '</li>';
	
		start_date.setDate(start_date.getDate() + 1);
	}
	html += '</ul>';

	html += '</div>';

	this.html = html;
}


WeeklyCalendar.prototype.getHTML = function() {
  return this.html;
}

