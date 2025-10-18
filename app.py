# app.py
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze_email():
    data = request.json
    email_content = data.get('emailContent', '')

    # Simple analysis logic (you can enhance this)
    malicious_keywords = ["phishing", "scam", "attack", "ransom","password", "credit card", "click here", "urgent", "suspicious", "account locked", 
        "verify now", "free", "lottery", "bank", "fraud", "limited time offer", "urgent response needed"
]
    is_malicious = any(keyword in email_content.lower() for keyword in malicious_keywords)

    # Respond with the analysis result
    return jsonify({
        'isMalicious': is_malicious,
        'message': 'This email is flagged as MALICIOUS!' if is_malicious else 'This email appears SAFE.'
    })

if __name__ == '__main__':
    app.run(debug=True)
