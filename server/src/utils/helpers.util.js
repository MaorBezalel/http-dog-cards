/**
 * Utility helper function that generates a range of numbers within a specified range (inclusive).
 *
 * @param {number} start - The start of the range.
 * @param {number} end - The end of the range.
 * @param {number} step - The step of the range.
 *
 * @returns {number[]} An array of numbers within the range.
 *
 * @throws {RangeError} If the `start` argument is greater than the `end` argument when the `step` argument is greater than 0.
 * @throws {RangeError} If the `start` argument is less than the `end` argument when the `step` argument is less than 0.
 */
export const range = (start, end, step = 1) => {
    if (step > 0 && start >= end) {
        throw new RangeError(
            'The `start` argument must be less than the `end` argument when the `step` argument is greater than 0.'
        );
    }
    if (step < 0 && start <= end) {
        throw new RangeError(
            'The `start` argument must be greater than the `end` argument when the `step` argument is less than 0.'
        );
    }

    // prettier-ignore
    const length = (start === end) 
        ? 1
        :  Math.ceil((end - start) / step) + 1; // +1 to include the `end` value in the range

    return Array.from({ length }, (_, i) => start + i * step);
};
