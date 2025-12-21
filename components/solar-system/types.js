// types.js - Type definitions converted to JSDoc for JavaScript

/**
 * @typedef {Object} DisplayStats
 * @property {string} classification
 * @property {number} orbitalPeriod
 * @property {number} meanDistanceFromSun
 * @property {number} accurateRadius
 * @property {number} mass
 * @property {number} surfaceGravity
 * @property {number} rotationPeriod
 * @property {number} axialTilt
 * @property {number} numberOfMoons
 * @property {string} atmosphericComposition
 * @property {string} surfaceTemp
 */

/**
 * @typedef {Object} MoonData
 * @property {string} name
 */

/**
 * @typedef {Object} RingsData
 * @property {string} texturePath
 * @property {[number, number]} size
 */

/**
 * @typedef {Object} PlanetData
 * @property {number} id
 * @property {string} name
 * @property {string} texturePath
 * @property {import('three').Vector3} position
 * @property {number} radius
 * @property {number} rotationSpeed
 * @property {number} tilt
 * @property {number} orbitSpeed
 * @property {MoonData[]} moons
 * @property {boolean} [wobble]
 * @property {RingsData} [rings]
 * @property {import('three').Vector3} [orbitalPosition]
 * @property {DisplayStats} displayStats
 */

export {};
