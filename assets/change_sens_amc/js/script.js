// Обработчики для ввода в поля, разрешающие только цифры
document.getElementById('sensitivity-current').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});
document.getElementById('sensitivity-required').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});

// Обработчик для кнопки 1: валидируем и обрабатываем код из первого поля
document.getElementById('btn1').addEventListener('click', function () {
    const currentSensitivity = document.getElementById('sensitivity-current').value;
    const requiredSensitivity = document.getElementById('sensitivity-required').value;

    // Проверка на пустоту полей
    if (!currentSensitivity || !requiredSensitivity) {
        showNotification('Поля "текущая сенса" и "необходимая сенса" не должны быть пустыми');
        return;
    }

    const code = document.getElementById('textarea1').value;
    if (validateCode(code)) {
        try {
            const newCode = convertSensitivityMacros(code, currentSensitivity, requiredSensitivity);
            document.getElementById('textarea2').value = newCode;
            showNotification('Код валиден и обработан');
        } catch (error) {
            showNotification('Ошибка при обработке кода: ' + error.message);
        }
    } else {
        showNotification('Ошибка валидации кода');
    }
});

// Обработчик для кнопки 2: открытие модального окна с описанием функционала
document.getElementById('btn2').addEventListener('click', function () {
    openModal();
});

// При клике по второму полю копируем его содержимое в буфер обмена
document.getElementById('textarea2').addEventListener('click', function () {
    const text = this.value;
    // Clipboard API работает только в безопасном контексте (HTTPS или localhost)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Содержимое скопировано в буфер обмена');
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            showNotification('Ошибка копирования содержимого');
        });
    } else {
        // Фолбэк для небезопасного контекста или старых браузеров
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            if (document.execCommand('copy')) {
                showNotification('Содержимое скопировано в буфер обмена');
            } else {
                throw new Error('Команда execCommand не сработала');
            }
        } catch (err) {
            console.error('Ошибка копирования:', err);
            showNotification('Ошибка копирования содержимого');
        }
        document.body.removeChild(tempInput);
    }
});

// Функции для работы с модальным окном
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

// Закрытие модального окна при клике на крестик
modalClose.addEventListener('click', function (event) {
    closeModal();
});

// Закрытие модального окна при клике вне его контента
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeModal();
    }
});