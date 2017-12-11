/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @since 0.1.0
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see inRange, rangeRight
 * @example
 *
 * range(4)
 * // => [0, 1, 2, 3]
 *
 * range(-4)
 * // => [0, -1, -2, -3]
 *
 * range(1, 5)
 * // => [1, 2, 3, 4]
 *
 * range(0, 20, 5)
 * // => [0, 5, 10, 15]
 *
 * range(0, -4, -1)
 * // => [0, -1, -2, -3]
 *
 * range(1, 4, 0)
 * // => [1, 1, 1]
 *
 * range(0)
 * // => []
 */

export const range = createRange()

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argumentindex).
 *
 * @since 0.1.0
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * times(3, String)
 * // => ['0', '1', '2']
 *
 *  times(4, () => 0)
 * // => [0, 0, 0, 0]
 */
export function times(n, iteratee) {
    if (n < 1 || n > MAX_SAFE_INTEGER) {
        return []
    }
    let index = -1
    const length = Math.min(n, MAX_ARRAY_LENGTH)
    const result = new Array(length)
    while (++index < length) {
        result[index] = iteratee(index)
    }
    index = MAX_ARRAY_LENGTH
    n -= MAX_ARRAY_LENGTH
    while (++index < n) {
        iteratee(index)
    }
    return result
}

export default times

/////////////
// HELPERS //
////////////

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295

/**
 * Creates a `range` or `rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
    return (start, end, step) => {
        
        if (end === undefined) {
            end = start
            start = 0
        }
        step = step === undefined ? (start < end ? 1 : -1) : step
        return baseRange(start, end, step, fromRight)
    }
}

/**
 * The base implementation of `range` and `rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
    let index = -1
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0)
    const result = new Array(length)

    while (length--) {
        result[fromRight ? length : ++index] = start
        start += step
    }
    return result
}
