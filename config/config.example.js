/*
* @Author: Jacopo Essenziale
* @Date:   2018-03-04 16:22:48
* @Last Modified by:   jesse
* @Last Modified time: 2018-03-04 17:12:10
*/

var config = {};

config.memobird_ak 			= "YOUR_MEMOBIRD_AK";			// http://api.mymemobird.com/
config.memobird_id 			= "YOUR_MEMOBIRD_PRINTER_ID";	// Double tap the printer button to get its ID
config.openweather_appid 	= "YOUR_OPENWEATHER_APPID";		// Subscribe to OpenWeather: https://openweathermap.org/appid
config.openweather_culture 	= "YOUR_CULTURE_CODE"; 			// es. it, fr, ...

config.mycity 				= "Your City"					// The city you want to get the weather for
config.updateCron 			= "* * * * *"					// See https://crontab.guru/

module.exports = config;