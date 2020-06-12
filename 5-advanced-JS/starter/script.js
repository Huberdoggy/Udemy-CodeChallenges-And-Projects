let userChoose;
let score = 0;

let Question = function (question, answers, correctAnswer) {
  this.question = question;
  this.answers = answers;
  this.correctAnswer = correctAnswer;
};


Question.prototype.randomGen = function () {
  let randomQuestion = allQuestionArr[Math.floor(Math.random() * allQuestionArr.length)];
  if (randomQuestion === 'What is the result of two times two?') {
    console.log(`${randomQuestion}`);
    console.log(`${q1.answers}`);
    userChoose = prompt('Type the correct answer.');
    userChoose == q1.correctAnswer ? (userChoose = 'Correct!', score += 1, console.log(userChoose + ' your score is ' + score)) : (userChoose = 'Nope, try again.', score = 0, console.log(userChoose + ' your score is reset'));
    this.gameOver();
    this.nextQuestion();
  } else if (randomQuestion === 'What is the largest mammal on the planet?') {
    console.log(`${randomQuestion}`);
    console.log(`${q2.answers}`);
    userChoose = prompt('Type the correct answer.');
    userChoose == q2.correctAnswer ? (userChoose = 'Correct!', score += 1, console.log(userChoose + ' your score is ' + score)) : (userChoose = 'Nope, try again.', score = 0, console.log(userChoose + ' your score is reset'));
    this.gameOver();
    this.nextQuestion();
  } else if (randomQuestion === 'Where is claimed to be the birthplace of civilization?') {
    console.log(`${randomQuestion}`);
    console.log(`${q3.answers}`);
    userChoose = prompt('Type the correct answer.');
    userChoose == q3.correctAnswer ? (userChoose = 'Correct!', score += 1, console.log(userChoose + ' your score is ' + score)) : (userChoose = 'Nope, try again.', score = 0, console.log(userChoose + ' your score is reset'));
    this.gameOver();
    this.nextQuestion();
  }
};

Question.prototype.gameOver = function () {
  if (score === 5) {
    alert('WINNER');
  }
  {
    return;
  }
};

Question.prototype.nextQuestion = function () {
  let confirm = prompt('Would you like to keep playing?');
  if (confirm === 'no' || confirm === 'exit') {
    window.stop();
  } else {
    this.randomGen();
  }
};

//My questions...
let q1 = new Question(
  'What is the result of two times two?', [
    "1 Two\n2 Ten\n3 Four"
  ], 3);

let q2 = new Question(
  'What is the largest mammal on the planet?',
  ['1 Elephant\n2 Blue whale\n3 Lion'], 2);

let q3 = new Question('Where is claimed to be the birthplace of civilization?',
  ['1 Asia\n2 South America\n3 Mesopotamia'], 3);

let allQuestionArr = [q1.question, q2.question, q3.question];
q1.randomGen();
