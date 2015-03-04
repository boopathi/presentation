# Presenter

## Why did I build this ?

+ Sometimes, you want the user to copy some text(usually code) while giving your presentation
+ At the same time, you don't want the listener to go ahead of slides and take a look around the final one.

This uses websockets and when the speaker selects the slide from his view, it tells all the connected clients(listeners) to update the slide.

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
 |  | |  | |  | |  | |  | |  | |  |  
 +--+ +--+ +--+ +--+ +--+ +--+ +--+  
                                     
         CLIENTS / LISTENERS         
         http://speaker_host/          

```

