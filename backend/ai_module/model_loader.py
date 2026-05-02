from typing import Any
import joblib
import os

class ModelLoader:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None

    def load_model(self) -> Any:
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model file not found at {self.model_path}")
        self.model = joblib.load(self.model_path)
        return self.model

    def predict(self, input_data: Any) -> Any:
        if self.model is None:
            raise RuntimeError("Model is not loaded. Call load_model() first.")
        return self.model.predict(input_data)