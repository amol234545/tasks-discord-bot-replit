import os
try:
  my_secret = os.environ['is_fork']
  os.system("./repl.deploy node index.js")
except KeyError:
  print("You can't run this repl in a ghost-fork. ")
  
