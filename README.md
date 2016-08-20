[![Logo vk-io](https://github.com/negezor/limit-io/blob/master/Logo.png?raw=true)](https://www.npmjs.com/package/limit-io)

# LIMIT-IO

Удобный инструмент для работы с ограничением запросов

Где он пригодится? Например ограничение запросов на API

## Инициализация / Начало работы
### Установка модуля
```shell
npm install limit-io --save
```
### Инициализация экземпляров
Модуль содержит классы идентичных друг другу, отличаясь только контролем ограничений

```javascript
'use strict';

const Limiter = require('limit-io');

const limit = new Limiter.FireLimiter('1 day',100);
```

Базовый конструктор классов

##### Первый аргумент
Тип: `string` или `integer` в миллисекундах

Чаще всего будет передоваться строка, формат записи `integer string`, структура может повторятся много раз прописывая её через пробел

Доступные константы
* `day` - дни
* `hour` или `hr` - часы
* `minute` или `min` - минуты
* `second` или `sec` - секунды

```javascript
const limit = new Limiter.TimeoutLimiter('2 day 4 hour 47 min 33 sec',1000);
```

##### Второй аргумент
Тип: `integer`

Сколько доступно запросов за период времени

### Список классов
На данный момент включает в себя классы

#### TimeoutLimiter
Сбрасывает ограничение при истичения заданного интервала

Использует стандартный конструктор описанный выше

#### FireLimiter
Пропускает как только наберётся нужно количество запросов

Использует стандартный конструктор описанный выше

#### Есть ли доступные запросы

##### Первый аргумент
Тип: `integer` или `float`

Проверяет наличие запросов

```javascript
limit.accept(<Количество>); // -> boolean
```
#### Сброс достпных запрсов
```javascript
limit.reset();
```

### Геттеры
#### getAmount
Возвращает количество доступных запросов
```javascript
limit.getAmount(); // -> integer или float
```

#### getLimit
Возвращает количество ограничений запрсов
```javascript
limit.getLimit(); // -> integer
```

#### getTime
Возвращает время в миллисекундах  переданных в конструктор
```javascript
limit.getTime(); // -> integer
```

#### getLast
Возвращает время в миллисекундах последнего запроса
```javascript
limit.getLast(); // -> integer
```
