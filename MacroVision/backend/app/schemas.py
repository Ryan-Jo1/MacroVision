from pydantic import BaseModel

class PredictionResult(BaseModel):
    food: str
    portion_g: float
    macros: dict