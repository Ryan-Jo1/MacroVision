from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from app.services.prediction import predict_macros
from app.schemas import PredictionResult

app = FastAPI(title="MacroVision API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model=PredictionResult)
async def predict_food(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        return await predict_macros(image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/train")
async def train_model():
    # Endpoint to trigger model retraining
    from app.services.training import train_food_classifier
    return await train_food_classifier()