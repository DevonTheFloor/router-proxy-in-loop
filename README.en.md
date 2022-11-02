# Router-proxy-in-loop
[![rc](https://img.shields.io/badge/lang-rc-6dd2b4)](https://github.com/DevonTheFloor/router-proxy-in-loop/blob/main/README.rc.md) - ![drapeau reunionnais](https://thierry-go-dev.fr/my-illu/img/drapeau/flag-rc.png)

[![fr](https://img.shields.io/badge/lang-fr-blue)](https://github.com/DevonTheFloor/router-proxy-in-loop/blob/main/README.md) - ![drapeau français](https://thierry-go-dev.fr/my-illu/img/drapeau/flag-fr.png)

Express() application loop to instantiate static file servers as well as virtual hosts to host them on the same hosting server.

The loops take as arguments configuration files containing the paths of the sites and their API.

Super practical in the final version, but when you want to work on the middleware of a single vhost, all the others are impacted.

It is therefore necessary to provide a "maintenance" branch where each service is individually instantiated, to keep all the sites and their APIs online without being impacted by the work.

---
[![how-to](https://img.shields.io/badge/how--to-use-blue.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md)
