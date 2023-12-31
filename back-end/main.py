import logging
logging.basicConfig(level=logging.DEBUG)

from google.cloud import storage, datastore
from flask import Flask, request, jsonify, _request_ctx_stack, render_template, redirect
import requests
import logging
import urllib.parse
from urllib.parse import quote_plus
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

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
CORS(app)

app.secret_key = 'SECRET_KEY'

#initialize GCP Datastore
client = datastore.Client()

# initialize GCP Storage
storage_client = storage.Client()

TRIPS = "trips"
EXPERIENCES = "experiences"
USERS = "users"

GCS_BUCKET = 'experience-bucket'


# Update the values of the following 3 variables
CLIENT_ID = 'W7GjTXrtLQHvXCAHkArWBDjuLZ8qWDmo'
CLIENT_SECRET = 'IXUDyQbH9ftnbICks8pBxQUGQ3h0i2lt1bRJidw5j6b6C8M2Z9L38SJRa3HaFn_S'
DOMAIN = 'crowd-source-travel-planner.us.auth0.com'

ALGORITHMS = ["RS256"]

oauth = OAuth(app)

auth0 = oauth.register(
    'auth0',
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    api_base_url="https://" + DOMAIN,
    access_token_url="https://" + DOMAIN + "/oauth/token",
    authorize_url="https://" + DOMAIN + "/authorize",
    client_kwargs={
        'scope': 'openid profile email',
    },
    server_metadata_url="https://" + DOMAIN + "/.well-known/openid-configuration"
)


# This code is adapted from https://auth0.com/docs/quickstart/backend/python/01-authorization?_ga=2.46956069.349333901.1589042886-466012638.1589042885#create-the-jwt-validation-decorator

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


# Verify the JWT in the request's Authorization header
def verify_jwt(request):
    try:
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization'].split()
            token = auth_header[1]
        else:
            logging.error("No Authorization header in request")
            raise AuthError({"code": "no auth header",
                            "description":
                                "Authorization header is missing"}, 401)

        jsonurl = urlopen("https://" + DOMAIN + "/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        try:
            unverified_header = jwt.get_unverified_header(token)
        except jwt.JWTError:
            logging.error("Failed to get unverified header from token")
            raise AuthError({"code": "invalid_header",
                            "description":
                                "Invalid header. "
                                "Use an RS256 signed JWT Access Token"}, 401)
        if unverified_header["alg"] == "HS256":
            logging.error("Invalid algorithm in token header")
            raise AuthError({"code": "invalid_header",
                            "description":
                                "Invalid header. "
                                "Use an RS256 signed JWT Access Token"}, 401)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=CLIENT_ID,
                    issuer="https://" + DOMAIN + "/"
                )
            except jwt.ExpiredSignatureError:
                logging.error("Token is expired")
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                logging.error("Incorrect claims in token")
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    " please check the audience and issuer"}, 401)
            except Exception as e:
                logging.error(f"Unknown error decoding token: {str(e)}")
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            return payload
        else:
            logging.error("No RSA key in JWKS")
            raise AuthError({"code": "no_rsa_key",
                            "description":
                                "No RSA key in JWKS"}, 401)
    except Exception as e:
        logging.error(f"Unhandled error in verify_jwt: {str(e)}")
        raise


# index page
@app.route('/')
def index():
    return "Welcome to the back end. Navigate to /trips or /experiences"

# for testing in postman
@app.route('/test')
def test_route():
    return 'Test route is working'


# image uploading
def make_bucket_public(bucket_name):
    """Makes a bucket publicly readable."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(experience-bucket)

    policy = bucket.get_iam_policy(requested_policy_version=3)
    policy.bindings.append({
        'role': 'roles/storage.objectViewer',
        'members': ['allUsers'],
    })

    bucket.set_iam_policy(policy)

    print(f'Bucket {bucket.name} is now publicly readable')


def upload_image_to_gcs(image_file, bucket_name):
    """Uploads the image to Google Cloud Storage and returns the public url"""
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(secure_filename(image_file.filename))

    blob.upload_from_file(image_file)

    return blob.public_url

from google.cloud import storage





@app.route("/dashboard")
def dashboard():
    return "Welcome to the dashboard."


# USERS
def add_user_to_database(sub):
    query = client.query(kind=USERS)
    query.add_filter('sub', '=', sub)
    user = list(query.fetch())
    if len(user) == 0:
        new_user = datastore.entity.Entity(key=client.key(USERS))
        new_user.update({"sub": sub})
        client.put(new_user)


# CRUD for trips
@app.route('/owners/<path:owner_id>/trips', methods=['GET'])
def get_public_trips(owner_id):
    try:
        encoded_owner_id = urllib.parse.quote(owner_id, safe='')  # because the authO has the '|' in datastore
        payload = verify_jwt(request)
    except AuthError as e:
        logging.error(f"JWT verification failed: {e.error}")
        return jsonify([])

    query = client.query(kind=TRIPS)
    query.add_filter('public', '=', True)
    if 'sub' in payload and payload['sub'] == encoded_owner_id:
        query.add_filter('owner', '=', encoded_owner_id)
    trips = list(query.fetch())

    for trip in trips:
        trip['id'] = trip.key.id

    logging.info(f"Retrieved trips for owner {owner_id}: {trips}")

    return jsonify(trips)


@app.route('/trips/<trip_id>/add_experience', methods=['POST'])
def add_experience_to_trip(trip_id):
    try:
        payload = verify_jwt(request)
        user_sub = payload.get('sub')
    except AuthError as e:
        return jsonify(error=e.error), e.status_code

    content = request.get_json()
    experience_id = content.get('experience_id')

    if not experience_id:
        return jsonify({"error": "Experience ID is required"}), 400

    trip_key = client.key(TRIPS, int(trip_id))
    trip = client.get(key=trip_key)

    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    if trip.get('owner') != user_sub:
        return jsonify({"error": "You do not have permission to modify this trip"}), 403

    if 'experiences' not in trip:
        trip['experiences'] = []

    if experience_id not in trip['experiences']:
        trip['experiences'].append(experience_id)
        client.put(trip)
        return jsonify({"success": "Experience added to trip"}), 200
    else:
        return jsonify({"error": "Experience already added to trip"}), 400



@app.route('/trips', methods=['POST', 'GET'])
def trip_post():
    if request.method == 'POST':
        try:
            payload = verify_jwt(request)
        except AuthError as e:
            return jsonify(error=e.error), 401

        content = request.get_json()
        new_trip = datastore.entity.Entity(key=client.key(TRIPS))
        new_trip.update({
            "trip_name": content["trip_name"],
            "description": content["description"],
            "experiences": [],
            "owner": payload.get('sub')
        })
        client.put(new_trip)
        trip_id = new_trip.key.id
        trip_id = new_trip.key.id
        new_trip.update({"self": f"https://travel-planner-467.wl.r.appspot.com/trips/{trip_id}"})
        client.put(new_trip)
        return jsonify(id=trip_id), 201
    elif request.method == 'GET':
        try:
            payload = verify_jwt(request)
            owner_id = payload.get('sub')
        except AuthError:
            owner_id = None

        query = client.query(kind=TRIPS)

        if owner_id:
            query.add_filter('owner', '=', owner_id)
            trips = list(query.fetch())
        else:
            trips = []

        # trips = list(query.fetch())
        response = {
            'trips': trips
        }

        return jsonify(response)
    else:
        return jsonify(error='Method not recognized')


@app.route('/trips/<trip_id>', methods=['GET', 'DELETE'])
def trip(trip_id):
    try:
        payload = verify_jwt(request)
    except AuthError as e:
        return jsonify(error=e.error), 401

    # Get the trip entity from Datastore
    trip_key = client.key(TRIPS, int(trip_id))
    trip = client.get(key=trip_key)

    if trip is None:
        return jsonify(error="Trip does not exist"), 404

    if request.method == 'GET':
        # Initialize an empty list for associated experiences
        associated_experiences = []

        # Check if the trip has associated experiences
        if 'experiences' in trip:
            # Iterate over each experience ID and fetch the experience from Datastore
            for exp_id in trip['experiences']:
                experience_key = client.key(EXPERIENCES, int(exp_id))
                experience = client.get(key=experience_key)
                if experience:
                    # Add the experience data to the associated experiences list
                    associated_experiences.append(experience)

        # Add the associated experiences to the trip's data
        trip['associated_experiences'] = associated_experiences

        return jsonify(trip)

    if request.method == 'DELETE':
        try:
            payload = verify_jwt(request)
        except AuthError as e:
            return jsonify(error=e.error), 401

        try:
            client.delete(trip_key)
            return '', 204
        except Exception as e:
            logging.error(f"Failed to delete trip {str(e)}")
            return jsonify(error="Failed to delete trip"), 500


@app.route('/trips/<trip_id>', methods=['PUT'])
def update_trip(trip_id):
    try:
        payload = verify_jwt(request)
    except AuthError as e:
        return jsonify(error=e.error), 401

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

@app.route('/owners/<path:owner_id>/experiences', methods=['GET'])
def get_public_experiences(owner_id):
    try:
        encoded_owner_id = urllib.parse.quote(owner_id, safe='')  # because the authO has the '|' in datastore
        payload = verify_jwt(request)
    except AuthError as e:
        logging.error(f"JWT verification failed: {e.error}")
        return jsonify([])

    query = client.query(kind=EXPERIENCES)
    query.add_filter('public', '=', True)
    if 'sub' in payload and payload['sub'] == encoded_owner_id:
        query.add_filter('owner', '=', encoded_owner_id)
    experiences = list(query.fetch())

    for experience in experiences:
        experience['id'] = experience.key.id

    logging.info(f"Retrieved experiences for owner {owner_id}: {experiences}")

    return jsonify(experiences)

# endpoint for images
@app.route('/experiences/<experience_id>/image', methods=['POST'])
def upload_experience_image(experience_id):
    """Endpoint to upload an image for a specific experience"""
    try:
        payload = verify_jwt(request)
    except AuthError as e:
        return jsonify(error=e.error), 401

    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify(error="No selected file"), 400
    if file:
        image_url = upload_image_to_gcs(file, GCS_BUCKET)

        # Update the datastore entity with the image URL
        client = datastore.Client()
        key = client.key(EXPERIENCES, int(experience_id))
        experience = client.get(key)

        if experience is None:
            return jsonify(error="Experience does not exist"), 404

        experience['image_url'] = image_url
        client.put(experience)

        return jsonify(image_url=image_url), 200


@app.route('/experiences/search', methods=['GET'])
def search_experiences():
    # Get the keyword and location from query params
    keyword = request.args.get('keyword', '').lower()
    city = request.args.get('city', '').lower()
    country = request.args.get('country', '').lower()

    # Build the query
    query = client.query(kind=EXPERIENCES)
    query.add_filter('public', '=', True)

    # Fetch all the experiences first
    experiences = list(query.fetch())

    # Filter experiences by keyword and location
    filtered_experiences = [exp for exp in experiences if
                            keyword in exp['description'].lower() or keyword in exp['experience_name'].lower()]

    # If city or country filters are set, apply them
    if city:
        filtered_experiences = [exp for exp in filtered_experiences if city == exp['city'].lower()]
    if country:
        filtered_experiences = [exp for exp in filtered_experiences if country == exp['country'].lower()]

    # Add id to experiences
    for experience in filtered_experiences:
        experience['id'] = experience.key.id

    return jsonify(filtered_experiences)


@app.route('/experiences', methods=['POST', 'GET'])
def experience_post():
    if request.method == 'POST':
        try:
            payload = verify_jwt(request)
        except AuthError as e:
            return jsonify(error=e.error), 401

        content = request.get_json()
        new_experience = datastore.entity.Entity(key=client.key(EXPERIENCES))
        new_experience.update({
            "experience_name": content["experience_name"],
            "activity_type": content["activity_type"],
            "rating": content["rating"],
            "address": content["address"],
            "city": content["city"],
            "country": content["country"],
            "description": content["description"],
            "public": content["public"],
            "latitude": content["latitude"],
            "longitude": content["longitude"],
            "owner": payload.get('sub')
        })
        client.put(new_experience)
        experience_id = new_experience.key.id
        new_experience.update({"self": f"https://travel-planner-467.wl.r.appspot.com/experiences/{experience_id}"})
        client.put(new_experience)
        return jsonify(id=experience_id), 201
    elif request.method == 'GET':
        try:
            payload = verify_jwt(request)
            owner_id = payload.get('sub')
        except AuthError:
            owner_id = None

        query = client.query(kind=EXPERIENCES)

        # this will only show owners of logged in entities
        if owner_id:
            query.add_filter('owner', '=', owner_id)
        else:
            query.add_filter('public', '=', True)

        experiences = list(query.fetch())
        response = {
            'experiences': experiences
        }

        return jsonify(response)
    else:
        return jsonify(error='Method not recognized')


@app.route('/experiences/<experience_id>', methods=['GET', 'DELETE'])
def experience(experience_id):
    try:
        payload = verify_jwt(request)
    except AuthError as e:
        return jsonify(error=e.error), 401

    experience_key = client.key(EXPERIENCES, int(experience_id))
    experience = client.get(key=experience_key)

    if experience is None:
        return jsonify(error="Experience does not exist"), 404

    if request.method == 'GET':
        experience['id'] = experience.key.id
        return jsonify(experience)

    if request.method == 'DELETE':
        try:
            payload = verify_jwt(request)
        except AuthError as e:
            return jsonify(error=e.error), 401

        try:
            client.delete(experience_key)
            return '', 204
        except Exception as e:
            logging.error(f"Failed to delete experience {str(e)}")
            return jsonify(error="Failed to delete Experience"), 500


@app.route('/experiences/<experience_id>', methods=['PUT'])
def update_experience(experience_id):
    try:
        payload = verify_jwt(request)
    except AuthError as e:
        return jsonify(error=e.error), 401

    experience_key = client.key(EXPERIENCES, int(experience_id))
    experience = client.get(key=experience_key)

    if experience is None:
        return jsonify(error="Experience does not exist"), 404

    content = request.get_json()

    experience.update({
        "experience_name": content["experience_name"],
        "activity_type": content["activity_type"],
        "rating": content["rating"],
        "address": content["address"],
        "city": content["city"],
        "country": content["country"],
        "description": content["description"],
        "public": content["public"],
        "latitude": content["latitude"],
        "longitude": content["longitude"]

    })
    client.put(experience)
    return '', 200



@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    add_user_to_database(token.get("sub"))

    # checks that 'id_token' is present in the response
    if 'id_token' not in token:
        return "ID Token not found in response", 401

    react_dashboard_url = f"https://cs-467-travel-planner.vercel.app/dashboard?token={token['id_token']}"
    return redirect(react_dashboard_url)



# Decode the JWT supplied in the Authorization header
@app.route('/decode', methods=['GET'])
def decode_jwt():
    payload = verify_jwt(request)
    return payload


# Generate a JWT from the Auth0 domain and return it
# Request: JSON body with 2 properties with "username" and "password"
#       of a user registered with this Auth0 domain
# Response: JSON with the JWT as the value of the property id_token
# 👆 We're continuing from the steps above. Append this to your server.py file.
@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )


@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + DOMAIN
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": "https://cs-467-travel-planner.vercel.app/",
                "client_id": CLIENT_ID,
            },
            quote_via=quote_plus,
        )
    )


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
