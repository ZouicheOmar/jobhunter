from typing import Optional
from pydantic import BaseModel
from .postal_address import PostalAddress

class Place(BaseModel):
  address: Optional[PostalAddress] = None
