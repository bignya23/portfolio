import os
import json
from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from google import genai
from google.genai import types
from prompts import MAIN_PROMPT, FINAL_PROMPT
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

class Links(BaseModel):
    link_name : str = Field(description="Name of the link")
    main_link : str = Field(description= "The main link in http/https")

class BotResponse(BaseModel):
    main_response : str
    links : List[Links]
    

# Define the function declaration for the model
portfolio_tool = {
    "name": "get_portfolio_info",
    "description": "Retrieves specific sections of portfolio information based on request",
    "parameters": {
        "type": "object",
        "properties": {
            "sections": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Requested portfolio sections (bio, skills, projects, experience, education, contact, blogs)",
            },
            "detail_level": {
                "type": "string",
                "enum": ["brief", "standard", "detailed"],
                "description": "Level of detail requested for the information",
            },
            "focus_area": {
                "type": "string",
                "description": "Optional specific focus area or technology to highlight",
            }
        },
        "required": ["sections", "detail_level"],
    }
}



class PortfolioData:
    """Class to manage portfolio data"""
    
    def __init__(self, data_file: str):
        """Initialize with data from a JSON file"""
        with open(data_file, 'r') as f:
            self.data = json.load(f)
        self.validate_data()
    
    def validate_data(self):
        """Ensure all required sections exist"""
        required_sections = {"bio", "skills", "projects", "experience", 
                           "education", "blogs", "contact"}
        missing = required_sections - set(self.data.keys())
        if missing:
            print(f"Warning: Missing portfolio sections: {missing}")
    
    def get_sections(self, 
                   sections: List[str], 
                   detail_level: str = "standard",
                   focus_area: Optional[str] = None) -> Dict:
        """Retrieve specified sections with appropriate detail level"""
        result = {}
        
        for section in sections:
            if section not in self.data:
                continue
                
            section_data = self.data[section]
            
            if detail_level == "brief":
                if isinstance(section_data, list):
                    result[section] = [self._get_brief_item(item) for item in section_data]
                else:
                    result[section] = self._get_brief_item(section_data)
            
            elif detail_level == "detailed":
                result[section] = section_data
            
            else:  
                result[section] = section_data
            
            if focus_area and section in ["skills", "projects", "experience"]:
                result[section] = self._filter_by_focus(result[section], focus_area)
                
        return result
    
    def _get_brief_item(self, item):
        """Extract summary information from an item"""
        if isinstance(item, dict):
            brief = {}
            priority_fields = ["title", "name", "summary", "headline", "role", "company"]
            for field in priority_fields:
                if field in item:
                    brief[field] = item[field]
            return brief
        return item
    
    def _filter_by_focus(self, items, focus):
        """Filter items by a focus area or technology"""
        focus = focus.lower()
        
        if isinstance(items, list):
            filtered = []
            for item in items:
                if any(focus in str(value).lower() for value in item.values()):
                    filtered.append(item)
            return filtered
        
        return items

class PortfolioAssistant:
    """AI assistant for portfolio website using Gemini 2.0"""
    
    def __init__(self, api_key: str, portfolio_data: PortfolioData):
        """Initialize the assistant with API key and portfolio data"""
        self.api_key = api_key
        self.portfolio_data = portfolio_data
        
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.tools = types.Tool(function_declarations=[portfolio_tool])
        self.config = types.GenerateContentConfig(tools=[self.tools])

    def handle_query(self, query: str, conversation_history : str) -> str:
        """Process a visitor's query and return a response"""
        try:
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[MAIN_PROMPT.format(user_query=query, conversation_history=conversation_history)],
                config=self.config
            )
            print(query)

            # Ensure we have at least one candidate and one content part
            if response and response.candidates:
                candidate = response.candidates[0]
                if candidate.content.parts:
                    part = candidate.content.parts[0]

                    # If the model requested our tool...
                    if part.function_call:
                        name = part.function_call.name
                        args = part.function_call.args or {}

                        if name == "get_portfolio_info":
                            sections     = args.get("sections", [])
                            detail_level = args.get("detail_level", "standard")
                            focus_area   = args.get("focus_area")

                            portfolio_content = self.portfolio_data.get_sections(
                                sections, detail_level, focus_area
                            )
                            return self._format_portfolio_response(portfolio_content, query, conversation_history=conversation_history)
                        else:
                            return "I don't know how to handle that request."

                    # If no function_call but there's plain text, return it
                    if getattr(part, "text", None):
                        return self._format_portfolio_response(part.text, query, conversation_history)


            # Fallback to top-level text if available
            if response and response.text:
                return self._format_portfolio_response(response.text, query, conversation_history)
            
            return "I couldn't generate a response. Please try a different question."

        except Exception as e:
            print(f"Error processing query: {e}")
            return "Sorry, I encountered an error while processing your request."

        

    
    def _format_portfolio_response(self, content: Dict, query: str, conversation_history : str) -> str:
        """Format the portfolio content into a natural language response"""
       

        response = self.client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[FINAL_PROMPT.format(query= query, conversation_history=conversation_history, content=json.dumps(content, indent=2))],
            config={ "response_schema" : BotResponse,
                    'response_mime_type': 'application/json',},
            
        )
        
        if response and response.text:
            return response.text
        else:
            return "I couldn't format a response based on the portfolio information."



def output_pipeline(query : str, conversation_history : str):
   
    api_key = os.getenv("GEMINI_API_KEY")
    base_dir = os.path.dirname(__file__)
    file_path = os.path.join(base_dir, "portfolio_data.json")
    portfolio_data = PortfolioData(file_path)
    
    assistant = PortfolioAssistant(api_key, portfolio_data)
    
    response = assistant.handle_query(query, conversation_history)
    return response 


conversation_history = ""
if __name__ == "__main__":
    while True:
        query = input("user : ")
        conversation_history += f"User : {query}"
        response = output_pipeline(query=query, conversation_history=conversation_history)
        print(response)
        conversation_history += f"Cortex: {response}"