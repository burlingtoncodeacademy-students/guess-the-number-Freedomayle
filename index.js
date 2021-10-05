const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.

  //Story One: The computer picks a number between 1 and 100 and guesses it against my secret number.

  function randomNum(min, max) {
    let range = max - min + 1


    return Math.floor(Math.random() * range) + min
  }

  let firstGuess = randomNum(0, 100)
  let guessCheck = await ask(`Is this your number? ${firstGuess} (Y)ES/(N)O? `)

  //Story Two: If I respond with (Y)ES the game responds with a victory message.

  if (guessCheck.toLowerCase() === 'yes' || guessCheck.toLowerCase() === 'y') {
    console.log(`Your number was ${firstGuess}! Yay me!`)
    process.exit()
  }

  //Story Three: If I respond with N(O) the game responds by asking if it's (H)IGHER or (L)OWER.

  else if (guessCheck.toLowerCase() === 'no' || guessCheck.toLowerCase() === 'n') {
    let hiLow = await ask('Is your number (H)IGHER or (L)OWER? ')

    // Story Four: If I respond with (H)IGHER the range is modified with a new minimum.
    // If I respond with (L)OWER the range is modified with a new maximum.
    // Computer guesses a new value within that range, if incorrect it repeats the process.

    let newMin = firstGuess
    let max = 100

    // try 1 while where compGuess !== secretNumber

    while (hiLow.toLowerCase() === 'higher' || hiLow.toLowerCase() === 'h') {
      let highCompGuess = (((max - newMin) / 2) + newMin)
      let newHighCheck = await ask('Could this be your higher number? ' + Math.floor(highCompGuess) + ' (Y)ES/(N)O? : ')

      if (newHighCheck.toLowerCase() === 'yes' || newHighCheck.toLowerCase() === 'y') {
        console.log('Your number was ' + Math.floor(highCompGuess) + '! Yay me!')
        process.exit()

      }

      else if (newHighCheck.toLowerCase() === 'no' || newHighCheck.toLowerCase() === 'n') {
        hiLow = await ask('Is your number (H)IGHER or (L)OWER? ')

      }
      newMin = highCompGuess

    }

    let newMax = firstGuess
    let min = 1

    while (hiLow.toLowerCase() === 'lower' || hiLow.toLowerCase() === 'l') {
      let lowCompGuess = (((newMax - min) / 2) + min)
      let newLowCheck = await ask('Could this be your lower number? ' + Math.floor(lowCompGuess) + ' (Y)ES/(N)O? : ')

      if (newLowCheck.toLowerCase() === 'yes' || newLowCheck.toLowerCase() === 'y') {
        console.log('Your number was ' + Math.floor(lowCompGuess) + '! Yay me!')
        process.exit()

      }

      else if (newLowCheck.toLowerCase() === 'no' || newLowCheck.toLowerCase() === 'n') {
        hiLow = await ask('Is your number (H)IGHER or (L)OWER? ')

      }
      newMax = lowCompGuess

    }
  }
}

// Apologies to whoever has to read/grade this. I got stuck on Story 4 and my internet was down
// on Sunday until 8pm. Without anything new to reference I kept spinning myself in circles.
// I couldn't attend the office hours because of my internet and was left with this catastrophe. 