/*
* @Author: Jacopo Essenziale
* @Date:   2018-03-04 12:02:30
* @Last Modified by:   jesse
* @Last Modified time: 2018-03-04 20:30:09
*/

const weather 	= require("openweather-node")
const Memobird 	= require('memobird');
const request 	= require('request').defaults({ encoding: null });
const pngToJpeg = require('png-to-jpeg');
const cron 		= require('node-cron');

const config	= require("./config/config");

const memobird = new Memobird({
  ak: config.memobird_ak,
  memobirdID: config.memobird_id,
});

weather.setAPPID(config.openweather_appid);
weather.setCulture(config.openweather_culture);

cron.schedule(config.updateCron, checkWeather);

function checkWeather()
{
	weather.now(config.mycity, function(err, aData)
	{	
		if(err) console.log(err);
		else
		{
			// Temperature
			var temp = aData.getDegreeTemp();
			// Condition Image
			var imgUrl = aData.getIconUrl() + ".png";

			// Download image to convert it
			request.get(imgUrl, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        var imgdata = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
			        var buffer = new Buffer(imgdata.split(/,\s*/)[1],'base64');
			        // Converting png to jpeg to remove transparency
			        pngToJpeg({quality: 100})(buffer).then(function(output){
			        	imgdata = "data:image/jpeg;base64," + new Buffer(output).toString('base64');
			        	memobird.init()
						.then(() => memobird.print(
							Memobird.encodeImage(imgdata, 100),
							Memobird.encodeText("Meteo di: " + aData.values.name),
							Memobird.encodeText(new Date(aData.values.dt * 1000).toString().split(" GMT")[0]),
							Memobird.encodeText("Condizioni: " + aData.values.weather[0].description),
							Memobird.encodeText("Nuvolosità: " + aData.values.clouds.all + "%"),
							Memobird.encodeText("Visibilità: " + aData.values.visibility + " m"),
							Memobird.encodeText("Temperatura : " + Math.floor(temp.temp) + "°"),
							Memobird.encodeText("Temperatura (min) : " + Math.floor(temp.temp_min) + "°"),
							Memobird.encodeText("Temperatura (max) : " + Math.floor(temp.temp_max) + "°"),
							Memobird.encodeText("Pressione: " + aData.values.main.pressure + " hPa"),
							Memobird.encodeText("Umidità: " + aData.values.main.humidity + "%"),
							Memobird.encodeText("Vento: " + aData.values.wind.speed + " m/s, " +  aData.values.wind.deg + "°")
						)).catch(error => console.log('Errore: ', error));
			        });
			    }
			});
		}
	});
}

