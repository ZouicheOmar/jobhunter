#!/usr/bin/python3

import csv
import json



# create a csv file from this one,

buff = []
with open("./techs.csv", newline="") as csvfile: 
    reader = csv.DictReader(csvfile)
    i = 0
    max = 2

    for row in reader: 
        item = { 
                "idName": row["pldbId"],
                "title": row["title"],
                "nOfJobs": row["numberOfJobs"],
                }
        buff.append(item);
        # i += 1 
        # if i == max:
        #     break

with open("./techs_simple.csv", 'w', newline="") as csvfile:
    fieldnames = ['idName', 'title' , 'nOfJobs']
    writer = csv.DictWriter(csvfile, fieldnames)
    writer.writeheader()
    for row in buff:
        writer.writerow(row)

