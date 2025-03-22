from flask import Flask, request, jsonify
from llm import llm,q_llm,a_llm
from prompts import QUESTION_PROMPT,ANSWER_PROMPT
import uuid
app = Flask(__name__)


@app.route('/api/questions', methods=['GET'])
def get_questions():
    level=request.args.get('level')
    question=q_llm.complete(QUESTION_PROMPT.format(user_level=level))
    response=question.raw.dict()
    response.update({"id":uuid.uuid4()})
    return jsonify(response)


@app.route('/api/submit', methods=['POST'])
def submit_answer():
    data = request.json
    # question_id = data.get('questionId')
    question=data.get("question")
    answer = data.get('answer')
    reasoning = data.get('reasoning')
    answer=a_llm.complete(ANSWER_PROMPT.format(question=question,options=answer,reason=reasoning))
    answer=answer.raw.dict()
    return jsonify(answer)

# Get all todos


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=10000)
