# TIC-TAC-TOE
A multi-mode tic-tac-toe game made in JavaScript.

There is two game modes :
 - [Offline mode](https://github.com/Guuus/tic-tac-toe/offline/) : two players can play but on the same computer.
 - [Online mode](https://github.com/Guuus/tic-tac-toe/online/) : two players can play from different devices like computer, tablet or smartphone.

## Install on Linux (Debian/Ubuntu)
First, install apache if it's not already done by copying this command `sudo apt-get install apache2` and go into */var/www/html/*. Delete all the files `sudo rm -r *` and clone the project with the command `git clone https://github.com/Guuus/tic-tac-toe.git`.

- ### Offline mode
Open this url with your web browser `http://<your_ip>/tic-tac-toe/offline/`.
- ### Online mode
Go into the *online* folder and install the dependencies with this command `sudo npm install`. Then, don't forget to change the word ***localhost*** of the *index.html* and *js/client.js* files by your ip adress. Finally, start the server `node server.js` and enter this url into your web browser `http://<your_ip>/tic-tac-toe/online/`.

## Todo
 - Refactor/debug the code
 - Add light mode
 - Add robot/computer opponent mode