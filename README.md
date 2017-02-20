# Presentation

[![Greenkeeper badge](https://badges.greenkeeper.io/boopathi/presentation.svg)](https://greenkeeper.io/)

[![Circle CI](https://circleci.com/gh/boopathi/presentation.svg?style=svg)](https://circleci.com/gh/boopathi/presentation) ![David DM](https://david-dm.org/boopathi/presentation.svg)

## Why did I build this ?

+ Sometimes, you want the user to copy some text(usually code) while giving your presentation
+ At the same time, you don't want the listener to go ahead of slides and take a look around the final one.

This uses websockets and when the speaker selects the slide from his view, it tells all the connected clients(listeners) to update the slide.

## Demo

+ https://young-coast-8374.herokuapp.com/controller - Create slides
+ https://young-coast-8374.herokuapp.com/ - Slide Viewer

The slides created here don't persist longer than **10 minutes**.

## Installation

+ `npm install`
+ `webpack`
+ `npm start`

## Usage

+ Presenter View - "http://localhost:4242/controller" - Add, Edit, Remove, Present slides
+ Listener View - "http://localhost:4242/" - View slides

## Overview

```
+-----------------------------------+
|                                   |
|               SPEAKER             |
|     http://localhost/controller   |
|                                   |
+--+----+----+----+----+----+----+--+
   |    |    |    |    |    |    |   
   |websocket.emit('change_slide')   
   |    |    |    |    |    |    |   
 +-v+ +-v+ +-v+ +-v+ +-v+ +-v+ +-v+  
 |1 | |2 | |3 | |4 | |5 | |6 | |7 |  
 +--+ +--+ +--+ +--+ +--+ +--+ +--+  
                                     
         CLIENTS / LISTENERS         
         http://speaker_host/          

```

## TODO

(Work in Progress)

Doesn't work now. Still building this feature.

+ `npm install -g presentation`
+ `presentation ./my-presentation.md`
