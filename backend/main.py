from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from idea_chain import extract_idea, generate_plan

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaRequest(BaseModel):
    idea: str

@app.post("/api/analyze")
def analyze_idea(request: IdeaRequest):
    analysis = extract_idea(request.idea)
    plan = generate_plan(analysis)
    return {
        "analysis": analysis,
        "plan": plan
    }

@app.get("/")
def root():
    return {"status": "KickStart Zero API is running"}

