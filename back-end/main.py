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

# index page
@app.route('/')
def index():
    return "Please navigate to /trips to use this API"

# for testing in postman
@app.route('/test')
def test_route():
    return 'Test route is working'

# CRUD for trips
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


@app.route('/trips/<trip_id>', methods=['GET', 'DELETE'])
def trip(trip_id):
    trip_key = client.key(TRIPS, int(trip_id))
    trip = client.get(key=trip_key)

    if trip is None:
        return jsonify(error="Trip does not exist"), 404

    if request.method == 'GET':
        trip['id'] = trip.key.id
        return jsonify(trip)

    if request.method == 'DELETE':
        try:
            client.delete(trip_key)
            return '', 204
        except Exception as e:
            logging.error(f"Failed to delete trip {str(e)}")
            return jsonify(error="Failed to delete trip"), 500


@app.route('/trips/<trip_id>', methods=['PUT'])
def update_trip(trip_id):
    trip_key = client.key(TRIPS, int(trip_id))
    trip = client.get(key=trip_key)

    if trip is None:
        return jsonify(error="Trip does not exist"), 404

    content = request.get_json()

    trip.update({
        "trip_name": content["trip_name"],
        "description": content["description"],

    })
    client.put(trip)
    return '', 200


# CRUD for experiences
@app.route('/experiences', methods=['POST', 'GET'])
def experience_post():
    if request.method == 'POST':
        content = request.get_json()
        new_experience = datastore.entity.Entity(key=client.key(EXPERIENCES))
        new_experience.update({
            "experience_name": content["experience_name"],
            "description": content["description"]
        })
        client.put(new_experience)
        experience_id = new_experience.key.id
        new_experience.update({"self": f"https://updatethislater.com/experiences/{experience_id}"})
        client.put(new_experience)
        return jsonify(id=experience_id), 201
    elif request.method == 'GET':
        query = client.query(kind=EXPERIENCES)

        experiences = list(query.fetch())
        response = {
            'experiences': experiences
        }

        return jsonify(response)
    else:
        return jsonify(error='Method not recognized')


@app.route('/experiences/<experience_id>', methods=['GET', 'DELETE'])
def experience(experience_id):
    experience_key = client.key(EXPERIENCES, int(experience_id))
    experience = client.get(key=experience_key)

    if experience is None:
        return jsonify(error="Experience does not exist"), 404

    if request.method == 'GET':
        experience['id'] = experience.key.id
        return jsonify(experience)

    if request.method == 'DELETE':
        try:
            client.delete(experience_key)
            return '', 204
        except Exception as e:
            logging.error(f"Failed to delete experience {str(e)}")
            return jsonify(error="Failed to delete Experience"), 500


@app.route('/experiences/<experience_id>', methods=['PUT'])
def update_experience(experience_id):
    experience_key = client.key(EXPERIENCES, int(experience_id))
    experience = client.get(key=experience_key)

    if experience is None:
        return jsonify(error="Experience does not exist"), 404

    content = request.get_json()

    experience.update({
        "experience_name": content["experience_name"],
        "description": content["description"],

    })
    client.put(experience)
    return '', 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
