import test from 'ava';
import alfyTest from 'alfy-test';

test('result', async t => {
	const alfy = alfyTest();
	const result = await alfy('ec2');

	t.deepEqual(result[0], {
		title: 'acceptReservedInstancesExchangeQuote',
		autocomplete: 'acceptReservedInstancesExchangeQuote',
		subtitle: 'Elastic Compute Cloud',
		metatitle: 'EC2',
		arg: 'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#acceptReservedInstancesExchangeQuote-property',
		quicklookurl: 'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#acceptReservedInstancesExchangeQuote-property',
		icon: {
			path: './icons/EC2.png'
		}
	});
});

test('fallback icon', async t => {
	const alfy = alfyTest();
	const result = await alfy('startsupport');

	t.deepEqual(result[0], {
		title: 'startSupportDataExport',
		autocomplete: 'startSupportDataExport',
		subtitle: 'Marketplace Commerce Analytics',
		metatitle: 'MarketplaceCommerceAnalytics',
		arg: 'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MarketplaceCommerceAnalytics.html#startSupportDataExport-property',
		quicklookurl: 'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MarketplaceCommerceAnalytics.html#startSupportDataExport-property',
		icon: {
			path: './icons/aws.png'
		}
	});
});
