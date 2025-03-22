import os
from dotenv import load_dotenv
from llama_index.llms.google_genai import GoogleGenAI
from parser import Question,Answer
from prompts import QUESTION_PROMPT,ANSWER_PROMPT
load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")


llm = GoogleGenAI(
    model="gemini-2.0-flash",
)
q_llm=llm.as_structured_llm(output_cls=Question)
a_llm=llm.as_structured_llm(output_cls=Answer)
if __name__ == "__main__":
    print(q_llm.complete(QUESTION_PROMPT.format(user_level=20)))
