# node.weather.memobird
A node application that fetches information from openweather and print them on a memobird printer

# Pre-requisites
The application depends on the GraphicsMagick tool: http://www.graphicsmagick.org/

# Installation
* Clone repository.
* Run:
```
npm install
```

# Configuration
Create your own configuration file by copying the example file in config folder:
```
cd node.weather.memobird
cp config/config.example.js config/config.js
```
Fill up the configuration element as follow:

* config.memobird_ak --> enter the memobird access key, you can get one by filling up the module at http://api.mymemobird.com/
* config.memobird_id --> enter your printer id, you can get it by double tapping the memobird front button.
* config.openweather_appid --> subscribe to the openweather website to get access to the free api, and enter your api key here, https://openweathermap.org/appid
* config.openweather_culture --> usually your country id: it for italy, fr for france, es for spain and so on...
* config.mycity --> set it with the name of the country you want to fetch the weather for
* config.updateCron --> set a crontab entry to specify when the application should check for weather, you can find a useful tool to setup this field at: https://crontab.guru/

# Launching the application
From the application root directory, simply run:
```
node app.js
```
