import pandas as pd
import numpy as np

def preprocess_data(data: pd.DataFrame) -> pd.DataFrame:
    # Handle missing values
    data.fillna(method='ffill', inplace=True)
    
    # Normalize numerical features
    numerical_cols = data.select_dtypes(include=[np.number]).columns.tolist()
    data[numerical_cols] = (data[numerical_cols] - data[numerical_cols].mean()) / data[numerical_cols].std()
    
    # Encode categorical features
    categorical_cols = data.select_dtypes(include=['object']).columns.tolist()
    data = pd.get_dummies(data, columns=categorical_cols, drop_first=True)
    
    return data

def extract_features(raw_data: pd.DataFrame) -> pd.DataFrame:
    # Preprocess the raw data
    processed_data = preprocess_data(raw_data)
    
    # Feature extraction logic can be added here
    # For example, creating new features based on existing ones
    
    return processed_data