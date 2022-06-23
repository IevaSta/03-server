class IsValid {
    static fullname(str) {
        if (str === undefined) {
            return [true, 'Neduotas parametras'];
        }

        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string".'];
        }

        str = str.trim().replace(/\s+/g, ' '); //arba (/ +/g, ' ')

        const minWordsCount = 2;
        const minWorldLength = 2;
        const minTextLength = minWordsCount * minWorldLength + (minWordsCount - 1);

        if (str.length < 5) {
            return [true, `Per trumpas tekstas, turi buti ${minTextLength} simboliai maziausiai.`];
        }

        const allowedSymbols = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        const words = str.split(' ');
        if (words.length < minWordsCount) {
            return [true, `Teksta turi sudaryti ${minWordsCount} zodziai arba daugiau.`];
        }

        for (const word of words) {
            if (word.length < minWorldLength) {
                return [true, `Visos vardo dalys turi buti maziausiai ${minWorldLength} simboliu.`];
            }

            //pirma raide
            if (word[0].toUpperCase() !== word[0]) {
                return [true, `Pirma zodzio raide turi buti didzioji`];
            };

            //kitos raides
            const otherLetters = word.slice(1);
            if (otherLetters.toLowerCase() !== otherLetters) {
                return [true, `Ne pirma zodzio raide turi buti mazoji`];
            };

            //ar tik leistinos reides
            for (const s of word) {
                if (!allowedSymbols.includes(s)) {
                    return [true, `Neleistinas simbolis "${s}"`];
                }
            }
        }

        return [false, 'OK'];
    }

    static email(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas email tekstas'];
        }
        return [false, 'OK'];
    }

    static password(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas password tekstas'];
        }
        return [false, 'OK'];
    }
}

export { IsValid }