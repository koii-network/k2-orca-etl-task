import dotenv from "dotenv";
import axios from "axios";
import { OrcaPulse } from "orca-pulse";

const orca = new OrcaPulse();
import process from "process";

dotenv.config();

/**
 * TwitterTask is a class that handles the Twitter crawler and validator
 *
 * @description TwitterTask is a class that handles the Twitter crawler and validator
 *              In this task, the crawler asynchronously populates a database, which is later
 *              read by the validator. The validator then uses the database to prepare a submission CID
 *              for the current round, and submits that for rewards.
 *
 *              Four main functions control this process:
 *              @crawl crawls Twitter and populates the database
 *              @validate verifies the submissions of other nodes
 *              @getRoundCID returns the submission for a given round
 *              @stop stops the crawler
 *
 * @param {function} getRound - a function that returns the current round
 * @param {number} round - the current round
 * @param {string} searchTerm - the search term to use for the crawler
 * @param {string} adapter - the adapter to use for the crawler
 * @param {string} db - the database to use for the crawler
 *
 * @returns {TwitterTask} - a TwitterTask object
 *
 */

class TwitterTask {
	constructor(getRound, round) {
		this.round = round;
		this.lastRoundCheck = Date.now();
		this.isRunning = false;
		this.searchTerm = process.env.KEYWORD;
		this.adapter = null;
		this.setAdapter = async () => {
			const username = process.env.TWITTER_USERNAME;
			const password = process.env.TWITTER_PASSWORD;

			// if (!username || !password) {
			//   throw new Error(
			//     'Environment variables TWITTER_USERNAME and/or TWITTER_PASSWORD are not set',
			//   );
			// }

			// let credentials = {
			//   username: username,
			//   password: password,
			// };
			// this.adapter = new Twitter(credentials, this.db, 3);
			// await this.adapter.negotiateSession();
		};

		this.updateRound = async () => {
			// if it has been more than 1 minute since the last round check, check the round and update this.round
			if (Date.now() - this.lastRoundCheck > 60000) {
				this.round = await getRound();
				this.lastRoundCheck = Date.now();
			}
			return this.round;
		};
		this.start();
	}

	/**
	 * strat
	 * @description starts the crawler
	 *
	 * @returns {void}
	 *
	 */
	async start() {
		await this.setAdapter();

		let keyword;
		if (this.searchTerm === " " || this.searchTerm == undefined) {
			keyword = encodeURIComponent("#koii");
		} else {
			keyword = encodeURIComponent(this.searchTerm);
		}

		this.isRunning = true;

		let query = {
			limit: 100,
			searchTerm: keyword,
			query: `https://twitter.com/search?q=${keyword}&src=typed_query&f=live`,
			depth: 3,
			updateRound: async () => {
				return this.updateRound(); // TODO - verify that this works as an import
			},
			recursive: true,
			round: this.round,
		};

		orca
			.initialize(
				"docker.io/1703706/cryo:v1-slim ",
				"taskid1234",
				"ws://host.docker.internal:3003"
				// certificate,
			)
			.then(() => {
				orca
					.podCall("collect", {
						headers: {
							"Content-Type": "application/json",
						},
						body: {
							datatype: "blocks",
							start_block: "100000",
							end_block: "100005",
							rpc_url:
								"https://internal.ethereum.n.chaindeck.io/278e1b2ab91f2ca96f7b8761bf65b9b2",
						},
					})
					.then((collect) => {
						console.log("etl data", collect);
					})
					.catch((err) => {
						console.log("error is in collect podcall", err);
					});

				//  setTimeout(() =>
				// {
				//    orca.close()
				//   //  process.exit()
				// }, 5000)
			})
			.catch((error) => {
				console.log("inside catch error", error);
			});

		// this.adapter.crawl(query); // let it ride
	}

	/**
	 * stop
	 * @description stops the crawler
	 *
	 * @returns {void}
	 */
	async stop() {
		this.isRunning = false;
		this.adapter.stop();
		// orca.close()
	}

	/**
	 * getRoundCID
	 * @param {*} roundID
	 * @returns
	 */
	async getRoundCID(roundID) {
		console.log("starting submission prep for ");
		let result = await this.adapter.getSubmissionCID(roundID);
		console.log("returning round CID", result, "for round", roundID);
		return result;
	}

	/**
	 * getJSONofCID
	 * @description gets the JSON of a CID
	 * @param {*} cid
	 * @returns
	 */
	async getJSONofCID(cid) {
		return await getJSONFromCID(cid);
	}

	/**
	 * validate
	 * @description validates a round of results from another node against the Twitter API
	 * @param {*} proofCid
	 * @returns
	 */
	async validate(proofCid) {
		// in order to validate, we need to take the proofCid
		// and go get the results from web3.storage

		let data = await getJSONFromCID(proofCid); // check this
		// console.log(`validate got results for CID: ${ proofCid } for round ${ roundID }`, data, typeof(data), data[0]);

		// the data submitted should be an array of additional CIDs for individual tweets, so we'll try to parse it

		let proofThreshold = 4; // an arbitrary number of records to check

		for (let i = 0; i < proofThreshold; i++) {
			let randomIndex = Math.floor(Math.random() * data.length);
			let item = data[randomIndex];
			let result = await getJSONFromCID(item.cid);

			// then, we need to compare the CID result to the actual result on twitter
			// i.e.
			console.log("item was", item);
			if (item.id) {
				// TODO - revise this check to make sure it handles issues with type conversions
				console.log("ipfs", item);
				let ipfsCheck = await this.getJSONofCID(item.cid);
				console.log("ipfsCheck", ipfsCheck);
				if (ipfsCheck.id) {
					console.log("ipfs check passed");
				}
				return true;
			} else {
				console.log("invalid item id", item.id);
				return false;
			}
		}

		// if none of the random checks fail, return true
		return true;
	}
}

export default TwitterTask;

/**
 * getJSONFromCID
 * @description gets the JSON from a CID
 * @param {*} cid
 * @returns promise<JSON>
 */
const getJSONFromCID = async (cid) => {
	return new Promise((resolve, reject) => {
		let url = `https://${cid}.ipfs.dweb.link/data.json`;
		// console.log('making call to ', url)
		axios.get(url).then((response) => {
			if (response.status !== 200) {
				console.log("error", response);
				reject(response);
			} else {
				// console.log('response', response)
				resolve(response.data);
			}
		});
	});
};
