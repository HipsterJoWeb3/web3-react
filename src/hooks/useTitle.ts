

export const getTitleLessThan = (title: string, count: number) => {

    const separator = ' ';
    const words = title.split(separator);
    if (words.length <= count) {
        return title;
    }
    return `${words.slice(0, count).join(separator)}...`;
};
