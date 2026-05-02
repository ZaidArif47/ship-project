from typing import Any, Dict
import numpy as np
import joblib

class InferenceModel:
    def __init__(self, model_path: str):
        self.model = joblib.load(model_path)

    def preprocess(self, data: Dict[str, Any]) -> np.ndarray:
        # Implement your preprocessing logic here
        # Convert input data to the format expected by the model
        processed_data = np.array([data['feature1'], data['feature2'], data['feature3']])
        return processed_data.reshape(1, -1)

    def predict(self, data: Dict[str, Any]) -> Any:
        processed_data = self.preprocess(data)
        prediction = self.model.predict(processed_data)
        return prediction

# Example usage:
# model = InferenceModel('path/to/your/model.pkl')
# result = model.predict({'feature1': value1, 'feature2': value2, 'feature3': value3})