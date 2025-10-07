from datetime import date
from pydantic import BaseModel, Field
from typing import List, Optional, Type

from enum import Enum


class TestModel(BaseModel):
  first: str
  last: str
  message: str


class ContractType(str, Enum):
  cdi = "CDI"
  cdd = "CDD"
  alternance = "ALTERNANCE"
  stage = "STAGE"
  nonspec = "NON SPECIFIE"


class PositionType(str, Enum):
  fullstack = "FULLSTACK"
  frontend = "FRONTEND"
  backend = "BACKEND"
  other = "OTHER"


class JobOfferData(BaseModel):
  title: str = Field(description="Titre du post")
  city: str = Field(
    description="Ville, localisation de l'offre, uniquement la ville"
  )
  tech_stack: List[str] = Field(
    description="""
    Les technologies (language de programmation, base de données logiciel) utilisée
    dans ce job
    """
  )
  company: str = Field(description="Le nom de l'entreprise")
  company_desc: str = Field(
    description="""Brève description de l'entreprise, dans quels
      domaines elle opère, quel solution elle apporte à ses clients etc.."""
  )
  website: str = Field(description="The domaine name of url of this offer")
  position: PositionType = Field(description="Le metier")
  main_tasks: List[str] = Field(
    description="The tasks that the employée will have to do, his main missions for the job"
  )
  contract: ContractType = Field(description="Le type de contract")
  startDate: date = Field(description="The date at which the job starts")
