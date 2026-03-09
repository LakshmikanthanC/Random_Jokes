# 😂 Random Joke Generator

A **modern, fully dynamic Joke and Meme website** built using **HTML, CSS, and JavaScript**.
Generate **unlimited jokes, trending memes, quotes, and weather updates** with just one click.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-2.0-orange)

---

# 🌟 Features

## Core Features

* 🎲 **Unlimited Jokes** – Fetch jokes from multiple APIs
* 🖼️ **Trending Memes** – Display live memes from Reddit
* ❤️ **Save Favorites** – Store favorite jokes and memes locally
* 🌙 **Dark Mode** – Toggle between light and dark themes
* ⬇️ **Download Memes** – Save memes directly to your device
* 📋 **Copy & Share** – Share jokes on social media platforms

---

## Dynamic Content

* ☀️ **Live Weather Widget** – Displays real-time weather using wttr.in API
* 💬 **Daily Quotes** – Inspirational quotes from ZenQuotes API
* 📊 **Activity Stats** – Tracks jokes viewed, memes viewed, and favorites
* 👥 **User Reviews** – Dynamic testimonials using JSONPlaceholder API

---

# 🚀 Demo

Open **index.html** in your browser to start using the website.

---

# 📁 Project Structure

```
Random-Joke-Generator
│
├── index.html      # Home page
├── jokes.html      # Joke and meme generator page
├── about.html      # About the project
├── contact.html    # Contact form
├── script.js       # JavaScript functionality
├── style.css       # Styling and responsive design
└── README.md       # Project documentation
```

---

# 🎨 Design Features

* Fully **Responsive Design** (Mobile, Tablet, Desktop)
* Smooth **animations and transitions**
* Modern **gradient UI**
* **CSS Variables** for easy theme customization
* Accessible layout using **ARIA labels**
* SEO optimized with **meta tags**

---

# 🔌 APIs Used

| API               | Purpose                          |
| ----------------- | -------------------------------- |
| Official Joke API | Random jokes                     |
| JokeAPI           | Programming, dark, and pun jokes |
| Reddit API        | Trending memes                   |
| ZenQuotes API     | Inspirational quotes             |
| DummyJSON         | Backup quotes                    |
| JSONPlaceholder   | User reviews                     |
| wttr.in           | Weather data                     |

---

# 💻 Usage

## Generate Jokes

1. Open the **Jokes Page**
2. Select a **joke category**
3. Click **New Joke** or press **Spacebar**

Available categories:

* General
* Programming
* Pun
* Dark
* Spooky
* Christmas

---

## Get Memes

1. Click the **Memes Tab**
2. Browse trending memes from Reddit
3. Click **Download** or **Save to Favorites**

---

## Save Favorites

1. Click **❤️ Save Favorite**
2. View saved jokes and memes under **My Favorites**

---

## Share Jokes

Share jokes directly on:

* Twitter
* Facebook
* WhatsApp
* LinkedIn

---

# 🛠️ Technologies Used

* **HTML5** – Web page structure
* **CSS3** – Styling and responsive layout
* **JavaScript (ES6+)** – Dynamic functionality
* **REST APIs** – Fetch live data
* **LocalStorage** – Store favorite jokes and memes

---

# 📱 Browser Support

Supported on all modern browsers:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari
* Mobile Browsers

---

# 🔧 Customization

### Change Theme Colors

Edit CSS variables in **style.css**

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #f59e0b;
  --background: #f8fafc;
}
```

### Add More Joke Categories

Edit the **JOKE_APIS** object in **script.js**

```javascript
const JOKE_APIS = {
  general: "https://official-joke-api.appspot.com/random_joke",
  programming: "https://v2.jokeapi.dev/joke/Programming?type=single"
};
```

---

# 📝 License

This project is licensed under the **MIT License**.

---

# 🤝 Contributing

Contributions are welcome!

Steps to contribute:

1. Fork the repository
2. Create a new branch
3. Make improvements
4. Submit a Pull Request

---


⭐ If you like this project, consider **starring the repository**!
