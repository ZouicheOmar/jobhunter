#!/usr/bin/python3

# look what a single unit looks like
# open json file
# extract interesting info from json,
# possible to make translate it into postgres ? or into csv ?
#
#

from io import open
import json
import csv
import random

villes = []
with open("./communes-france-avec-polygon-2025.json", "rb") as file:
  # metadata, colonnes and data
  content = file.read().decode("utf-8")
  data = json.loads(content)
  for d in data["data"]:
    villes.append(
      {
        "city": d["nom_sans_accent"],
        "label": d["nom_standard"],
        "zipcode": d["code_postal"],
        "dep_id": d["dep_code"],
        "reg_id": d["reg_code"],
      }
    )

with open("./cities.csv", "w") as csv_file:
  fieldnames = [
    "city",
    "label",
    "zipcode",
    "dep_id",
    "reg_id",
  ]

  dw = csv.DictWriter(csv_file, fieldnames=fieldnames)
  dw.writeheader()

  for ville in villes:
    dw.writerow(ville)
