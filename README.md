# proc.edu.ria

[![Build Status](https://travis-ci.org/lagora/proc.edu.ria.svg?branch=develop)](https://travis-ci.org/lagora/proc.edu.ria)  [![Codacy Badge](https://api.codacy.com/project/badge/Grade/d646c02d254b4e7c8796d0b07b5af6df)](https://www.codacy.com/app/lagora-franck/proc-edu-ria?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=lagora/proc.edu.ria&amp;utm_campaign=Badge_Grade) [![codebeat badge](https://codebeat.co/badges/e17462cd-0b23-40c1-9fb3-273ba3f0430a)](https://codebeat.co/projects/github-com-lagora-proc-edu-ria) [![Circle CI](https://circleci.com/gh/lagora/proc.edu.ria.svg?style=svg)](https://circleci.com/gh/lagora/proc.edu.ria)

Requirements:

- global `http-server` and `gulp`
- nodeJS v6.0.0

Usage:

- `npm install`: Install dependencies
- `npm start`: Start a local web server, accessible at `localhost:XXXX` where XXXX is an random port (check the console)

URL QueryString options:

- default: `localhost:8080?size=4&seed=proc.edu.ria&size=4`
- `size=4`: use a grid size of 4 (4^3) to build the city
- `debug=true`: show various debug visual helpers
- `seeed=proc.edu.ria`: the seed used to build the city

Done:


Next:
- [ ] vertical surfaces list
- [ ] FPS camera
- [ ] rule_1
- [ ] config settings form
- [ ] day/night cycle (with light and stuff)
- [ ] pure functions
- [ ] in memory db based data caching
- [ ] unit testing
- [ ] skybox
