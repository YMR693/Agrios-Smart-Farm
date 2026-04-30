from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow React (localhost:5173) to call this API

# Load the trained Random Forest model
model = joblib.load('soil_model.pkl')

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    Expects JSON body:
    {
        "Nitrogen": 40,
        "Phosphorus": 30,
        "Potassium": 50,
        "Humidity": 60,
        "pH_Value": 6.5
    }
    Returns:
    {
        "crop": "rice",
        "confidence": 0.92
    }
    """
    data = request.get_json()

    # Validate required fields
    required = ['Nitrogen', 'Phosphorus', 'Potassium', 'Humidity', 'pH_Value']
    for field in required:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    try:
        # Build input in the exact order the model was trained on
        sample = pd.DataFrame([[
            float(data['Nitrogen']),
            float(data['Phosphorus']),
            float(data['Potassium']),
            float(data['Humidity']),
            float(data['pH_Value']),
        ]], columns=['Nitrogen', 'Phosphorus', 'Potassium', 'Humidity', 'pH_Value'])

        prediction = model.predict(sample)[0]
        probabilities = model.predict_proba(sample)[0]
        confidence = round(float(max(probabilities)), 2)

        return jsonify({
            'crop': prediction,
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model': 'soil_model.pkl'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
