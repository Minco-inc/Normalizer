export function normalize(vector: number[], {
    morePositive = true,
    allInteger = true,
    reduce = true
}: {
    morePositive?: boolean,
    allInteger?: boolean,
    reduce?: boolean
} = {}): number[] {
    let mf = 1;
    if (!allInteger && reduce) throw new Error('Cannot reduce and not all intege.r');
    if (allInteger) {
        mf *= getAllInteger(vector);
        vector = vector.map(v => v * mf);
        mf = 1;
    }
    if (reduce) mf *= getReduce(vector.map(v => Math.abs(v)));
    if (morePositive) mf *= getMorePositive(vector);
    return vector.map(v => v * mf);
}

function getAllInteger(vector: number[]): number {
    let longestDecimal = Math.max(...vector.map(countDecimals));
    return Math.pow(10, longestDecimal);
}

function getReduce(vector: number[]): number {
    let gcd = findGcd(vector);
    return 1/gcd;
}

function getMorePositive(vector: number[]): number {
    // check (count of positive numbers) > (count of negative numbers)
    let positive = 0;
    let negative = 0;
    vector.forEach(v => {
        if (v > 0) positive++;
        else negative++;
    });
    return positive > negative ? 1 : -1;
}

function getGcd(a: number, b: number): number {
    if (b === 0) return a;
    return getGcd(b, a % b);
}

function findGcd(arr: number[]): number {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = getGcd(arr[i], result);
        if (result == 1) {
            return 1;
        }
    }
    return result;
}

function countDecimals(value: number): number {
    if (Math.floor(value) !== value) return value.toString().split('.')[1].length || 0;
    return 0;
}
