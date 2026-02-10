from typing import Optional, Union
from pydantic import BaseModel

class PostalAddress(BaseModel):
  addressCountry: Optional[str] = None
  addressLocality: Optional[str] = None
  addressRegion: Optional[str] = None
  streetAddress: Optional[str] = None
  postalCode: Optional[Union[str, int]] = None
