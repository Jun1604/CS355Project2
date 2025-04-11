const darkToggle = document.getElementById("dark-mode-toggle");

// 🌙 Load theme preference
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️ Light Mode";
}

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkToggle.textContent = "☀️ Light Mode";
        localStorage.setItem("mode", "dark");
    } else {
        darkToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("mode", "light");
    }
});