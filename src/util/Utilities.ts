export default class Utilites {
  private constructor() {
    throw new Error('Bad Dont do that.')
  }

  /**
	 * Check if the provided object is of the type
	 *
	 * @param {object} obj - the object to test
	 * @param {Function} type - the type to test against
	 * @returns
	 */
  static isOfType<T extends Function>(obj: unknown, type: T): obj is T {
		return obj instanceof type;
	}
}

/** If your reading this, Jpuf did this entire event loading system, And It hurts my head. - MythicXGN */