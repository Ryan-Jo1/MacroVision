import torch
from torch.utils.data import DataLoader
from app.models.classifier import FoodClassifier
from .utils import get_train_val_datasets, save_model

async def train_food_classifier():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    # Initialize model
    model = FoodClassifier(num_classes=10).to(device)
    
    # Load dataset
    train_set, val_set = get_train_val_datasets()
    train_loader = DataLoader(train_set, batch_size=32, shuffle=True)
    
    # Training loop
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    criterion = torch.nn.CrossEntropyLoss()
    
    for epoch in range(10):
        model.train()
        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
    
    # Save trained model
    save_model(model, "food_classifier.pth")
    return {"status": "success", "message": "Model trained successfully"}