'use strict';

var intervalDate = {
	date: {
		second: 1,
		minute: 60,
		hour: 60 * 60,
		day: 60 * 60 * 24
	},
	init: function(){
		this.date.default = this.date.second;
		this.date.sec = this.date.second;
		this.date.min = this.date.minute;
		this.date.hr = this.date.hour;
	},
	getDate: function(type){
		return 1000 * (this.date[type] || this.date['default']);
	},
	parse: function(date){
		var
		split = date.toString().split(' '),
		interval = 0;

		if (split.length > 2) {
			split.reverse();
			var length = split.length/2;

			for (var i = 0; i < length; ++i) {
				var
				num = split.pop(),
				key = split.pop();

				interval += this.getDate(key) * num;
			}

			return interval;
		} else if (split[1]) {
			interval += this.getDate(split[1]) * parseInt(split[0]);
		} else {
			var num = parseInt(split[0]);

			if (Number.isNaN(num)) {
				num = intervalDate.getDate(split[0]);
			}

			interval += num;
		}

		return interval;
	}
};

intervalDate.init();

module.exports = function(time,limit){
	this.interval = intervalDate.parse(time);

	this.limit = limit || 1;
	this.limit = parseInt(this.limit);
	this.amount = this.limit;

	this.last = Date.now();

	/**
	 * Возвращает кол-во оставшихся запросов
	 *
	 * @return float
	 */
	this.count = () => {
		var now = Date.now();

		var difference = Math.max(now - this.last,0);
		difference *= this.limit/this.interval;
		difference += this.amount;

		this.last = now;

		return this.amount = Math.min(difference,this.limit);
	};

	/**
	 * Убирает нужное кол-во запросов
	 *
	 * @param integer count
	 *
	 * @return boolean
	 */
	this.accept = (count) => {
		if (count > this.limit) {
			return false;
		}

		this.count();

		if (count > this.amount) {
			return false;
		}

		this.amount -= count;

		return true;
	};

	/**
	 * Сбрасывает кол-во доступных запросов
	 *
	 * @return integer
	 */
	this.reset = () => {
		return this.amount = this.limit;
	};
};
