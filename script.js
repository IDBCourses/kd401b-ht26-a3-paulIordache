(function () {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    try {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
            root.dataset.theme = saved;
        }
    } catch {
    }

    document.addEventListener("DOMContentLoaded", () => {
        const button = document.getElementById("theme-toggle");
        if (!button) return;

        const isDark = () =>
            root.dataset.theme
                ? root.dataset.theme === "dark"
                : systemDark.matches;

        const updateButton = () => {
            button.setAttribute("aria-pressed", String(isDark()));
            button.textContent = isDark() ? "Switch to light" : "Switch to dark";
        };

        button.addEventListener("click", () => {
            const next = isDark() ? "light" : "dark";
            root.dataset.theme = next;
            try {
                localStorage.setItem("theme", next);
            } catch {
            }
            updateButton();
        });

        systemDark.addEventListener("change", updateButton);

        updateButton();
    });
})();