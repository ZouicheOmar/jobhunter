from pydantic import BaseModel
from typing import List, Optional, Union

from scrap.models.organization import Organization
from scrap.models.place import Place

class JobPosting(BaseModel):
  title: Optional[str] = None
  hiringOrganization: Optional[Organization] = None
  jobLocation: Optional[Union[Place, List[Place]]] = None
  employmentType: Optional[str] = None
  description: Optional[str] = None

