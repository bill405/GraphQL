//default and named exports
import myCurrentLocation, {message, message2, getGreeting} from './myModule';
import adder, {mySubtractor} from './math';

console.log(message);
console.log(message2);
console.log(myCurrentLocation);
console.log(getGreeting('Billy'));

console.log(adder(1,2));
console.log(mySubtractor(5, 1));