from typing import Annotated
from pydantic import BaseModel, Field, AliasPath, BeforeValidator

EMPLOYMENT_TYPES = {
  "FULL_TIME": "CDI TEMPS PLEIN",
  "PART_TIME": "CDI TEMPS PARTIEL",
  "CONTRACTOR": "INTERIMAIRE",
  "TEMPORARY": "CDD",
  "INTERN": "ALTERNANT",
  "VOLUNTEER": "BÉNÉVOLE",
  "PER_DIEM": "FREELANCE",
  "OTHER": "AUTRE",
}


def validate_location(value):
  return value[0]["address"]["addressLocality"] if isinstance(value, list) else value["address"]["addressLocality"]


def handle_contract_type(value):
  if isinstance(value, list):
    return EMPLOYMENT_TYPES[value[0]] if value[0] in EMPLOYMENT_TYPES else value[0]
  else:
    return EMPLOYMENT_TYPES[value] if value in EMPLOYMENT_TYPES else value


class JobOffer(BaseModel):
  title: str = Field(description="Title of the offer", alias="title")
  company_name: str = Field(description="hiring organisation name", validation_alias=AliasPath("hiringOrganization", "name"))
  location: Annotated[str, BeforeValidator(validate_location), Field(description="City name", validation_alias="jobLocation")]
  contract_type: Annotated[str, BeforeValidator(handle_contract_type), Field(validation_alias="employmentType")]
