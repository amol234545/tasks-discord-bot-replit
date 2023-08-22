import os
try:
  my_secret = os.environ['is_fork']
except KeyError:
  print("You can't run this repl in a ghost-fork.")
  exit()