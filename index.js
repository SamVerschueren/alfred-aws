'use strict';
const alfy = require('alfy');
const aws = require('./lib/aws');

const ONE_DAY = 86400000;

const getAPIs = () => {
	const cachedAPIs = alfy.cache.get('apis');

	if (cachedAPIs && cachedAPIs.version === alfy.meta.version) {
		return Promise.resolve(cachedAPIs.data);
	}

	return aws.apis().then(apis => {
		alfy.cache.set('apis', {
			version: alfy.meta.version,
			data: apis
		}, {maxAge: ONE_DAY});

		return apis;
	});
};

getAPIs()
	.then(operations => {
		const items = operations.map(operation => {
			const url = `http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/${operation.service}.html#${operation.name}-property`;

			return {
				title: operation.name,
				autocomplete: operation.name,
				subtitle: operation.serviceFullName,
				metatitle: operation.service,
				arg: url,
				quicklookurl: url,
				icon: {
					path: `./icons/${operation.icon}.png`
				}
			};
		});

		alfy.output(alfy.matches(alfy.input, items, (item, input) => {
			return item.title.toLowerCase().includes(input) || item.metatitle.toLowerCase().includes(input);
		}));
	});
