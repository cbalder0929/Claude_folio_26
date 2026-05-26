# GalloShowdown 🐓

A desktop fighting game where you raise and battle roosters in an arena. Built with C# and .NET 8 on Windows.

---

## What is this game?

You play as a young boy who grew up watching roosters (gallos) fight. On your 10th birthday, your grandfather gifts you a prize rooster. Your dream: train it, care for it, and win big in the arena.

The game lets you:
- **Watch the intro story** play out scene by scene
- **Visit your Housing** to see your six roosters, check their stats, rename them, and pick which one goes into battle
- **Battle** — a one-on-one Street Fighter–style fight where you control your rooster against an AI opponent
- **Browse the Shop** and **explore the Forest** (both partially built — more features coming)

---

## How to run it

> **Windows only.** The game uses WPF, which is a Windows-only UI framework.

**Requirements:**
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) installed
- Windows 10 or later

**Steps:**
```
git clone https://github.com/cbalder0929/galloshowdown.git
cd galloshowdown
dotnet run
```

That's it. No extra packages needed.

---

## How to play

### The intro

When you launch the game, you see the studio logo, then the "Perron" logo drops from the sky. After that, four short story scenes play automatically — each one types out a line of the backstory letter by letter.

When the story finishes you arrive at the **main menu**.

### Main menu

Six buttons: **Housing**, **Battle**, **Shop**, **Forest**, **Training**, **Hatchery**.

- **Housing** and **Battle** are fully working.
- **Shop** and **Forest** have placeholder screens.
- **Training** and **Hatchery** show a "coming soon" message.

### Housing

Here you can browse your six roosters:

| Arrow buttons | Cycle through roosters one at a time |
|---|---|
| Name box | Click on the name to rename your rooster |
| Select button | Marks this rooster as the one that fights in Battle |

Each rooster shows its **Breed**, **Health**, **Stamina**, and **Speed** stats. Different breeds have different strengths — for example, the Black rooster is a tank (high HP), while the Guero rooster is a glass cannon (high Speed, lower HP).

### Battle

Pick your rooster in Housing first, then hit **Battle** from the main menu.

You face an AI-controlled opponent. It's a round-based fight — first to knock out the other rooster wins the round. First to win **2 rounds** wins the match.

**Player 1 controls (keyboard):**

| Key | Action |
|---|---|
| `A` | Move left |
| `D` | Move right |
| `W` | Jump |
| `S` | Crouch / Block |
| `J` | Light attack (quick, low damage) |
| `K` | Heavy attack (slow, high damage) |

The HP bars at the top shrink as fighters take damage. A **timer** counts down — if time runs out, the fighter with more HP wins the round. When a fighter is knocked out, a "K.O." banner appears before the next round begins.

---

## How the game was built

### Tech stack

| What | Why |
|---|---|
| **C#** | The programming language everything is written in |
| **.NET 8** | The runtime that executes the program |
| **WPF** (Windows Presentation Foundation) | Microsoft's UI framework for Windows desktop apps — handles windows, buttons, images, and animations |
| No external libraries | The whole game runs on .NET and WPF alone — no game engine, no NuGet packages |

### File structure

```
GalloShowdown/
│
├── App.xaml / App.xaml.cs      ← App startup; creates the player's stable of roosters
├── MainWindow.xaml             ← Every screen's visual layout lives here
├── MainWindow.xaml.cs          ← All the code that makes the screens work
│
├── Models/                     ← The "things" in the game
│   ├── Rooster.cs              ← Base class: what every rooster has in common
│   ├── RoosterFighter.cs       ← The combat version of a rooster (used in battle)
│   ├── Stable.cs               ← The player's collection of roosters
│   └── Breeds/                 ← One file per breed (Azteca, Black, Dorado, etc.)
│
├── Engine/
│   ├── BattleEngine.cs         ← Runs the fight simulation each frame
│   └── FighterState.cs         ← Enum: Idle, Walking, Jumping, Attacking, KO, etc.
│
├── Combat/
│   ├── Move.cs                 ← Base class for attacks
│   ├── LightAttack.cs          ← Quick peck
│   ├── HeavyAttack.cs          ← Powerful spur kick
│   └── Hitbox.cs               ← Rectangle that represents "where the attack lands"
│
├── Input/
│   ├── IInputProvider.cs       ← Interface: anything that can give the engine commands
│   ├── KeyboardInputProvider.cs← Reads WASD + J/K from the keyboard
│   └── AIInputProvider.cs      ← The computer opponent's decision-making
│
└── assets/                     ← Images (backgrounds, logos, sprites)
```

### How the screens work

All screens are stacked on top of each other in `MainWindow.xaml`. Only one is visible at a time — the others are hidden. Switching screens is as simple as hiding the current one and showing the next.

### How the battle loop works

Every frame (roughly 60 times per second), the game:

1. **Reads input** — checks which keys are held down for Player 1, and runs the AI logic for Player 2.
2. **Updates fighters** — moves them, applies gravity if they're in the air, advances their attack animations frame by frame.
3. **Checks for hits** — if an attacker's hitbox (the invisible rectangle around their fist/spur) overlaps the defender's hurtbox (the rectangle around their body), damage is dealt.
4. **Refreshes the UI** — updates HP bars, moves the sprites on screen, checks for a KO.

### OOP concepts used

The project was designed to demonstrate four core object-oriented programming ideas:

| Concept | Where you see it |
|---|---|
| **Encapsulation** | A rooster's Health can only change through `TakeDamage()` — you can't just set it to 0 from outside. The internal frame counters and velocity are completely hidden. |
| **Inheritance** | `AztecaRooster`, `BlackRooster`, etc. all extend the base `Rooster` class. `RoosterFighter` extends `Fighter`. Each subclass only defines what makes it different. |
| **Polymorphism** | The battle engine calls `Update()` and `Sample()` without caring whether it's talking to a keyboard player or an AI. `Move.BuildHitbox()` works differently for a light attack vs. a heavy attack, but the engine calls it the same way. |
| **Abstraction** | `IInputProvider` is just a contract: "give me the current commands." Swapping the AI for a second keyboard player only requires changing two lines at startup — the rest of the engine is untouched. |

### Animation & visuals

- **Intro animations** use WPF's built-in animation system (`DoubleAnimation`) to fade, drop, squash, and stretch elements.
- **Typewriter effect** uses a timer that adds one character at a time to a text label.
- **Sprite animation** (roosters in battle) cycles through a folder of PNG frames on a timer, updating the image source each tick.
- **HP bars** are plain `Rectangle` elements whose width is updated every frame based on current health percentage.

---

## Credits

- **Code, UI design, and architecture:** Carlos Balderas (May 2026)
- **Image assets:** generated with the assistance of Claude CLI, Codex CLI, and ChatGPT
- **Planning and architecture guidance:** Claude (Opus / Sonnet / Haiku)
- **Debugging and feature additions:** Codex CLI
