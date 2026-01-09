from typing import Annotated

from pydantic import AliasPath, BaseModel, BeforeValidator, Field

EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACTOR", "TEMPORARY", "INTERN", "VOLUNTEER", "PER_DIEM", "OTHER"]


def validate_location(value):
  return value[0]["address"]["addressLocality"] if isinstance(value, list) else value["address"]["addressLocality"]


def validate_zipcode(value):
  return value[0]["address"]["postalCode"] if isinstance(value, list) else value["address"]["postalCode"]


def handle_contract_type(value):
  if isinstance(value, list):
    return value[0] if value[0] in EMPLOYMENT_TYPES else EMPLOYMENT_TYPES[-1]
  else:
    return value if value in EMPLOYMENT_TYPES else EMPLOYMENT_TYPES[-1]


class JobOffer(BaseModel):
  title: str = Field(description="Title of the offer", alias="title")
  company_name: str = Field(description="hiring organisation name", validation_alias=AliasPath("hiringOrganization", "name"))
  location: Annotated[str, BeforeValidator(validate_location), Field(description="location name", validation_alias="jobLocation")]
  zipcode: Annotated[str, BeforeValidator(validate_zipcode), Field(description="location zipcode", validation_alias="jobLocation")]
  contract_type: Annotated[str, BeforeValidator(handle_contract_type), Field(validation_alias="employmentType")]
