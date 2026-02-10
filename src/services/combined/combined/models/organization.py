from typing import  Optional
from pydantic import BaseModel


class Organization(BaseModel):
  name: Optional[str]

