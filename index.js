'use strict';
const alfy = require('alfy');
const data = require('./data');

const items = data.map(api => {
	const url = `http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/${api.service}.html#${api.name}-property`;

	return {
		title: api.name,
		autocomplete: api.name,
		subtitle: api.serviceFullName,
		metatitle: api.service,
		arg: url,
		quicklookurl: url,
		icon: {
			path: `./icons/${api.icon}.png`
		}
	};
});

const matchingStrategy = (item, input) => {
	return item.title.toLowerCase().includes(input) || item.metatitle.toLowerCase().includes(input);
};

alfy.output(alfy.matches(alfy.input, items, matchingStrategy));
