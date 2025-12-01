from datetime import date
from pydantic import BaseModel, Field
from typing import List, Literal, Optional


class Diplome(BaseModel):
  """Information sur un diplôme"""

  niveau: int = Field(description="Niveau du diplôme")
  domaine: str = Field(description="Domaine du diplôme")


class JobOffer(BaseModel):
  """Information about the job offer"""

  title: str = Field(description="Title of the offer")

  company_name: str = Field(description="hiring organisation name")

  location: List[str] = Field(description="City name")

  degree: Optional[Diplome] = Field(
    description="Studies or education requirement if mentionned",
  )

  employment_type: Optional[
    Literal["CDI", "CDD", "ALTERNANCE", "STAGE", "FREELANCE"]
  ] = Field(description="French contract type")

  start_date: Optional[date] = Field(description="If mentionned, start date")

  is_it: bool = Field(
    description="Is the job position about software development"
  )

  tech_stack: Optional[List[str]] = Field(
    description="""If offer is in IT, the tech stack from the technical skills"""
  )

  it_position: Optional[
    Literal["FULLSTACK", "FRONTEND", "BACKEND", "SOFTWARE ENGINEER", "OTHER"]
  ] = Field(
    description="""
  If in IT, what position is it
  """
  )

  class Config:
    str_to_lower = True
