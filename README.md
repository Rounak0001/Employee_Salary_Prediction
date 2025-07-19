Employee Salary Prediction System
1. Overview
This project is a full-stack web application designed to predict employee salaries based on a set of key attributes. It provides a user-friendly interface for users to input data and receive an instant, data-driven salary estimate. The system leverages a machine learning model trained on salary data to provide objective and consistent predictions, addressing the challenge of manually determining fair and competitive compensation.

The application features a modern React.js frontend and a powerful Python FastAPI backend, with the machine learning model served efficiently via TensorFlow Lite.

2. Features
Interactive User Interface: A clean and responsive UI built with React.

Multiple Input Factors: Predicts salary based on Age, Gender, Highest Level of Education, Job Title, and Years of Experience.

Dynamic Prediction: Real-time salary estimation powered by a backend machine learning model.

Dropdown Menus: Ensures data integrity by providing predefined options for Gender, Education, and Job Title.

Input Validation: Both frontend and backend validation to handle edge cases and prevent invalid data submission (e.g., age limits, realistic experience).

Clear Error Handling: Displays user-friendly error messages for invalid inputs or server issues.

3. Tech Stack
Component

Technology / Library

Frontend

React.js, Axios

Backend

Python 3.11, FastAPI, Uvicorn

ML Model

TensorFlow (Keras)

Deployment

TensorFlow Lite (.tflite)

Data Tools

Pandas, Scikit-learn, Joblib, NumPy

4. Project Structure
/Employee_Salary_Prediction/
├── backend/
│   ├── main.py                 # FastAPI application code
│   ├── model.tflite            # Trained machine learning model
│   ├── label_encoders.pkl      # Saved data encoders
│   └── requirements.txt        # Python dependencies
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.jsx             # Main React component
    │   └── index.js
    ├── package.json            # Node.js dependencies
    └── README.md               # This file

5. Setup and Installation
Backend Setup
Navigate to the backend directory:

cd backend

Install Python Dependencies:
Make sure you have Python 3.11 installed. Then, run the following command to install the required packages:

pip install -r requirements.txt

Note: The requirements.txt file should contain fastapi, uvicorn[standard], numpy, tensorflow, and scikit-learn.

Run the Backend Server:

python main.py

The server will start on http://127.0.0.1:8000.

Frontend Setup
Navigate to the frontend directory:
Open a new terminal and navigate to the frontend folder:

cd frontend

Install Node.js Dependencies:
Make sure you have Node.js and npm installed. Then, run:

npm install

Run the Frontend Application:

npm run dev

The application will open in your browser at http://localhost:5173.

6. Usage
Ensure both the backend and frontend servers are running.

Open your web browser and go to http://localhost:3000.

Fill in all the required fields in the form.

Click the "Predict Salary" button.

The estimated salary will be displayed in the result box below the form.

7. Screenshots:
   
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/cf8f6353-a8ab-4a86-85fe-efd742366c19" />
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/8df67e06-0de6-45d9-88a0-19fa4891ebd1" />



8. Future Scope
Cloud Deployment: Deploy the application to a cloud service like AWS or Heroku for public accessibility.

Model Retraining: Implement a feature to allow administrators to upload new data and retrain the model to keep it up-to-date.

Advanced Features: Incorporate additional factors like company size, industry, and location to improve prediction accuracy.

User Authentication: Add user accounts to save prediction history.

App Enhancement: It can be enhanced to a job preparation app as from predicted salary the employee can upskill or prepare for the role for which the salary is predicted.






