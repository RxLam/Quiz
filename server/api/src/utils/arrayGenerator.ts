// генерирует массив заполненный числами в порядке возрастания от start до stop
export const arrayGenerator = (from, to) => {
    let result = [];
    while (from <= to) {
        result.push(from++);
    }
    return result
}