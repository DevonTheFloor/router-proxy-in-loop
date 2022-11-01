# Router-proxy-in-loop

[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/DevonTheFloor/router-proxy/blob/main/README.md)

Express() application loop to instantiate static file servers as well as virtual hosts to host them on the same hosting server.

Take them as arguments of the configuration files containing the paths of the sites and their API.

Super practical in the final version, but when you want to work on the middleware of a single vhost, all the others are impacted.

It is therefore necessary to provide a "maintenance" branch where each service is individually instantiated, to keep all the sites and their APIs online without being impacted by the work.

---
[![how-to](https://img.shields.io/badge/how--to-use-blue.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md)
