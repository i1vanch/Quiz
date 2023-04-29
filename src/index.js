import './css/style.css';
import MainImg from './css/img/mainImg.svg';
import data from './cities.json';

const app = document.querySelector('.app');

let currentPage = 1;

const specialties = [
    "Филология",
    "История",
    "Социология",
    "Психология",
    "Философия",
    "Археология",
    "Культурология",
    "Юриспруденция"
];

function renderMain() {
    const main = document.createElement('div');
    main.className = 'main';
    
    const mainTextContent = document.createElement('div');
    mainTextContent.className = 'main_text_content';

    const mainForm = document.createElement('div');
    mainForm.className = 'main_form';

    main.appendChild(mainTextContent);
    main.appendChild(mainForm);

    const mainTitle = document.createElement('h1');
    mainTitle.className = 'main_title';
    mainTitle.textContent = 'Подберём вуз мечты'

    const mainText = document.createElement('p');
    mainText.className = 'main_text';
    mainText.textContent = 'Ответьте на 8 простых вопросов, и мы составим список наболее подходящих для вас вузов';

    const mainImg = document.createElement('img');
    mainImg.className = 'main_img';
    mainImg.src = MainImg;

    mainTextContent.appendChild(mainTitle);
    mainTextContent.appendChild(mainText);
    mainTextContent.appendChild(mainImg);

    app.appendChild(main);

    const formHeader = document.createElement('div');
    formHeader.className = 'form_header';
    
    const headerTitle = document.createElement('p');
    headerTitle.className = 'header_title';

    const headerStep = document.createElement('p');
    headerStep.className = 'header_step';
    headerStep.textContent = `Шаг ${currentPage}/9`;

    const form = document.createElement('div');
    form.className = 'form';
    form.id = 'form_id';

    formHeader.appendChild(headerTitle);
    formHeader.appendChild(headerStep);
    formHeader.appendChild(headerStep);
    mainForm.appendChild(formHeader);
    mainForm.appendChild(form);

    const buttonsBox = document.createElement('div');
    buttonsBox.className = 'buttons_box';

    const backBtn = document.createElement('button');
    backBtn.className = 'back_btn';
    backBtn.textContent = 'Назад'

    const forwardBtn = document.createElement('button');
    forwardBtn.className = 'forward_button';
    forwardBtn.textContent = 'Далее';
    
    const next = document.createElement('img');
    next.className = 'buttons_img';
    next.setAttribute('src', './src/css/img/next.svg');

    const back = document.createElement('img');
    back.className = 'buttons_img';
    back.setAttribute('src', './src/css/img/back.svg');

    backBtn.appendChild(back);
    
    forwardBtn.appendChild(next);

    buttonsBox.appendChild(backBtn);
    buttonsBox.appendChild(forwardBtn);
    mainForm.appendChild(buttonsBox);

    renderStep1();

    backBtn.onclick =  () => {
        currentPage-=1;
        changeStep();
        if (forwardBtn.hasAttribute("disabled")) {
            forwardBtn.removeAttribute("disabled");
        };
    }; 
    forwardBtn.onclick =  () => {
        currentPage+=1;
        changeStep();
    };
};

renderMain();

function renderStep1() {
    const form = document.getElementById('form_id');
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Для кого вы ищете учебное заведение?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;

    if (document.querySelector('.steps_2_and7')) {
        document.querySelector('.steps_2_and7').className = 'buttons_box';
    };

    const backBtn = document.querySelector('.back_btn');
    backBtn.className = 'dis';

    const buttonsBox = document.querySelector('.buttons_box');
    buttonsBox.className = 'first_page_buttons';

    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');

    for (let i = 0; i < 6; i++) {

        const radioLabel = document.createElement('label');
        radioLabel.className = 'radio_label';

        const span = document.createElement('span');
        span.className = 'label_span';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'radio_button';
        radioButton.name = 'radio';
        radioButton.value = i + 1;
        radioButton.id = 'button' + (i + 1);

        const spanButton = document.createElement('span');
        spanButton.className = 'custom-radio-btn';

        radioLabel.appendChild(span);
        radioLabel.appendChild(radioButton);
        radioLabel.appendChild(spanButton);

        form.appendChild(radioLabel);
    };

    const spans = document.querySelectorAll('.label_span');
    const radioButtons  = document.querySelectorAll('.radio_button');
    const labels = document.querySelectorAll('.radio_label');

    if (window.gen1) {
        console.log(typeof window.gen1);
    };

    spans[0].textContent = 'Себе';
    spans[1].textContent = 'Супругу/супруге';
    spans[2].textContent = 'Родственнику';
    spans[3].textContent = 'Коллеге';
    spans[4].textContent = 'Ребенку';
    spans[5].textContent = 'Другое';

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', () => {
            if (radioButtons[i].checked) {
                for (let j = 0; j < labels.length; j++) {
                    labels[j].classList.remove('selected');
                };
                labels[i].classList.add('selected');
                currentPage+=1;
                setTimeout(changeStep, 300);
            };
        });  

        radioButtons[i].onclick = () =>{
            console.log(radioButtons[i].value);
            if (radioButtons[i].value) {
                forwardBtn.removeAttribute('disabled');
                window.gen1  = radioButtons[i].value;
            };
        };

        if (window.gen1) {
            window.gen1 = Number(window.gen1);
            radioButtons[window.gen1 - 1].checked = true;
            forwardBtn.removeAttribute('disabled');
            labels[window.gen1 - 1].classList.add('selected');
        };
    };
};

function renderStep2() {
    const form = document.querySelector('.form');

    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');
    
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'В каком городе планируете поступать?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;
    if (document.querySelector('.dis')) {
        document.querySelector('.dis').className = 'back_btn';
    };
    if (document.querySelector('.first_page_buttons')) {
        document.querySelector('.first_page_buttons').className = 'buttons_box';
    };
    
    const buttonsBox = document.querySelector('.buttons_box');
    buttonsBox.className = 'steps_2_and7';
    
    const selectedForm = document.createElement('div');
    selectedForm.classList = 'selected_form';

    const selLabel = document.createElement('label');
    selLabel.textContent = 'Город';
    
    const sel = document.createElement('select');
    sel.className = 'sel';
    sel.name = 'sel';
    sel.id = 'sel';

    const firstOption = document.createElement('option');
    firstOption.setAttribute('selected','disabled');
    
    firstOption.textContent = '';

    selectedForm.appendChild(selLabel);
    sel.appendChild(firstOption);
    selectedForm.appendChild(sel);
    form.appendChild(selectedForm);

    sel.addEventListener('click', function () {
        selectedForm.style.border = '1px solid #383838';
        form.classList.remove('anim');
    });
    sel.addEventListener('change', ()=> {
        forwardBtn.removeAttribute('disabled');
        console.log(sel.value);
        window.gen2  = sel.value;

        currentPage+=1;
        changeStep();
    });

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement('option');
        option.value = i+1;
        option.textContent = data[i].name;

        sel.appendChild(option);
    };
    if (window.gen2) {
        window.gen2 = Number(window.gen2);
        firstOption.textContent = data[window.gen2 - 1].name;
        forwardBtn.removeAttribute('disabled');
    };
};

function renderStep3() {
    const form = document.querySelector('.form');

    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Какое образование уже есть?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;
    if (document.querySelector('.steps_2_and7')) {
        document.querySelector('.steps_2_and7').className = 'buttons_box';
    };
    
    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');

    for (let i = 0; i < 6; i++) {

        const radioLabel = document.createElement('label');
        radioLabel.className = 'radio_label';

        const span = document.createElement('span');
        span.className = 'label_span';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'radio_button';
        radioButton.name = 'radio';
        radioButton.value = i + 1;
        radioButton.id = 'button' + (i + 1);

        const spanButton = document.createElement('span');
        spanButton.className = 'custom-radio-btn'

        radioLabel.appendChild(span);
        radioLabel.appendChild(radioButton);
        radioLabel.appendChild(spanButton);

        form.appendChild(radioLabel);
    };

    const spans = document.querySelectorAll('.label_span');
    const radioButtons  = document.querySelectorAll('.radio_button');
    const labels = document.querySelectorAll('.radio_label')
    spans[0].textContent = '9 классов';
    spans[1].textContent = 'Колледж/техникум';
    spans[2].textContent = '11 классов';
    spans[3].textContent = '11 классов';
    spans[4].textContent = 'Училище';
    spans[5].textContent = 'Неоконченное высшее';

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', () => {
            if (radioButtons[i].checked) {
                for (let j = 0; j < labels.length; j++) {
                    labels[j].classList.remove('selected');
                };
                labels[i].classList.add('selected');
            };
        });  
        radioButtons[i].onclick = () =>{
            console.log(radioButtons[i].value);
            if (radioButtons[i].value) {
                forwardBtn.removeAttribute('disabled');
                form.classList.remove('anim');
                window.gen3  = radioButtons[i].value;
                currentPage+=1;
                setTimeout(changeStep, 300);
            }; 
        };
        if (window.gen3) {
            window.gen3 = Number(window.gen3);
            radioButtons[window.gen3 - 1].checked = true;
            forwardBtn.removeAttribute('disabled');
            labels[window.gen3 - 1].classList.add('selected');
        };
    };
};

function renderStep4() {
    const form = document.querySelector('.form');
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Куда планируете поступать?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;

    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');

    for (let i = 0; i < 3; i++) {

        const radioLabel = document.createElement('label');
        radioLabel.className = 'radio_label_big';

        const span = document.createElement('span');
        span.className = 'label_span';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'radio_button';
        radioButton.name = 'radio';
        radioButton.value = i + 1;
        radioButton.id = 'button' + (i + 1);

        const spanButton = document.createElement('span');
        spanButton.className = 'custom-radio-btn'

        radioLabel.appendChild(span);
        radioLabel.appendChild(radioButton);
        radioLabel.appendChild(spanButton);

        form.appendChild(radioLabel);
    };

    const spans = document.querySelectorAll('.label_span');
    const radioButtons  = document.querySelectorAll('.radio_button');
    const labels = document.querySelectorAll('.radio_label_big')
    spans[0].textContent = 'Вуз';
    spans[1].textContent = 'Колледж/техникум';
    spans[2].textContent = 'Училище';
    
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', () => {
            if (radioButtons[i].checked) {
                for (let j = 0; j < labels.length; j++) {
                    labels[j].classList.remove('selected');
                };
                labels[i].classList.add('selected');
            };
        });  
        radioButtons[i].onclick = () =>{
            console.log(radioButtons[i].value);
            if (radioButtons[i].value) {
                forwardBtn.removeAttribute('disabled');
                form.classList.remove('anim');
                window.gen4  = radioButtons[i].value;
                currentPage+=1;
                setTimeout(changeStep, 300);
            };
        };
        if (window.gen4) {
            window.gen4 = Number(window.gen4);
            radioButtons[window.gen4 - 1].checked = true;
            forwardBtn.removeAttribute('disabled');
            labels[window.gen4 - 1].classList.add('selected');
        }
    };
};

function renderStep5() {
    const form = document.querySelector('.form');
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Какую форму обучения предпочитаете?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;

    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');

    for (let i = 0; i < 3; i++) {

        const radioLabel = document.createElement('label');
        radioLabel.className = 'radio_label_big';

        const span = document.createElement('span');
        span.className = 'label_span';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'radio_button';
        radioButton.name = 'radio';
        radioButton.value = i + 1;
        radioButton.id = 'button' + (i + 1);

        const spanButton = document.createElement('span');
        spanButton.className = 'custom-radio-btn'

        radioLabel.appendChild(span);
        radioLabel.appendChild(radioButton);
        radioLabel.appendChild(spanButton);

        form.appendChild(radioLabel);
    };

    const spans = document.querySelectorAll('.label_span');
    const radioButtons  = document.querySelectorAll('.radio_button');
    const labels = document.querySelectorAll('.radio_label_big')
    spans[0].textContent = 'Очную';
    spans[1].textContent = 'Заочную';
    spans[2].textContent = 'Дистанционную';
    
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', () => {
            if (radioButtons[i].checked) {
                for (let j = 0; j < labels.length; j++) {
                    labels[j].classList.remove('selected');
                };
                labels[i].classList.add('selected');
            };
        });  
        radioButtons[i].onclick = () =>{
            console.log(radioButtons[i].value);
            if (radioButtons[i].value) {
                forwardBtn.removeAttribute('disabled');
                window.gen5  = radioButtons[i].value;
                currentPage+=1;
                setTimeout(changeStep, 300);
            };
        }; 
        if (window.gen5) {
            window.gen5 = Number(window.gen5);
            radioButtons[window.gen5 - 1].checked = true;
            forwardBtn.removeAttribute('disabled');
            labels[window.gen5 - 1].classList.add('selected');
        };
    };
};

function renderStep6() {
    const form = document.querySelector('.form');
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Рассматриваете платное обучение?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;
    if (document.querySelector('.steps_2_and7')) {
        document.querySelector('.steps_2_and7').className = 'buttons_box';
    };

    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');

    for (let i = 0; i < 3; i++) {

        const radioLabel = document.createElement('label');
        radioLabel.className = 'radio_label_big';

        const span = document.createElement('span');
        span.className = 'label_span';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'radio_button';
        radioButton.name = 'radio';
        radioButton.value = i + 1;
        radioButton.id = 'button' + (i + 1);

        const spanButton = document.createElement('span');
        spanButton.className = 'custom-radio-btn'

        radioLabel.appendChild(span);
        radioLabel.appendChild(radioButton);
        radioLabel.appendChild(spanButton);

        form.appendChild(radioLabel);
    };

    const spans = document.querySelectorAll('.label_span');
    const radioButtons  = document.querySelectorAll('.radio_button');
    const labels = document.querySelectorAll('.radio_label_big')
    spans[0].textContent = 'Нет, только бюджет';
    spans[1].textContent = 'Да, планирую учиться платно';
    spans[2].textContent = 'Возможны оба варианта';
    

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', () => {
            if (radioButtons[i].checked) {
                for (let j = 0; j < labels.length; j++) {
                    labels[j].classList.remove('selected');
                };
                labels[i].classList.add('selected');
            };
        }); 
        radioButtons[i].onclick = () =>{
            console.log(radioButtons[i].value);
            if (radioButtons[i].value) {
                forwardBtn.removeAttribute('disabled');
                window.gen6  = radioButtons[i].value;
                currentPage+=1;
                setTimeout(changeStep, 300);
            };
        };  
        if (window.gen6) {
            window.gen6 = Number(window.gen6);
            radioButtons[window.gen6 - 1].checked = true;
            forwardBtn.removeAttribute('disabled');
            labels[window.gen6 - 1].classList.add('selected');
        };
    };
};

function renderStep7() {
    const form = document.querySelector('.form');
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Какая специальность интересует?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;
    const buttonsBox = document.querySelector('.buttons_box');
    buttonsBox.className = 'steps_2_and7';

    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');

    const selectedForm = document.createElement('div');
    selectedForm.classList = 'selected_form';

    const selLabel = document.createElement('label');
    selLabel.textContent = 'Специальность';
    
    const sel = document.createElement('select');
    sel.className = 'sel';
    sel.name = 'sel';
    sel.id = 'sel';

    const firstOption = document.createElement('option');
    firstOption.setAttribute('selected','disabled');
    firstOption.textContent = '';

    selectedForm.appendChild(selLabel);
    sel.appendChild(firstOption);
    selectedForm.appendChild(sel);
    form.appendChild(selectedForm);
    
    sel.addEventListener('click', function () {
        selectedForm.style.border = '1px solid #383838';
        form.classList.remove('anim');
    });
    sel.addEventListener('change', ()=> {
        forwardBtn.removeAttribute('disabled');
        window.gen7  = sel.value;
        currentPage+=1;
        changeStep();
    });
    
    for (let i = 0; i < specialties.length; i++) {
        const option = document.createElement('option');
        option.value = i+1;
        option.textContent = specialties[i];
        sel.appendChild(option);
    };
    if (window.gen7) {
        window.gen7 = Number(window.gen7);
        firstOption.textContent = specialties[window.gen7 - 1];
        forwardBtn.removeAttribute('disabled');
    };
    
};

function renderStep8() {
    const form = document.querySelector('.form');
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Как скоро планируете поступать?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;

    if (document.querySelector('.steps_2_and7')) {
        document.querySelector('.steps_2_and7').className = 'buttons_box';
    };

    const forwardBtn = document.querySelector('.forward_button');
    forwardBtn.setAttribute('disabled', 'true');

    for (let i = 0; i < 5; i++) {

        const radioLabel = document.createElement('label');
        radioLabel.className = 'radio_label';

        const span = document.createElement('span');
        span.className = 'label_span';

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.className = 'radio_button';
        radioButton.name = 'radio';
        radioButton.value = i + 1;
        radioButton.id = 'button' + (i + 1);

        const spanButton = document.createElement('span');
        spanButton.className = 'custom-radio-btn'

        radioLabel.appendChild(span);
        radioLabel.appendChild(radioButton);
        radioLabel.appendChild(spanButton);

        form.appendChild(radioLabel);
    };

    const spans = document.querySelectorAll('.label_span');
    const radioButtons  = document.querySelectorAll('.radio_button');
    const labels = document.querySelectorAll('.radio_label')
    spans[0].textContent = 'Как можно быстрее';
    spans[1].textContent = 'Месяц';
    spans[2].textContent = 'Квартал';
    spans[3].textContent = 'Полгода';
    spans[4].textContent = 'Год';
    
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', () => {
            if (radioButtons[i].checked) {
                for (let j = 0; j < labels.length; j++) {
                    labels[j].classList.remove('selected');
                };
                labels[i].classList.add('selected');
            };
        });  
        radioButtons[i].onclick = () =>{
            console.log(radioButtons[i].value);
            if (radioButtons[i].value) {
                forwardBtn.removeAttribute('disabled');
                window.gen8  = radioButtons[i].value;
                currentPage+=1;
                setTimeout(changeStep, 300);
            };
        };  
        if (window.gen8) {
            window.gen8 = Number(window.gen8);
            radioButtons[window.gen8 - 1].checked = true;
            forwardBtn.removeAttribute('disabled');
            labels[window.gen8 - 1].classList.add('selected');
        };
    };
};

function renderStep9() {
    const form = document.querySelector('.form');
    const headerTitle = document.querySelector('.header_title');
    headerTitle.textContent = 'Ваша подборка готова! 🥳 Куда нам отправить её?';
    form.textContent = '';
    const headerStep = document.querySelector('.header_step');
    headerStep.textContent = `Шаг ${currentPage}/9`;
    const buttonBox = document.querySelector('.buttons_box');
    buttonBox.className = 'dis';

    for (let i = 0; i < 3; i++) {
        const input = document.createElement('input');
        input.className = 'last_inputs';
        form.appendChild(input);
    };

    const inputs = document.querySelectorAll('.last_inputs')
    inputs[0].setAttribute("placeholder", "Как вас зовут?");
    inputs[0].setAttribute("type", "text");
    inputs[1].setAttribute("placeholder", "Номер телефона");
    inputs[1].setAttribute("type", "tel");
    inputs[2].setAttribute("placeholder", "E-mail");
    inputs[2].setAttribute("type", "email");

    const lastButton = document.createElement('button');
    lastButton.className = 'last_button';
    lastButton.textContent = 'Получить подборку';

    const lastText = document.createElement('p');
    lastText.className = 'last_text';
    lastText.textContent = 'Нажимая на кнопку, вы даете согласие на обработку своих ';

    const lastLink = document.createElement('a');
    lastLink.className = 'last_link';
    lastLink.textContent = 'Персональных данных';
    lastLink.setAttribute('href', '#');

    form.appendChild(lastButton);
    lastText.appendChild(lastLink);
    form.appendChild(lastText);
};

function changeStep() {
    if (currentPage === 1) {
        return renderStep1();
    }else if (currentPage === 2) {
        return renderStep2();
    }else if (currentPage === 3) {
        return renderStep3();
    }else if (currentPage === 4) {
        return renderStep4();
    }else if (currentPage === 5) {
        return renderStep5();
    }else if (currentPage === 6) {
        return renderStep6();
    }else if (currentPage === 7) {
        return renderStep7();
    }else if (currentPage === 8) {
        return renderStep8();
    }else if (currentPage === 9) {
        return renderStep9();
    };
};