from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
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

conversation_history = ""

class ChatRequest(BaseModel):
    message: str


@app.get("/favicon.ico")
async def favicon():
    return FileResponse("favicon.ico")


@app.get("/")
def root():
    return {"message" : "Hello World"}


@app.post("/api/chat")
def chat_endpoint(message : ChatRequest):
    global conversation_history
    query = message.message.strip()
    print("User Asked : ", query)
    conversation_history += f"User : {query}"
    response = output_pipeline(query=query, conversation_history=conversation_history)
    # print(conversation_history)
    conversation_history += f"Cortex : {response}"

    print(response)

    if isinstance(response, str):
        try:
            response_dict = json.loads(response)
        except json.JSONDecodeError:
            # fallback if response is just a plain string
            return {"main_response": response, "links": []}
        return response_dict
    elif isinstance(response, dict):
        return response
    else:
        return {"main_response": str(response), "links": []}
