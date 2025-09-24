from flask import Flask

app = Flask(__name__)

elements = {
  "title": "title of the offer, the job position",
  "stack": "tech stack, programming languages used, frameworks, databases, software etc..",
  "location": "location of the job offer, only the city",
  "offerType": "Is the offer a CDI, CDD, alternance, stage ? french contract types",
  "startAt": "when does should the job start ?",
  "duration": "if there's a contract duration, what is it ? in months",
  "main tasks": "main tasks and missions for this position",
}
url = "https://cgi.njoyn.com/corp/xweb/XWeb.asp?page=jobdetails&clid=21001&JobID=J0125-0411&BRID=1199099&sbdid=936&lang=2&xpse=SoDM6_I3t7QRTHgMB70LbzkdCdPP&xfps=99568702-dc4a-43f3-b8fc-763ac0bc0575"


@app.route("/")
def application():
  return "hello app\n"
