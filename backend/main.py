# main.py

# --- 1. Import Dependencies ---
import uvicorn
import numpy as np
import tensorflow as tf
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# --- 2. Initialize FastAPI App ---
app = FastAPI(
    title="Salary Predictor API",
    description="An API to predict employee salaries using a TFLite model.",
    version="1.0.0"
)

# --- 3. Configure CORS ---
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. Load the TFLite Model and Encoders ---
try:
    print("Loading TFLite model and encoders...")
    interpreter = tf.lite.Interpreter(model_path="./model.tflite")
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    label_encoders = joblib.load("./label_encoders.pkl")
    
    print("✅ Model and encoders loaded successfully.")
except Exception as e:
    print(f"❌ Failed to load model or encoders: {e}")
    interpreter = None
    label_encoders = None

# --- 5. Define the Input Data Model ---
class EmployeeData(BaseModel):
    age: int = Field(..., gt=0, description="Employee's age")
    gender: str = Field(..., description="Employee's gender ('Male' or 'Female')")
    education: str = Field(..., description="Highest education level ('Bachelor's', 'Master's', 'PhD')")
    jobTitle: str = Field(..., min_length=2, description="Employee's job title")
    experience: float = Field(..., ge=0, description="Years of work experience")


# --- 6. Data Preprocessing Function (Reverted to LabelEncoder for Job Title) ---
def preprocess_input(data: EmployeeData):
    print(f"Received raw data: {data.model_dump()}")
    
    try:
        # Use the loaded label encoders to transform all categorical data
        gender_encoded = label_encoders['Gender'].transform([data.gender])[0]
        education_encoded = label_encoders['Education Level'].transform([data.education])[0]
        # Reverted to using the LabelEncoder for the job title
        job_encoded = label_encoders['Job Title'].transform([data.jobTitle])[0]

    except KeyError as e:
        raise ValueError(f"A category was not found in the encoder. Invalid input: {e}")
    except Exception as e:
         raise ValueError(f"Error during encoding: {e}")

    # The final feature array in the correct order.
    processed_data = np.array(
        [data.age, gender_encoded, education_encoded, job_encoded, data.experience],
        dtype=np.float32
    )
    
    print(f"Preprocessed Data for Model: {processed_data}")
    return np.expand_dims(processed_data, axis=0)

# --- 7. Create the Prediction Endpoint ---
@app.post("/predict")
async def predict_salary(data: EmployeeData):
    if interpreter is None or label_encoders is None:
        raise HTTPException(status_code=500, detail="Model or encoders are not loaded.")
        
    try:
        processed_tensor = preprocess_input(data)
        
        interpreter.set_tensor(input_details[0]['index'], processed_tensor)
        interpreter.invoke()
        prediction = interpreter.get_tensor(output_details[0]['index'])
        predicted_salary = float(prediction[0][0])
        
        print(f"Predicted Salary (raw output): {predicted_salary}")
        
        return {"predictedSalary": predicted_salary}
        
    except ValueError as ve:
        error_message = f"Invalid Input Error: {str(ve)}"
        print(f"❌ {error_message}")
        raise HTTPException(status_code=400, detail=error_message)
    except Exception as e:
        error_message = f"Backend Error: {str(e)}"
        print(f"❌ {error_message}")
        raise HTTPException(status_code=500, detail=error_message)

# --- 8. Root Endpoint (Optional) ---
@app.get("/")
def read_root():
    return {"status": "Salary Predictor API is running."}

# --- Main execution block ---
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
