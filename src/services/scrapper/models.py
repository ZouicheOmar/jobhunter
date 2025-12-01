from typing import Annotated
from pydantic import BaseModel, Field, AliasPath, BeforeValidator


def validate_location(value):
  return value[0]["address"]["addressLocality"] if isinstance(value, list) else value["address"]["addressLocality"]


class JobOffer(BaseModel):
  title: str = Field(description="Title of the offer", alias="title")
  company_name: str = Field(description="hiring organisation name", validation_alias=AliasPath("hiringOrganization", "name"))
  location: Annotated[str, BeforeValidator(validate_location), Field(description="City name", validation_alias="jobLocation")]
  contract_type: str = Field(validation_alias="employmentType")
