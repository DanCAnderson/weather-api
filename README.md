# weather-api

Back-end API for use with OpenWeather API, as a way to hide the API key. Also finds the lattitude & longitude of a given city or zipcode, in order to consolidate front-end API calls into a single one.

## API Requests

Requests to the server should route through `/api`.

### Required Queries

One of the three following are required for current, daily or hourly weather data:
```
/api?q=current
/api?q=daily
/api?q=hourly
```

One of the three following location queries are required in addition.

City:
```
&city={city},{state},{country}
```
City can be used alone, or with country, or with state and country, but not city and state alone.

Zipcode (non-US zipcodes require country code):
```
&zip={zipcode},{country}
```

Lattitude and Longitude:
```
&lat={lat}&lon={long}
```

### Optional Queries

Units, defaults to metric (standard is kelvin)
```
&units={metric, imperial, or standard}
```

Language, defaults to English. Use two-letter codes found on [OpenWeather API docs](https://openweathermap.org/api/one-call-api#multi)
```
&lang={en,es,de...}
```
