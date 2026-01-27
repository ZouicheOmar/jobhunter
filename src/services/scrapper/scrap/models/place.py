from typing import Optional
from pydantic import BaseModel
from scrap.models.postal_address import PostalAddress

class Place(BaseModel):
  address: Optional[PostalAddress] = None
