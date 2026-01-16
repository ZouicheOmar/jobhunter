from datetime import time, datetime, date
from decimal import Decimal
import time
from typing import Annotated, Any, ForwardRef, List, Literal, Optional, Union

from pydantic import AliasPath, AnyUrl, BaseModel, BeforeValidator, Field, StrictBool, StrictFloat, StrictInt, types
from pydantic.v1.typing import update_model_forward_refs


# class Text(BaseModel || schemaorg type):
# class Organization(BaseModel):
# class Place(BaseModel):
# class Contract(BaseModel || schemaorg type):

# type PostalAddress
# "@type": "PostalAddress",
# "addressLocality": "Denver",
# "addressRegion": "CO",
# "postalCode": "80209",
# "streetAddress": "7 S. Broadway"

# type Organization

# type Place
# address : PostalAddress | Text

# type jobPosting
# url: string
# datePosted
# employmentType
# hiringOrganization
#  "@type": Organization
#  name: not utf 8 encoded
#  sameAs : url
#  logo: url
# industry list [text]
# jobLocation
# occupationalCategory


class Organization(BaseModel):
  name: Optional[str]
  # url: Optional[str]
  # name: Optional[str]


class PostalAddress(BaseModel):
  addressLocality: Optional[str] = None
  addressRegion: Optional[str] = None
  streetAddress: Optional[str] = None
  postalCode: Optional[Union[str, int]] = None


class Place(BaseModel):
  address: Optional[PostalAddress] = None
  # zipcode: Annotated[str, BeforeValidator(validate_zipcode), Field(description="location zipcode", validation_alias="jobLocation")]


class JobPosting(BaseModel):
  title: Optional[str] = None
  hiringOrganization: Optional[Organization] = None
  jobLocation: Optional[Place] = None
  employmentType: Optional[str] = None
  # employmentType: Annotated[str, BeforeValidator(handle_contract_type), Field(validation_alias="employmentType")]
