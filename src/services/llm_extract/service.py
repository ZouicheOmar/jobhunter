import time
from ollama import generate, GenerateResponse


class ExtractService:
  def __init__(self):
    self.prompt = """ 
      ### Template:

        { "Tech Stack": [] }

      ### Example:

        { "Tech Stack": ["Javascript", "Python", "Django"] } 

      ### Text:
    """

  def make_prompt(self, text: str):
    return self.prompt + text

  def _extract(self):
    return "hello"

  def handle(self, text):
    start = time.time()
    prompt = self.make_prompt(text)
    req: GenerateResponse = generate(model="nuextract:latest", format="json", stream=False, prompt=prompt)
    end = time.time()
    return {"techStack": req.response, "doneTime": end - start}
