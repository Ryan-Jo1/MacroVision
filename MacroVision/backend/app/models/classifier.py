import torch
import torch.nn as nn
import torchvision.models as models

class FoodClassifier(nn.Module):
    def __init__(self, num_classes=10):
        super(FoodClassifier, self).__init__()
        # Using EfficientNet as base
        self.base_model = models.efficientnet_b0(pretrained=True)
        
        # Freeze base model layers
        for param in self.base_model.parameters():
            param.requires_grad = False
            
        # Replace