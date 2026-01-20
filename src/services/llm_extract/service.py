from ollama import generate, GenerateResponse

from utils import cleanup_response


class ExtractService:
  def __init__(self):
    self.prompt = """ 
      ### Template:

        { "Tech Stack": [] }

      ### Example:

        { "Tech Stack": ["javascript", "python", "django"] } 

      ### Text:

    """

  def make_prompt(self, text: str):
    return self.prompt + text

  def _extract(self):
    return "hello"

  def handle(self, text):
    prompt = self.make_prompt(text)
    req: GenerateResponse = generate(model="nuextract:latest", format="json", stream=False, prompt=prompt)
    data = cleanup_response(req) 
    if not data:
      return None
    return data.model_dump_json()

