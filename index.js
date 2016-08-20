'use strict';

const timeParser = new (class TimeParser {
	/**
	 * Конструктор
	 */
	constructor () {
		this.time = {
			second: 1,
			minute: 60,
			hour: 60 * 60,
			day: 60 * 60 * 24
		};

		/* Алиасы */
		this.time.default = this.time.second;
		this.time.sec = this.time.second;
		this.time.min = this.time.minute;
		this.time.hr = this.time.hour;

		this.replaceSpace = /[ ]{2,}/g;
	}

	/**
	 * Возвращает милисекунды
	 *
	 * @param string name
	 *
	 * @return integer
	 */
	getTime (name) {
		return 1000 * (this.time[name] || this.time.default);
	}

	/**
	 * Парсирит строку со временем
	 *
	 * @param mixed time
	 *
	 * @return integer
	 */
	parse (time) {
		if (!time) {
			return this.getTime('default');
		}

		if (typeof time === 'number') {
			return time;
		}

		var divided = this._sanitize(time).split(' ');

		if (divided.length > 1) {
			var length = divided.length / 2;

			time = 0;

			for (var i = 0; i < length; ++i) {
				time += this.getTime(divided.pop()) * parseInt(divided.pop());
			}

			return time;
		}

		time = parseInt(divided[0]);

		if (!Number.isNaN(time)) {
			return time;
		}

		return this.getTime(divided[0]);
	}

	/**
	 * Чистик строку
	 *
	 * @param string str
	 *
	 * @return string
	 */
	_sanitize (str) {
		return str.trim().replace(this.replaceSpace);
	}
});

class Limiter {
	/**
	 * Конструктор
	 *
	 * @param mixed   time
	 * @param integer amount
	 */
	constructor (time,amount) {
		this.limit = this.amount = parseInt(amount || 0);
		this.time = timeParser.parse(time);

		this._updateLast();
	}

	/**
	 * Проверяет хватает ли запрсов для вызова
	 *
	 * @param integer amount
	 *
	 * @return boolean
	 */
	accept (amount) {
		if (this.getAmount() < amount) {
			return false;
		}

		this.amount -= amount;

		return true;
	}

	/**
	 * Сбрасывает кол-во доступных вызовов
	 */
	reset () {
		this._updateLast();

		this.amount = this.limit;
	}

	/**
	 * Возвращает кол-во доступных вызовов
	 *
	 * @return integer
	 */
	getAmount () {
		this._updateLast();

		return this.amount;
	}

	/**
	 * Возвращает ограничение на кол-во вызовов
	 *
	 * @return integer
	 */
	getLimit () {
		return this.limit;
	}

	/**
	 * Возвращает время интервала
	 *
	 * @return integer
	 */
	getTime () {
		return this.time;
	}

	/**
	 * Возвращает время последнего вызова
	 *
	 * @return integer
	 */
	getLast () {
		return this.last;
	}

	/**
	 * Обновляет время последнего вызова
	 */
	_updateLast () {
		this.last = Date.now();
	}
};

exports.TimeoutLimiter = class TimeoutLimiter extends Limiter {
	/**
	 * Конструктор
	 *
	 * @param mixed   time
	 * @param integer amount
	 */
	constructor (time,amount) {
		super(time,amount);

		this._timeout = null;
	}

	/**
	 * Проверяет хватает ли запрсов для вызова
	 *
	 * @param integer amount
	 *
	 * @return boolean
	 */
	accept (amount) {
		var isAccept = super.accept(amount);

		if (isAccept && !this._timeout) {
			this._timeout = setTimeout(this.reset.bind(this),this.time);
		}

		return isAccept;
	}

	/**
	 * Сбрасывает кол-во доступных вызовов
	 */
	reset () {
		super.reset();

		clearTimeout(this._timeout);
		this._timeout = null;
	}
};

exports.FireLimiter = class FireLimiter extends Limiter {
	/**
	 * Возвращает кол-во доступных запросов
	 *
	 * @return float
	 */
	getAmount () {
		var now = Date.now();

		var difference = Math.max(now - this.last,0);
		difference *= this.limit/this.time;
		difference += this.amount;

		this.last = now;

		return this.amount = Math.min(difference,this.limit);
	}
};
