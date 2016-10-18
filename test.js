import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
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
