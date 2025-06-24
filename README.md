# 🧩 Rubik’s Cube Solver (3D + 2D Visualization)

This project is a 3D interactive Rubik’s Cube built using **HTML**, **CSS**, and **JavaScript**, with scramble and solve functionality. It also includes a **2D SVG-based face representation** using `getCubeSvg()` to visualize the cube’s state.

> 🎯 Created as part of an internship/fresher-level JavaScript assignment to demonstrate problem-solving and programming skills.

---

## 🚀 Features

- ✅ 3D Cube with interactive rotations using CSS transforms
- ✅ Manual face rotation by clicking on cube faces
- ✅ Drag to rotate the entire cube view in 3D
- ✅ Scramble button to generate a randomized cube
- ✅ Solve button that reverses the scramble steps
- ✅ Step-by-step animated rotation for scramble and solve
- ✅ 2D SVG visual display of cube state via `getCubeSvg()` function
- ✅ Arrow key controls for cube view (X/Y axis)

---

## 📂 File Structure
rubiks-cube-solver/
│
├── index.html # HTML structure for the 3D cube
├── style.css # Cube styling and layout
├── script.js # Cube logic, animation, and controls
├── README.md # Project documentation



---

## 🧠 Assignment Requirements

| Requirement                                          | Status |
|------------------------------------------------------|--------|
| Object-oriented cube representation                  | ✅     |
| Manual side rotations                                | ✅     |
| Scramble cube logic                                  | ✅     |
| Basic solving algorithm (reverse scramble)           | ✅     |
| Visual display at each step                          | ✅     |
| Use of `getCubeSvg()` for visualization              | ✅     |

---

## 🖥️ How to Use

1. **Open `index.html`** in any modern browser.
2. Use the mouse to:
   - Click + drag outside the cube to rotate view
   - Click on a face to rotate that side
3. Use the buttons (if added) to:
   - **Scramble** the cube
   - **Solve** the cube
4. Observe the cube state live in the 2D SVG panel (top-right).

> You can also use keyboard arrow keys to rotate the cube view.

---

## 🌐 Live Demo (Optional)

> If deployed using GitHub Pages:

**🔗 [View Live Cube Demo](https://Rakshitha1627.github.io/rubiks-cube/)**

Replace `yourusername` with your actual GitHub username once published.

---

## 🧠 How It Works

- Cube pieces (`.piece`) and stickers (`.sticker`) are styled and positioned in 3D.
- Logical structure uses cube face indexes and a simple rotation system.
- Animations are performed using JavaScript and `requestAnimationFrame()`.
- The `getCubeSvg()` function renders a compact SVG view based on the cube's logical state string like `'wwwwwwwwwrrrrrrrrr...'`.

---

## 📦 Future Improvements

- Implement actual cube state tracking to dynamically generate color strings
- Add step counter and move history
- Timer or stopwatch for speedsolving
- Better UI/UX with buttons and visual indicators

---

## 📜 License

This project is for educational and demonstration purposes. Feel free to fork and build upon it.

---

## 🙋‍♂️ Author

**Rakshitha S**

> Built with ❤️ as part of an intern-level coding challenge.

