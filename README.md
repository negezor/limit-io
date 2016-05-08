# limit-io
###Russian
Ограничитель запросов

## Использование
Инициализация, в конструктор можно передать значение interval integer или string, пример: 1 min 15 sec или (1000 * 60) + (1000 * 15)
* day - дни
* hour или hr - часы
* minute или min - минуты
* second или sec - секунды
```javascript
'use strict';

var io = require('limit-io');
var limit = new io(string|integer interval,integer amount);
// var limit = new io('1 day 5 hour 10 min 30 sec',150);
```
Кол-во доступных запросов, возвращает float или integer
```javascript
limit.count();
```
Убирает доступный запрос, возвращает boolean
```javascript
if (limit.accept(integer count)) {
	// Получилось
} else {
	// Не получилось
}
```
Обновляет кол-во доступных запросов, возвращает integer кол-во доступных запросов
```javascript
limit.reset();
```
Простой пример запроса
```javascript
var limit = new (require('limit-io'))('15 sec',2);

var last = 0;

var idInterval = setInterval(() => {
	if (limit.accept(1)) {
		console.log('Yes,',last,'second');
		last = 0;
	} else {
		console.log('No, 2 second');
		last += 2;
	}
},1000 * 2);

setTimeout(() => {
	clearInterval(idInterval);
},1000 * 20);

// Console:
// Yes, 0 second
// Yes, 0 second
// No, 2 second
// No, 2 second
// Yes, 4 second
// No, 2 second
// No, 2 second
// No, 2 second
// Yes, 6 second
```
# limit-io
###English
Limiter request

## Using
Initialization, the constructor can be passed interval integer or string value, for example: 1 min 15 sec, or (1000 * 60) + (1000 * 15)
* Day - days
* Hour, or hr - hours
* Minute or min - min
* Second or sec - seconds
```javascript
'use strict';

var io = require('limit-io');
var limit = new io(string|integer interval,integer amount);
// var limit = new io('1 day 5 hour 10 min 30 sec',150);
```
Number of available request, returns a float or integer
```javascript
limit.count();
```
Removes available request returns a boolean
```javascript
if (limit.accept(integer count)) {
	// Happened
} else {
	// Did not work out
}
```
Updates the number of available request, returns the integer number of available request
```javascript
limit.reset();
```
A simple example of a query
```javascript
var limit = new (require('limit-io'))('15 sec',2);

var last = 0;

var idInterval = setInterval(() => {
	if (limit.accept(1)) {
		console.log('Yes,',last,'second');
		last = 0;
	} else {
		console.log('No, 2 second');
		last += 2;
	}
},1000 * 2);

setTimeout(() => {
	clearInterval(idInterval);
},1000 * 20);

// Console:
// Yes, 0 second
// Yes, 0 second
// No, 2 second
// No, 2 second
// Yes, 4 second
// No, 2 second
// No, 2 second
// No, 2 second
// Yes, 6 second
```
