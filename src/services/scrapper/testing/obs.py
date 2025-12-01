import sys
import subprocess
import logging
from watchdog.observers import Observer
from watchdog.events import (
  LoggingEventHandler,
  FileSystemEventHandler,
  FileModifiedEvent,
  FileSystemEvent,
)

from testing.app import bar
# import testing.app


class Handler(FileSystemEventHandler):
  def __init__(self, path):
    self.path = path
    self.process = None
    self.run_script()

  def run_script(self):
    if self.process:
      self.process = None
    self.process = subprocess.Popen(["python", path])

  def on_modified(self, event):
    print("modified")
    if event.is_directory:
      self.run_script()


if __name__ == "__main__":
  logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
  )
  path = sys.argv[1] if len(sys.argv) > 1 else "./testing/app.py"

  event_handler = Handler(path="./testing/app.py")
  observer = Observer()
  observer.schedule(event_handler, path)
  observer.start()
  try:
    while observer.is_alive():
      observer.join(1)
  finally:
    observer.stop()
    observer.join()
