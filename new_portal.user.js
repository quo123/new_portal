// ==UserScript==
// @name        new_portal
// @namespace   http://studentportal.spumanila.edu.ph/*
// @description Redesign SPU Manila student portal
// @include     http://studentportal.spumanila.edu.ph/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js
// @version     1.2
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
	var embed = $('embed');
	embed.parents('tr').remove();
	var contentWidth = $('body > table').width() > 835 ? 1054 : 835;
	document.title = 'SPU Manila Student Portal';
	
	append_css(contentWidth);
	
	$('body').css('background-color', '#214D07');
	$('body > table td > form > div > table').attr('bgcolor', '#214D07');
	$('body > table').attr('border', '0');

	var navBar = $('<nav>').addClass('topnav');
	var navList = $('<ul>');
	navBar.append(navList);

	replaceButton('Image9', 'Registration', navList);
	replaceButton('Image10', 'Enrollment', navList);
	replaceButton('Image12', 'My Grades', navList);
	replaceButton('Image8', 'My Ledger', navList);
	replaceButton('Image11', 'e-Purse', navList);
	replaceButton('Image13', 'Logout', navList);
	replaceButton('Image14', 'Login', navList);

	$('body').prepend(navBar);
	$('table td:first > p').prepend('<br>');

	//fix ID image aspect ratio
	$("td > img[width='150']").removeAttr('width');
});

function replaceButton(name, text, newLoc) {
	var oldButton = $("[name='" + name + "']");
	if (oldButton[0]) {
		var ref = oldButton.parents('a').attr('href');

		var newButton = $('<li>');
		newButton.append('<a>' + text + '</a>');
		newButton.addClass('nav-button noselect');
		if (ref === location.search && ref.indexOf('login') < 0) {
			newButton.addClass('current');
			document.title += ' - ' + text;
		}
		newButton.children('a').attr('href', ref);
		oldButton.parents('a').remove();

		newLoc.append(newButton);
	}
}

function append_css(contentWidth) {
	$('<style>').prop('type', 'text/css').html("\
.noselect {\
	-webkit-touch-callout: none;\
	-webkit-user-select: none;\
	-khtml-user-select: none;\
	-moz-user-select: none;\
	-ms-user-select: none;\
	user-select: none;\
}\
\
.topnav {\
	position: fixed;\
	width: " + contentWidth + "px;\
	margin: auto;\
	left: 0;\
	right: 0;\
	z-index: 10;\
}\
\
.topnav > ul {\
	margin: 0px;\
	padding: 0px;\
	list-style: outside none none;\
	display: flex;\
	align-items: center;\
	justify-content: center;\
}\
\
.nav-button {\
	flex: 1;\
}\
\
.nav-button > a {\
	padding: 10px;\
	display: inline-block;\
	color: #FFFFCD;\
	background: #4B4B4B none repeat scroll 0% 0%;\
	font-family: Tahoma,Geneva,sans-serif;\
	cursor: pointer;\
	text-decoration: none;\
	display: block;\
	text-align: center;\
}\
\
.nav-button:hover > a {\
	background: #DAEAD0 none repeat scroll 0% 0%;\
	color: #1B330C;\
}\
\
.current > a {\
	background: /*#96B285*/#FFFFCD none repeat scroll 0% 0%;\
	color: #356618;\
}\
\
	").appendTo('head');
}