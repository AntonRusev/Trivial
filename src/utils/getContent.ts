export const getContentElement = (question: number) => {
    const content = document.getElementById('content');
    // setting min height to the content holder
    if (question > 20 && content) {
        content.classList.add('min-h-[24.5rem]');
    } else if (question > 10 && content) {
        content.classList.add('min-h-[19.3rem]');
    };
    return content;
};