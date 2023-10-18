import logging
logging.basicConfig(level=logging.DEBUG)

from google.cloud import datastore
from flask import Flask, request, jsonify, _request_ctx_stack, render_template, redirect
import requests
import logging
import urllib.parse
from urllib.parse import quote_plus

from functools import wraps
import json

from six.moves.urllib.request import urlopen
from flask_cors import cross_origin
from jose import jwt

import json
from os import environ as env
from werkzeug.exceptions import HTTPException

from dotenv import load_dotenv, find_dotenv
from flask import Flask
from flask import jsonify


from flask import session
from flask import url_for
from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode

app = Flask(__name__)

#initialize Datastore
client = datastore.Client()

TRIPS = "trips"
EXPERIENCES = "experiences"
USERS = "users"

@app.route('/')
def index():
    return "Please navigate to /trips to use this API"

# for testing in postman
@app.route('/test')
def test_route():
    return 'Test route is working'

@app.route('/trips', methods=['POST', 'GET'])
def trip_post():
    if request.method == 'POST':
        content = request.get_json()
        new_trip = datastore.entity.Entity(key=client.key(TRIPS))
        new_trip.update({
            "trip_name": content["trip_name"],
            "description": content["description"]
        })
        client.put(new_trip)
        trip_id = new_trip.key.id
        new_trip.update({"self": f"https://updatethislater.com/trips/{trip_id}"})
        client.put(new_trip)
        return jsonify(id=trip_id), 201
    elif request.method == 'GET':
        query = client.query(kind=TRIPS)

        trips = list(query.fetch())
        response = {
            'trips': trips
        }

        return jsonify(response)
    else:
        return jsonify(error='Method not recognized')




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
