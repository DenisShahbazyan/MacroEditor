/**
 * Функция, которая делит число на заданное количество частей.
 * Для первых (partsCount - 1) частей берется целая часть от деления,
 * а оставшаяся величина прибавляется к последней части.
 *
 * @param {number} num - исходное число
 * @param {number} partsCount - количество частей (например, 4)
 * @returns {number[]} Массив из partsCount чисел, сумма которых равна num.
 */
function splitNumber(num, partsCount) {
    // Вычисляем базовую часть – округление вниз
    const base = Math.floor(num / partsCount);
    // Для первых (partsCount - 1) частей используем base,
    // а последняя часть = num - base*(partsCount - 1)
    const parts = new Array(partsCount - 1).fill(base);
    const last = num - base * (partsCount - 1);
    parts.push(last);
    return parts;
}

/**
 * Функция, которая разбивает исходный код на «подкоманды».
 * Исходный код должен состоять из пар строк:
 *  - строка с форматом: "Delay <число> ms"
 *  - следующая строка с форматом: "MoveR <число> <число>"
 *
 * Каждая пара разбивается на 4 подпары, при этом сумма значений в разбивке
 * совпадает с исходными.
 *
 * @param {string} code - исходный код (несколько строк)
 * @returns {string} Новый код, где каждая пара разбита на 4 подпары.
 */
function splitCodeIntoParts(code) {
    // Разбиваем на строки и убираем лишние пробелы/пустые строки
    const lines = code
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line !== '');

    // Если строк нечётное число, значит формат нарушен (каждый Delay должен иметь свой MoveR)
    if (lines.length % 2 !== 0) {
        throw new Error("Неверный формат кода: должно быть чётное число строк.");
    }

    // Регулярные выражения для разбора строк
    const delayRegex = /^Delay\s+(\d+)\s+ms$/;
    const moveRRegex = /^MoveR\s+(-?\d+)\s+(-?\d+)$/;
    const partsCount = 4; // число частей для разбивки каждой пары

    const resultLines = [];

    // Проходим по парам строк (Delay + MoveR)
    for (let i = 0; i < lines.length; i += 2) {
        const delayLine = lines[i];
        const moveLine = lines[i + 1];

        const delayMatch = delayLine.match(delayRegex);
        const moveMatch = moveLine.match(moveRRegex);

        if (!delayMatch || !moveMatch) {
            throw new Error(`Неверный формат на строках ${i + 1}–${i + 2}`);
        }

        // Извлекаем числовые значения
        const delayValue = parseInt(delayMatch[1], 10);
        const moveX = parseInt(moveMatch[1], 10);
        const moveY = parseInt(moveMatch[2], 10);

        // Разбиваем каждое число на 4 части
        const delayParts = splitNumber(delayValue, partsCount);
        const moveXParts = splitNumber(moveX, partsCount);
        const moveYParts = splitNumber(moveY, partsCount);

        // Для каждой из 4 частей формируем подпару команд
        for (let j = 0; j < partsCount; j++) {
            resultLines.push(`Delay ${delayParts[j]} ms`);
            resultLines.push(`MoveR ${moveXParts[j]} ${moveYParts[j]}`);
        }
    }

    // Собираем результат в строку (каждая команда на новой строке)
    return resultLines.join('\n');
}