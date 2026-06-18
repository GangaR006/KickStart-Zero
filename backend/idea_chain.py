from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_idea(raw_idea: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a startup coach."},
            {"role": "user", "content": f"""A user has this idea:

"{raw_idea}"

Extract and return:
1. Core idea (1 sentence)
2. Problem being solved
3. Target audience
4. Key assumptions they are making

Be concise and direct."""}
        ]
    )
    return response.choices[0].message.content


def generate_plan(idea_analysis: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a startup execution strategist."},
            {"role": "user", "content": f"""Based on this idea analysis:

{idea_analysis}

Generate a practical execution plan with:
1. MVP scope (what to build first, in 2-3 sentences)
2. Top 3 risks and how to handle them
3. 30-day milestones (week by week)
4. First 5 action items to do THIS WEEK

Format clearly with headers."""}
        ]
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    raw_idea = """
    A web platform called KickStart Zero that helps students, aspiring entrepreneurs, 
    creators, and professionals turn their early-stage ideas into structured, 
    executable plans. Users enter their idea and the platform uses AI to guide them 
    through validating the idea, identifying risks and assumptions, defining an MVP, 
    generating a realistic roadmap, and producing prioritized action items.

    Target users are people who have ideas but lack the experience or structure to 
    execute them. The platform fills the gap that existing AI tools leave — they can 
    generate task lists but cannot guide users through the complete journey from a 
    vague concept to a realistic, personalized roadmap.
    """

    print("=== STEP 1: Analysing your idea ===")
    analysis = extract_idea(raw_idea)
    print(analysis)

    print("\n=== STEP 2: Generating your plan ===")
    plan = generate_plan(analysis)
    print(plan)