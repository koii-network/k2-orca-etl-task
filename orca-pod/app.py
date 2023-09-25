# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request, Response
import cryo 
import polars as pl
import json


# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)

# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
def hello_world():
	return 'Hello World'


@app.route('/healthz', methods=['POST'])
def health():
	healthcheck = {
        "message": "OK",
        "status": 200,
        };
	# Return response
	response = Response(json.dumps(healthcheck), mimetype='application/json', status=200)
	return response

@app.route('/collect', methods=['POST'])
def collect_data():
	request_data = request.get_json()

	datatype = request_data['datatype']
	rpc_url = request_data['rpc_url']
	start_block = request_data['start_block']
	end_block = request_data['end_block']

	print("------------------------------------")
	print(datatype, rpc_url, start_block, end_block)

	blocks = [f'{start_block}:{end_block}']

	res = cryo.collect(datatype=datatype, output_format='list', hex=False, blocks=blocks, chunk_size=100, requests_per_second=10, max_concurrent_requests=1, rpc=rpc_url, json=True)
	response = Response(json.dumps(res), mimetype='application/json', status=200)
	return response

# main driver function
if __name__ == '__main__':
	app.run(port=8080)