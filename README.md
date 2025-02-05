# Gamefied typing
This is a game to help me learn to type. It has been more than ten years since I've touched an html or css file, so I've asked an AI chat to start it up for me. Then I started fixing it.
## Prompt
```
Build a browser game with the following requirements:
 - start with pure JavaScript and HTML5 Canvas
 - 2D game
 - low performance
 - no high graphic needs
 - no high FPS
 - no physics
 - simple game mechanics
 - desktop only
 - the play area always occupies the browser window
 - no scroll bars
 - separate the HTML, CSS and javascript content to different files

At the top left corner are the following controls:
 - a slider to adjust the speed of the enemy objects, range: 1-100
 - a slider to adjust the total number of enemies on the screen, range: 1-100
 - a slider to adjust the level of the player, range: 1-100

At the top right corner there is the:
 - score
 - WPM (Word Per Minute) counter
 - CPM (Character per Minute) counter

The game mechanics:
 - The player has a fixed position at the middle of the bottom of the play area represented by a box
 - Random colored enemy objects, boxes moving vertically toward the bottom starting at random top edge positions
 - There is some delay between each enemy object starting
 - If an enemy object is destroyed or leaves the play area a new one is started
 - The level of the enemy objects are random with a normal distribution of the player level +/- 20 levels
 - The enemy level is written inside the box of the enemy object
 - The score is increased with the level of the enemy every time the player destroys an enemy
 - If the enemy reaches the bottom edge the score is decreased by the level of the enemy
 - The enemy objects are destroyed by rockets, represented by small circles
 - Each enemy object is given a target code based on the level of the enemy and the code is written in the enemy box
 - The player upon entering the target code of the enemy moves below the enemy object and fires a rocket.
 - The speed adjustment should be live. It takes effect on already moving enemy objects
```

## chars
### home row
```
fj
dk
fjdk
sl
fjsl
a;
fja;
fjdksla;
gh
fjgh
fjdksla;gh
```

### top row
```
ru
ei
ruei
home row + ruei
wo
rueiwo
qy
rueiqy
pt
rueiwoqypt
```

### bottom row
```
vm
c,
vmc,
x.
z/
bn
```
