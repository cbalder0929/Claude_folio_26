🟩 World Game — A Wordle Clone
A fun, browser-based word-guessing game inspired by the viral game Wordle. No downloads, no accounts, no nonsense — just open it in your browser and start playing!

🎮 What Is This?
This is a clone of the popular word game Wordle. Your goal is simple:

Guess a secret 5-letter word in 6 tries or fewer.

After each guess, the game gives you color-coded hints:

Color	What It Means
🟦 Blue (Correct)	The letter is in the word AND in the right spot
🟨 Yellow (Present)	The letter is in the word, but in the wrong spot
⬛ Gray (Absent)	The letter is NOT in the word at all
Use those clues to narrow down the answer, guess by guess!

🕹️ How To Play
Open the game in your web browser.
Type a 5-letter word using your keyboard or the on-screen keyboard.
Press Enter to submit your guess.
Read the color hints and make a smarter next guess.
Keep going — you have 6 attempts total.
Win by guessing the word correctly. 🎉
If you don't get it in 6 tries, the answer is revealed.
Hit Play Again to start a fresh game with a new random word!
💡 Tip: A brand-new word is chosen at random every time you refresh or start a new game.

❓ Why Was This Built?
This project was built as a fun way to:

Practice front-end web development — building a real, interactive game is one of the best ways to learn.
Understand game logic — things like evaluating guesses, handling duplicate letters correctly, and tracking game state are great programming challenges.
Create something shareable — after the game ends you can copy a spoiler-free emoji grid to share your results with friends, just like the real Wordle.
It's a personal project to sharpen skills in HTML, CSS, and JavaScript while building something people actually enjoy using.

🛠️ How It Was Built
The entire game runs in a single web page with no frameworks, no servers, and no external dependencies (except a Google Font for styling). Here's what each file does:

File	What It Does
index.html	The skeleton of the page — the game board, keyboard, header, and pop-up modals are all defined here
style.css	All the visuals — dark graffiti-inspired theme, tile flip animations, bounce effects, responsive layout
game.js	All the game logic — picking a random word, checking guesses, coloring tiles, tracking win/loss, sharing results
wordleW.png	The logo icon shown in the browser tab and the header
favicon.svg	The small icon shown in the browser tab on some browsers
Technologies Used
HTML5 — Structure of the page
CSS3 — Styling, animations (flip, bounce, shake), and responsive design for different screen sizes
Vanilla JavaScript — All game logic, no frameworks needed
How the Game Logic Works (plain English)
When the page loads, the game randomly picks one word from a built-in list of ~500 common 5-letter words.
As you type, letters appear on the board tiles.
When you press Enter, the game compares your guess to the secret word letter by letter:
First it finds all letters in the exact right position (blue).
Then it finds letters that exist in the word but are in the wrong position (yellow).
Everything else is marked absent (gray).
The on-screen keyboard also gets colored so you can see at a glance which letters you've already used.
If you get the word right, the tiles bounce and a win screen appears. If you run out of guesses, the answer is revealed.
The Share button copies an emoji version of your guess grid to your clipboard so you can paste it anywhere without spoiling the answer.
🚀 How To Run It
No installation needed!

Download or clone this repository.
Open the index.html file in any modern web browser (Chrome, Firefox, Edge, Safari).
That's it — the game loads instantly!
# If you have Git installed, clone it like this:
git clone https://github.com/cbalder0929/World_Game.git
cd World_Game
# Then just open index.html in your browser
📁 Project Structure
World_Game/
├── index.html      # Main game page
├── style.css       # All styles and animations
├── game.js         # All game logic
├── wordleW.png     # Logo image
└── favicon.svg     # Browser tab icon
📝 License
This is a personal project built for learning purposes. Feel free to fork it, play with it, or use it as a starting point for your own projects!