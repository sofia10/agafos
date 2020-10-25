const Quiz = function () {
	this.questions = this.generateFakeData();
	this.questionId = 0;

	this.start = function () {
		this.setPagination();
		this.next(this.questionId);
		this.onPageChange();
	}
}

Quiz.prototype.next = function (index) {
	if (this.questions[index]) {
		this.questionId = index;
		this.showQuestion(index);
		this.showAnswers(index);
		this.setPaginationActive(index);
	} else {
		alert('Quiz finished');
	}
}

Quiz.prototype.setPaginationActive = function (index) {
	$('.pagination-item').removeClass('active');
	$('.pagination-item').eq(index).addClass('active');
}

Quiz.prototype.onPageChange = function (page) {
	let that = this;
	$('.pagination-item').click(function (ev) {
		let index = $(this).attr('question-index');
		ev.preventDefault();

		that.next(index);
	});
}

Quiz.prototype.showQuestion = function (index) {
	let currentQuestion = this.questions[index];

	$('.question-block_desc').html(currentQuestion.question);
	$('.question-block_title').html(currentQuestion.title);
}

Quiz.prototype.showAnswers = function (index) {
	let currentAnswers = this.questions[index].answers;
	let html = '';

	for (let answer of currentAnswers) {
		if (answer.hasImage) {
			html += `
				<div class="answers-item d-flex align-items-center" answer-id="${answer.id}">
					<img src="${answer.imageUrl}" class="answers-item_img">
					<p class="answers-item_txt">${answer.text}</p>
				</div>
			`;
		} else {
			html += `
				<div class="answers-item d-flex align-items-center" answer-id="${answer.id}">
					<p class="answers-item_txt">${answer.text}</p>
				</div>
			`;
		}
	}

	$('.answers').html(html);
	this.onAnswerClick();
}

Quiz.prototype.setPagination = function () {
	for (let i = 1; i <= this.questions.length; i++) {
		$('.pagination').append(`
			<li class="pagination-item" question-index="${i - 1}">
				<a href="#!" class="page">${i}</a>
			</li>
		`);
	}
}

Quiz.prototype.onAnswerClick = function () {
	let that = this;
	$('.answers-item').click(function () {
		let answerId = $(this).attr('answer-id');
		let isCorrect = that.validateAnswer(answerId);

		if (isCorrect) {
			$(this).addClass('corret');
		} else {
			$(this).addClass('wrong');
		}

		that.answerClickUnsubscribe();
		setTimeout(function () {
			that.questionId++
			that.next(that.questionId);
		}, 1200);
	});
}

Quiz.prototype.answerClickUnsubscribe = function () {
	$('.answers-item').off('click');
}

Quiz.prototype.validateAnswer = function (answerId) {
	if (answerId == this.questions[this.questionId].correctId) {
		return true;
	}
	return false;
}

Quiz.prototype.generateFakeData = function () {
	return [
		{
			title: 'Question N1', question: 'What is the name of company?', correctId: 3, answers: [
				{id: 1, text: 'Name of company is Google', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 2, text: 'Name of company is Facebook', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 3, text: 'Name of company is Agafos', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 4, text: 'Name of company is Yandex', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 5, text: 'Name of company is Nike', hasImage: false},
				{id: 6, text: 'Name of company is Opera', hasImage: false}]
		},
		{
			title: 'Question N2', question: 'What is your vacancy about?', correctId: 4, answers: [
				{id: 1, text: 'Play football with team', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 2, text: 'Learn covid-19 statistics', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 3, text: 'Build a flat', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 4, text: 'Hire a front-end developer', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 5, text: 'Watch videos on youtube', hasImage: false}],
		},
		{
			title: 'Question N3', question: 'How many years of experience do you want me to have?', correctId: 2, answers: [
				{id: 1, text: '2months will be great', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'},
				{id: 2, text: '4+ years of working experience', hasImage: true, imageUrl: 'https://via.placeholder.com/134x100'}],
		},
		{
			title: 'Question N4', question: 'Are you going to hire me?', correctId: 1, answers: [
				{id: 1, text: 'Of course we are', hasImage: false},
				{id: 2, text: 'No, we chose another candidate', hasImage: false}],
		}
	];
}

