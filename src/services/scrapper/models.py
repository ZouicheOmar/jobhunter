from datetime import date
from pydantic import BaseModel, Field
from typing import List, Optional, Type

from enum import Enum


class Diplome(BaseModel):
  """Information sur un diplôme"""

  niveau: int = Field(description="Niveau du diplôme")
  domaine: str = Field(description="Domaine du diplôme")


class JobOffer(BaseModel):
  """Information about the job offer"""

  titre: str = Field(description="Titre de l'offre")
  nom_entreprise: str = Field(
    description="Nom de l'entreprise, hiring organisation"
  )
  ville: str = Field(description="Nom de la ville")
  diplome: Optional[Diplome] = Field(
    description="Diplôme mentionné ou requis"
  )
  description_entreprise: str = Field(
    description="""
    Le text qui décrit l'entreprise, ses valeurs, objectifs et ambitions, les
    domaines où elle opère
      """
  )
  employmentType: str = Field(description="Le type de contract")
  main_tasks: List[str] = Field(description="Les missions de cet emploi")
  startDate: Optional[date] = Field(
    description="Si mentionnée, The date at which the job starts"
  )


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
