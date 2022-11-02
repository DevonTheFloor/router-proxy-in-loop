# Router-proxy-in-loop

- [![rc](https://img.shields.io/badge/lang-rc-6dd2b4)](https://github.com/DevonTheFloor/router-proxy-in-loop/blob/main/README.rc.md) - ![drapeau reunionnais](https://thierry-go-dev.fr/my-illu/img/drapeau/flag-rc.png)

- [![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/DevonTheFloor/router-proxy-in-loop/blob/main/README.en.md) - ![drapeau anglais](https://thierry-go-dev.fr/my-illu/img/drapeau/flag-en.png)

Boucle d'applications Express() pour instancier des serveurs de fichiers statiques ainsi que les hosts virtuels pour les héberger sur le même serveur d'hebergement.

Les boucles prennent en arguments des fichiers de configuration contenant les chemins des site et de leut API.

Super pratique en version finale, mais lorsque que l'on souhaite travailler sur les middleware d' un seul vhost, tous les autres sont impactés.

Il faut donc prévoir une branch "maintenance" où chaque service est individuellement instancier, pour garder en ligne tous les sites et leurs APIs sans qu'il soient impacté par les travaux.

---
[![how-to](https://img.shields.io/badge/how--to-use-blue.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md)