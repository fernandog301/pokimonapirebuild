
const saveToLocalStorage = (pokemon: string) => {
    let favorites = getLocalStorage();

    if (!favorites.includes(pokemon)) {
        favorites.push(pokemon);
    }
    localStorage.setItem("Favorites", JSON.stringify(favorites));
};

const getLocalStorage = (): string[] => {
    let localStorageData = localStorage.getItem("Favorites");

    if (localStorageData === null) {
        return [];
    }
    return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (pokemon: string) => {
    let saved = getLocalStorage();

    let namedIndex = saved.indexOf(pokemon);

    if (namedIndex !== -1) {
        saved.splice(namedIndex, 1);
        localStorage.setItem("Favorites", JSON.stringify(saved));
    }
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };