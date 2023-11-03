import { filePath } from "../settings.js"

/**
 * Get random text from file
 * @param {string} file Path to JSON file with array of texts.
 * @returns {Promise<string>}
 */
export default function getRandomText() {
  return fetch(filePath)
   .then(res => res.json())
   .then(data => data[Math.floor(Math.random() * data.length)])
   .catch(() => 'Error! Could not open file: ' + filePath)
}
