from typing import List
from pydantic import BaseModel


class LLMExtractResponse(BaseModel):
  data: List[str]

