import os
import time
import subprocess


class Hotreload:
  def __init__(self, path):
    self.path = path
    self.last_modified = os.path.getmtime(path)
    self.process = subprocess.Popen(["python", path])

  def reload(self):
    if self.process:
      print("HOTRELOAD: killing", self.process.pid)
      self.process.kill()
    self.process = subprocess.Popen(["python", self.path])
    print("HOTRELOAD: creating", self.process.pid)

  def monitor(self):
    while True:
      time_modified = os.path.getmtime(self.path)
      if time_modified != self.last_modified:
        self.last_modified = time_modified
        self.reload()
      time.sleep(0.5)


if __name__ == "__main__":
  path = "./testing/app.py"
  h = Hotreload(path=path)
  h.monitor()
