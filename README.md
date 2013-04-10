Only works in Google Chrome, and only over a web server.  To run:

python -m SimpleHTTPServer

Then browse to http://localhost:8000 in chrome.

The JVM expects to find the jre classes in the 'jre' directory.  Unzip 'classes.jar'
from the JRE distribution into jsvm/jre and on-demand loading will work.
