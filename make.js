#!/usr/bin/env node
'use strict';
const fs = require('fs');
const pify = require('pify');
const pathExists = require('path-exists');
const aws = require('./lib/aws');

const fsP = pify(fs);

const iconSet = new Set();

/**
 * Make sure that all the icons exist.
 */
const checkIcons = apis => {
	const promises = apis.map(api => {
		return pathExists(`icons/${api.icon}.png`)
			.then(exists => {
				if (!exists) {
					if (!iconSet.has(api.icon)) {
						iconSet.add(api.icon);
						console.log(`Icon \`${api.icon}.png\` for service \`${api.service}\` could not be found`);
					}
					api.icon = 'aws';
				}
			});
	});

	return Promise.all(promises).then(() => apis);
};

aws.apis()
	.then(apis => checkIcons(apis))
	.then(apis => fsP.writeFile('data.json', JSON.stringify(apis, undefined, '	')));
