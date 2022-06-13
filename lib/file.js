import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const file = {};

file.fullPath = (dir, fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../data', dir, fileName);
}

file.fullPublicPath = (trimmedFilePath) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../public', trimmedFilePath);
}

/**
 * Sukuriamas failas, jei tokio dar nera nurodytoje direktorijoje
 * @param {string} dir Reliatyvus kelias iki direktorijo, kur laikomi norimi failai, pvz.: /data/users
 * @param {string} fileName Nurimo failo pavadinimas su jo pletiniu
 * @param {object} content Objektas (pvz.: {...}), kuri norime irasyti i kuriama faila
 * @returns {boolean|string} Sekmes atveju - `true`; Klaidos atveju - klaidos pranesimas
 */
file.create = async (dir, fileName, content) => {
    let fileDescriptor = null;
    try {
        const filePath = file.fullPath(dir, fileName);
        fileDescriptor = await fs.open(filePath, 'wx');
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return true;
    } catch (error) {
        return false;
    } finally {
        if (fileDescriptor) {
            fileDescriptor.close();
        }
    }
}


/**
 * Perskaitomas failo turinys (tekstinis failas)
 * @param {string} dir Reliatyvus kelias iki direktorijos, kur laikomi norimi failai, pvz.: /data/users
 * @param {string} fileName Nurimo failo pavadinimas su jo pletiniu
 * @returns {Promise<string|boolean} Sekmes atveju - failo turinys; Klaidos atveju -   `false`
 */
file.read = async (dir, fileName) => {
    try {
        const filePath = file.fullPath(dir, fileName);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        return false;
    }
}

file.readPublic = async (trimmedFilePath) => {
    try {
        const filePath = file.fullPublicPath(trimmedFilePath);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        return false;
    }
}

/**
 * JSON failo turinio atnaujinimas .data folderyje
 * @param {string} dir Sub-folderis esants .data folderyje
 * @param {string} fileName kuriamo failo pavadinimas be failo pletinio
 * @param {Object} content JavaScript objektas, pvz.:  `{name: "Marsietis"}`
 * @returns {boolean} Pozymis, ar funkcija sekmingai atnaujino nurodyta faila
 */
file.update = async (dir, fileName, content) => {
    let fileDescriptor = null;
    try {
        const filePath = file.fullPath(dir, fileName);
        fileDescriptor = await fs.open(filePath, 'r+');
        await fileDescriptor.truncate();
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return true;
    } catch (error) {
        return false;
    } finally {
        if (fileDescriptor) {
            await fileDescriptor.close();
        }
    }
}

/**
 * JSON failo ištrinimas .data folteryje
 * @param {string} dir Sub-folderis esantis .data folderyje
 * @param {string} fileName Kuriamo failo pavadinimas be failo pletinio
 * @returns  {boolean} Pozymis, ar funkcija sekmingai istrine nurodyta faila
 */
file.delete = async (dir, fileName) => {
    try {
        const filePath = file.fullPath(dir, fileName);
        await fs.unlink(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

export { file }