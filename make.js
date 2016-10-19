#!/usr/bin/env node
'use strict';
const fs = require('fs');
const pify = require('pify');
const aws = require('./lib/aws');

const fsP = pify(fs);

/**
 * Make sure that all the icons exist.
 */
const checkIcons = apis => {
	const promises = apis.map(api => {
		return fsP.lstat(`icons/${api.icon}.png`)
			.catch(err => {
				if (err.code === 'ENOENT') {
					console.log(`Icon \`${api.icon}.png\` for service \`${api.service}\` could not be found`);
					api.icon = 'aws';
				} else {
					console.log(err);
				}
			});
	});

	return Promise.all(promises).then(() => apis);
};

aws.apis()
	.then(apis => checkIcons(apis))
	.then(apis => fsP.writeFile('data.json', JSON.stringify(apis, undefined, '	')));
