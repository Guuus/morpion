# TIC-TAC-TOE

A multiplayer tic-tac-toe game made in JavaScript, Node.js & Socket.IO.  

## Install on Linux (Debian/Ubuntu)

First, install apache and Node.js if it's not already done by copying this command `sudo apt-get install apache2 nodejs npm` and go into */var/www/html/*. Delete all the files `sudo rm -r *` and clone the project with the command `git clone https://github.com/Guuus/tic-tac-toe.git`.

Next, install the dependencies with this command `sudo npm install`. Then, don't forget to change the word ***localhost*** of the *index.html* and *public/js/client.js* files by your ip adress. Finally, start the server `node server.js` and enter this url into your web browser `http://<your_ip>/tic-tac-toe/online/`.

## Todo

- Refactor/debug the code

- Add light mode

- Add robot/computer opponent mode