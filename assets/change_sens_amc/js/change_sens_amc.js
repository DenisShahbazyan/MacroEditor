function convertSensitivityMacros(code, currentSensitivity, requiredSensitivity) {
    const factor = currentSensitivity / requiredSensitivity;

    const lines = cleanCode(code)

    // Регулярное выражение для команд вида "MoveR <x> <y>"
    const moveRRegex = /^MoveR\s+(-?\d+)\s+(-?\d+)$/;

    // Обрабатываем каждую строку
    const convertedLines = lines.map(line => {
        const match = line.match(moveRRegex);
        if (match) {
            // Извлекаем координаты и приводим к числам
            const x = Number(match[1]);
            const y = Number(match[2]);

            // Пересчитываем координаты с учётом коэффициента и округляем до целых чисел
            const newX = Math.round(x * factor);
            const newY = Math.round(y * factor);

            // Возвращаем строку с новыми координатами
            return `MoveR ${newX} ${newY}`;
        }
        // Если строка не соответствует формату "MoveR", возвращаем её без изменений
        return line;
    });

    // Собираем строки обратно в единый текст
    return convertedLines.join('\n');
}
