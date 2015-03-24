# This script runs on the server to periodically check for updates (via git repository) and apply them
# To install depdencies run:
#   pip install gitpython

import datetime
import os
import git

# Configuration
#os.environ["GIT_PYTHON_TRACE"] = "1"
repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__ ), os.pardir))

def check_for_update():
    def printOutput():
        print "Check for update started: %s" % startTime.isoformat()
        print "Using %s as root git repository directory" % (os.path.realpath(repo_root))
        print "Old SHA was %s and new one is %s." % (oldSHA, newSHA)
        print "Output from 'git pull' was: %s" % pullOutput

    startTime = datetime.datetime.now()
    repo = git.repo.base.Repo(repo_root)
    head = repo.heads[0]
    oldSHA = head.commit.hexsha
    g = git.cmd.Git(repo_root)
    pullOutput = g.pull()
    newSHA = head.commit.hexsha
    
    printOutput()
    return oldSHA != newSHA
    
def update():
    print "TODO: write update code"

def main():
    code_has_changed = check_for_update()
    if (code_has_changed):
        print "An update was detected"
        update()
    
if (__name__ == "__main__"):
    main()
