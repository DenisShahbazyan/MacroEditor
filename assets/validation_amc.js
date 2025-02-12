/**
 * Разбиваем код на строки, убираем лишние пробелы и пустые строки.
 *
 * @param {string} code - исходный код с командами.
 * @returns {string} очищенный код.
 */
function cleanCode(code) {
    return code.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '')
}

/**
 * Функция для валидации исходного кода.
 *
 * @param {string} code - исходный код с командами.
 * @returns {boolean} - true, если код валиден, false в противном случае.
 */
function validateCode(code) {
    if (!code) { return false }

    const lines = cleanCode(code)

    // Для корректного чередования строк количество строк должно быть чётным:
    // первая строка - Delay, вторая - MoveR, и так далее.
    if (lines.length % 2 !== 0) {
        return false;
    }

    // Регулярное выражение для проверки строки Delay:
    // Должно быть: "Delay", пробел, число, пробел, "ms"
    const delayRegex = /^Delay\s+(\d+)\s+ms$/;

    // Регулярное выражение для проверки строки MoveR:
    // Должно быть: "MoveR", пробел, число (с опциональным минусом), пробел, число (с опциональным минусом)
    const moveRRegex = /^MoveR\s+(-?\d+)\s+(-?\d+)$/;

    // Проходим по всем строкам и проверяем соответствие требованиям:
    for (let i = 0; i < lines.length; i++) {
        if (i % 2 === 0) {
            // Чётные строки (индексы 0, 2, 4, ...) должны соответствовать формату Delay.
            if (!delayRegex.test(lines[i])) {
                return false;
            }
        } else {
            // Нечётные строки (индексы 1, 3, 5, ...) должны соответствовать формату MoveR.
            if (!moveRRegex.test(lines[i])) {
                return false;
            }
        }
    }

    // Если все проверки прошли успешно, возвращаем true.
    return true;
}