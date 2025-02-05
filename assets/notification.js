// Функция для отображения уведомления в правом нижнем углу
function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    container.appendChild(notification);

    // Через 1 секунду начинаем анимацию исчезновения
    setTimeout(() => {
        notification.classList.add('fade-out');
        // После завершения анимации (0.5 сек) удаляем уведомление
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 500);
    }, 1000);
}