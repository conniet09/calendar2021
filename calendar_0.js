function logout() {
	fetch('/~/Calendar/logout', { method: 'POST'})
	location.href = '/~/Calendar/index'
}

let today = new Date();
let curMonth = today.getMonth();
let curYear = today.getFullYear();
let year = document.getElementById("year");
let month = document.getElementById("month");

const calendar = document.getElementById("calendar");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["S", "M", "T", "W", "T", "F", "S"];

let dHead = "<tr>";
for (dhead in days) {
	dHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
dHead += "</tr>";

document.getElementById("thead")
	.innerHTML = dHead;
monthAndYear = document.getElementById("monthAndYear");

function next() {
	curYear = (curMonth === 11) ? curYear + 1 : curYear;
	curMonth = (curMonth + 1) % 12;
	showCal(curMonth, curYear);
}

function previous() {
	curYear = (curMonth === 0) ? curYear - 1 : curYear;
	curMonth = (curMonth === 0) ? 11 : curMonth - 1;
	showCal(curMonth, curYear);
}

function showCal(month, year) {

	let firstDay = (new Date(year, month))
		.getDay();
	tbl = document.getElementById("calendar-body");
	tbl.innerHTML = "";

	monthAndYear.innerHTML = "<p class=\"pt-2\" id=\"head\-month\"> " + months[month] + "</p>" + " <p id=\"head\-year\">" + year + "</p>";
	year.value = year;
	month.value = month;

	let date = 1;
	for (let i = 0; i < 6; i++) {

		let row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else if (date > daysInMonth(month, year)) {
				break;
			} else {
				let cell = document.createElement("td");
				let cellText = document.createTextNode(date);
				if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
					cell.classList.add("active-cell");
				}
				cell.appendChild(cellText);
				row.appendChild(cell);
				date++;
			}

		}
		tbl.appendChild(row);
	}
}

function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32)
		.getDate();
}
