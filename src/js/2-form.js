// 1️⃣ Оголошуємо об’єкт formData поза функціями
const formData = {
    email: "",
    message: ""
};

// Ключ у локальному сховищі
const STORAGE_KEY = "feedback-form-state";

// 2️⃣ Отримуємо форму
const form = document.querySelector(".feedback-form");

// 3️⃣ Відновлюємо дані з локального сховища при завантаженні сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
}

// 4️⃣ Делегуємо подію input для зберігання даних у formData та localStorage
form.addEventListener("input", (event) => {
    const { name, value } = event.target;

    if (name in formData) {
        formData[name] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
});

// 5️⃣ Обробка сабміту форми
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Перевірка заповненості полів
    if (!formData.email.trim() || !formData.message.trim()) {
        alert("Fill please all fields");
        return;
    }

    // Виводимо дані у консоль
    console.log(formData);

    // Очищаємо форму, об’єкт та локальне сховище
    form.reset();
    formData.email = "";
    formData.message = "";
    localStorage.removeItem(STORAGE_KEY);
});