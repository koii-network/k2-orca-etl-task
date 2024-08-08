import dotenv from "dotenv";
require("dotenv").config();

import Gatherer from "../model/gatherer";
import levelup from "levelup";
import Twitter from "../adapters/twitter/twitter";
import leveldown from "leveldown";
const db = levelup(leveldown(__dirname + "/localKOIIDB"));
import Data from "../model/data";

const run = async () => {
	const args = process.argv.slice(2);

	var searchTerm = args.length > 0 ? args[0] : "Web3";

	let query = {
		limit: 100,
		searchTerm: searchTerm,
		query: `https://twitter.com/search?q=${searchTerm}&src=typed_query`,
		depth: 3,
		getRound: nameSpaceGetRoundMock,
		round: nameSpaceGetRoundMock(),
	};

	let options = {
		maxRetry: 3,
		query: query,
	};

	const username = process.env.TWITTER_USERNAME;
	const password = process.env.TWITTER_PASSWORD;

	let credentials = {
		username: username,
		password: password,
	};

	let data = new Data("twitter", db);

	let adapter = new Twitter(credentials, data, 3);

	await adapter.negotiateSession();

	await adapter.crawl(query);
	// const tweetIds = await adapter.fetchList(query.query);
	// console.log(tweetIds);

	// const dataz = await adapter.parseItem(tweetIds[0]);
	// console.log(dataz);
};

const nameSpaceGetRoundMock = () => {
	return 6;
};

run();
