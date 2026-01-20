from typing import List, Optional, Union
from pydantic import BaseModel


class Organization(BaseModel):
  name: Optional[str]


class PostalAddress(BaseModel):
  addressCountry: Optional[str] = None
  addressLocality: Optional[str] = None
  addressRegion: Optional[str] = None
  streetAddress: Optional[str] = None
  postalCode: Optional[Union[str, int]] = None


class Place(BaseModel):
  address: Optional[PostalAddress] = None


class JobPosting(BaseModel):
  title: Optional[str] = None
  hiringOrganization: Optional[Organization] = None
  jobLocation: Optional[Union[Place, List[Place]]] = None
  employmentType: Optional[str] = None
  description: Optional[str] = None

# class IndeedJobDesc(BaseModel): 
#   text: Option[str]
#
# class IndeedJob(BaseModel): 
#   title: Option[str]
#   sourceEmployerName (nom de l'entreprise)
#   description: IndeedJobDesc
#
#
# class IndeedJobData(BaseModel):
#   hostQueryExecutionResult
#     data
#       jobData
#         results[0]
#           job
#             title
#             sourceEmployerName (nom de l'entreprise)
#             description
#
