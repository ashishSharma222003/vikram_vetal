from pydantic import BaseModel, Field
from typing import List
class Question(BaseModel):
    question: str = Field(description="The question to be answered")
    options: List[str] = Field(description="4 choices for the question,each options should be one or two words")

class Answer(BaseModel):
    passed : bool=Field(description="True if the answer is correct,False if the answer is incorrect")
    reason:str=Field(description="The reason behind the answer")
    improvement:str=Field(description="The improvement for the user to become a better ruler")






