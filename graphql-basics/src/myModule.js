//named export
//default export - no name and you can only have one
const message = 'some message from my module.js';
const message2 = 'some second message from my module.js';

const location = 'Denver';

const getGreeting = name => `welcome to the coursse ${name}`; 

export {
    message,
    message2,
    getGreeting,
    location as default
} 