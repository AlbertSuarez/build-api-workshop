import datetime

from flask import Flask, jsonify
from flask_cors import CORS


# Setup Flask app.
flask_app = Flask(__name__)
flask_app.config['JSON_AS_ASCII'] = False  # Needed for proper UTF-8 support.

# Setup CORS - this is needed for a proper communication with the frontend.
CORS(flask_app)


@flask_app.route('/test')
def test():
    """
    This endpoint returns the current server time and a static text.
    :return: Current server time and text JSON formatted.
    """
    response = {
        'time': datetime.datetime.now().strftime('%m/%d/%Y - %H:%M:%S'),
        'text': 'This is a test.'
    }
    return jsonify(response), 200
