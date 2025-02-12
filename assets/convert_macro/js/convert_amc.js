/**
 * Функция извлекает координаты из кода и возвращает строку в формате:
 * { x, y }, 
 * для каждой найденной команды MoveR.
 *
 * @param {string} code - исходный код с командами.
 * @returns {string} Строка с координатами для вывода в textarea.
 */
function extractCoordinatesString(code) {
    const lines = cleanCode(code)

    // Регулярное выражение для команды MoveR.
    // Ожидаемый формат: "MoveR <число> <число>"
    const moveRRegex = /^MoveR\s+(-?\d+)\s+(-?\d+)$/;

    let output = '';

    // Проходим по всем строкам
    for (const line of lines) {
        const match = line.match(moveRRegex);
        if (match) {
            // Извлекаем координаты и преобразуем их в числа.
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            // Формируем строку координаты с запятой и переносом строки.
            output += `{ ${x}, ${y} },\n`;
        }
    }
    return output;
}