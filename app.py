from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to check for malicious email content
def is_malicious_email(email_content):
    suspicious_keywords = [
        'password', 'credit card', 'click here', 'urgent', 'suspicious', 'account locked', 
        'verify now', 'free', 'lottery', 'bank', 'fraud', 'limited time offer', 'urgent response needed'
    ]

    for keyword in suspicious_keywords:
        if re.search(r'\b' + re.escape(keyword) + r'\b', email_content, re.IGNORECASE):
            return True
    return False

@app.route('/analyze-email', methods=['POST'])
def analyze_email():
    data = request.get_json()
    
    if 'emailContent' not in data or not data['emailContent']:
        return jsonify({'error': 'No email content provided'}), 400

    email_content = data['emailContent']
    is_malicious = is_malicious_email(email_content)
    
    return jsonify({'malicious': is_malicious})

if __name__ == '__main__':
    app.run(debug=True)
