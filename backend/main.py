from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pydantic import BaseModel
from model import output_pipeline

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"message" : "Hello World"}


@app.post("/api/chat")
def chat_endpoint(message : ChatRequest):

    query = message.message.strip()
    print("User Asked : ", query)

    response = output_pipeline(query=query)
    # print(type(response))
    return {"reply": str(response)}
