from npm.bindings import npm_run
import os
os.chdir("/app")
stderr, stdout = npm_run('start')
