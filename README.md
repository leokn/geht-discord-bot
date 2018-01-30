<!-- URLs -->
[pipeline]: /../badges/master/pipeline.svg   "Pipeline status"
[coverage]: /../badges/master/coverage.svg   "Coverage status"
[commits]:  /../commits/master               "Last commits"

# GEHT Discord Bot | [![pipeline][]][commits] | [![coverage][]][commits]

GEHT Discord Bot.  
Based on ['discord.js'](https://discord.js.org) and ['patron.js'](https://vim2meta.github.io/patron.js/).

---

## Install

Clone the repository:  
`git clone git@git.knyazev.me:geht/discord.git .`

Copy and edit config file:  
`cp ./data/config/config.js ./data/config/local.js`

If running as docker services via `docker-compose up` command, then add `.env` file with MariaDB params:
```shell
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

---


## References

- Questions to [Leonid Knyazev](@leonid) | <leonid@knyazev.me> | <n3o@design.ru>
- Bug reports and Feature requests to [Issues](https://git.knyazev.me/discord.geht/geht.team/issues)

---
