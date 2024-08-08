import { coreLogic } from "./coreLogic";
import { app } from "./init";
import {
	namespaceWrapper,
	taskNodeAdministered,
} from "@_koii/namespace-wrapper";
import { OrcaPulse } from "orca-pulse";

/**
 * setup
 * @description sets up the task node, particularly the inter-process communication to start and stop the task
 * @returns {void}
 */
async function setup() {
	console.log("setup function called");
	// Run default setup
	const orcaPulse = new OrcaPulse();
	await orcaPulse.initialize(
		"docker.io/1703706/cryo:v1-slim ",
		"taskid1234",
		"ws://host.docker.internal:3003",
		"30000"
	);

	await namespaceWrapper.defaultTaskSetup();
	process.on("message", (m) => {
		console.log("CHILD got message:", m);
		if (m.functionCall == "submitPayload") {
			console.log("submitPayload called");
			coreLogic.submitTask(m.roundNumber);
		} else if (m.functionCall == "auditPayload") {
			console.log("auditPayload called");
			coreLogic.auditTask(m.roundNumber);
		} else if (m.functionCall == "executeTask") {
			console.log("executeTask called");
			coreLogic.task(orcaPulse);
		} else if (m.functionCall == "generateAndSubmitDistributionList") {
			console.log("generateAndSubmitDistributionList called");
			coreLogic.submitDistributionList(m.roundNumber);
		} else if (m.functionCall == "distributionListAudit") {
			console.log("distributionListAudit called");
			coreLogic.auditDistribution(m.roundNumber);
		}
	});
}

if (taskNodeAdministered) {
	setup();
}

if (app) {
	//  Write your Express Endpoints here.
	//  For Example
	//  app.post('/accept-cid', async (req, res) => {})

	// Sample API that return your task state

	app.get("/taskState", async (req, res) => {
		const state = await namespaceWrapper.getTaskState();
		console.log("TASK STATE", state);

		res.status(200).json({ taskState: state });
	});
	app.use("/api/", require("./routes"));
}
// const orcaPulseObject = this.orcaPulse

// module.exports={
//   orcaPulse
// }
