'use strict';
const fs = require('fs');
const path = require('path');
const pify = require('pify');

const fsP = pify(fs);

const regexp = /^(.*?)-([0-9]{4}-[0-9]{2}-[0-9]{2})\.min\.json$/;
const dir = path.resolve(__dirname, '../node_modules/aws-sdk/apis');

const add = (result, match) => {
	if (!match) {
		return;
	}

	const service = match[1];
	const date = match[2];

	if (result[service]) {
		const currentDate = new Date(result[service]);
		const newDate = new Date(date);

		if (newDate - currentDate > 0) {
			result[service] = date;
		}
	} else {
		result[service] = date;
	}
};

const getOperationName = operation => {
	return operation[0].toLowerCase() + operation.slice(1);
};

const stripAmazon = x => x.replace('AWS', '').replace('Amazon', '').trim();

const getServiceName = data => {
	const name = data.metadata.serviceAbbreviation || data.metadata.serviceFullName;

	return stripAmazon(name).replace(/ /g, '');
};

const loadServiceMethods = (service, date) => {
	const data = require(path.join(dir, `${service}-${date}.min`));	// eslint-disable-line import/no-dynamic-require

	return Object.keys(data.operations).map(operation => {
		const name = getOperationName(operation);
		const service = getServiceName(data);
		const serviceFullName = stripAmazon(data.metadata.serviceFullName);

		let keywords = [
			service,
			name
		];
		keywords = keywords.concat(serviceFullName.split(' '));

		return {
			name,
			service,
			serviceFullName,
			icon: getServiceName(data).replace(/[^a-zA-Z0-9]/g, ''),
			keywords: keywords.join(' ')
		};
	});
};

exports.apis = () => fsP.readdir(dir)
	.then(files => {
		const result = {};

		for (const file of files) {
			const match = regexp.exec(file);

			add(result, match);
		}

		const promises = Object.keys(result).map(x => loadServiceMethods(x, result[x]));

		return Promise.all(promises);
	})
	.then(result => Array.prototype.concat.apply([], result));
