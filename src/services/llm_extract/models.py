from typing import List, Optional, Union
from pydantic import BaseModel, Field


class Response(BaseModel):
  tech_stack: List[str] = Field(description="", serialization_alias="Tech Stack")
