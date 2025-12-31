import csv
import json


def main():
  with open("./techs.csv", newline="") as csvfile:
    reader = csv.DictReader(csvfile)
    i = 0
    max = 50
    for row in reader:
      item = {
        "title": row["title"],
        "pldbId": row["pldbId"],
        "numberOfJobs": row["numberOfJobs"],
      }
      print(json.dumps(item))
      i += 1
      if i == max:
        break


if __name__ == "__main__":
  main()
