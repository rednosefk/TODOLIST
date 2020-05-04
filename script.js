
// добавляем элементы из html документа

const list = document.getElementById("list");
const input = document.getElementById("input");

// создаем переменные с названиями классов

const checkLogo = "fa-check-circle";
const uncheckLogo = "fa-circle";
const lineThroughLogo = "lineThrough";

// массив для инпута todo

var listToDo, id;

// берем item из localstorage

let data = localStorage.getItem("todo");

if(data) {          
    listToDo = JSON.parse(data);  //Если есть данные в localstorage
    id = listToDo.length;
    loadList(listToDo); 
} else {                          // Если нет данных в localstorage
   listToDo = [];
   id = 0;
}

function loadList(array) {         // загружаем данные в интерфейс редактора
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
 

localStorage.setItem("todo", JSON.stringify(listToDo));

// функция вывода заданий в .list

function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const doneToDo = done ? checkLogo : uncheckLogo;   //Если задание выполнено, используем класс cheklogo и lineThroughLogo.
    const lineToDo = done ? lineThroughLogo : "";

    const item = `<li class="item">
                    <i class="far ${doneToDo} co" job="complete" id="${id}"></i>
                    <p class="text ${lineToDo}">${toDo}</p>
                    <i class="fas fa-trash de" job="delete" id="${id}"></i>
                </li>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// добавляем задание по нажатию enter

document.addEventListener("keyup", function (event) {
    if(event.keyCode == 13) {
        const toDo = input.value;
            if (toDo) {  // если input не пустой 
                addToDo(toDo, id, false, false);

                listToDo.push ({    // добавляем введенный элемент в конец массива
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });

                localStorage.setItem("todo", JSON.stringify(listToDo)); // добавляем item в local storage.
                id++;    // увеличиваем значение id на один для следующих элементов
        }
        input.value = "";
    }
});

// вывод финкцию при нажатии кнопки check. 

function completeToDo(element) { 
    element.classList.toggle(checkLogo);    
    element.classList.toggle(uncheckLogo);
    element.parentElement.querySelector(".text").classList.toggle(lineThroughLogo);

    listToDo[element.id].done = listToDo[element.id].done ? false : true;
}

// функция для уделения введенных элементов из lista 

function removeToDo(element) {
    element.parentElement.parentElement.removeChild(element.parentElement);

    listToDo[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target; // возврат элемента в список
    const elementJob = element.attributes.job.value; // возврат выполнить или удалить

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("todo", JSON.stringify(listToDo)); // добавляем item в local storage.

})
    

