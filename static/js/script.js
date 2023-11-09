
const List_Data = document.getElementById('list-wrapper');
const MyForm = document.getElementById('MyForm');
let ToDoList = '';
let storeItem = null;
let strik = true;
let complete;


// CSRF TOKEN
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// ================ \\

function renderData(data) {
    let count = 0;

    List_Data.innerHTML = "";

    data.forEach(value => {
        List_Data.innerHTML += ` 
        <div>
            <p class="mt-3 list_text non-line-strik ">${value.Name}</p>
            <span>
                <button class="me-1 edit_btn" ><i class="bi bi-pencil-square text-dark"></i> </button>
                <button class="delete_btn" ><i class="bi bi-trash text-danger"></i></button>
            </span>
        </div>  `

        count++;

    });



    let editBtn = document.querySelectorAll('.edit_btn');
    let deleteBtn = document.querySelectorAll('.delete_btn');
    let lineThrough = document.querySelectorAll('.list_text');


    for (let i = 0; i <= count - 1; i++) {
        editBtn[i].addEventListener('click', () => {
            editItem(data[i]);
        });
        deleteBtn[i].addEventListener('click', () => {
            deleteItem(data[i]);
        });
        lineThrough[i].addEventListener('click', () => {
            textStrik(data[i], i);
        });

        if (data[i].Complete == true) {
            lineThrough[i].classList.remove('non-line-strik');
            lineThrough[i].classList.add('line-strik');
        } else {
            lineThrough[i].classList.remove('line-strik');
            lineThrough[i].classList.add('non-line-strik');
        }
    }


};


// Send API Respones 
function apiCall() {
    const API_URL = "http://127.0.0.1:8000/api/show_list/";

    fetch(API_URL)
        .then(response => {
            return response.json()
        })
        .then(data => {
            renderData(data)
        })

};



//  To Clear Form Input Data
function clearinput(ToDoList) {
    document.getElementById('ToDoList').value = '';
};


// Get data by form submition
MyForm.addEventListener('submit', event => {
    event.preventDefault();

    ToDoList = document.getElementById('ToDoList').value;

    let API_URL = "http://127.0.0.1:8000/api/create_list/";

    if (storeItem != null) {
        let API_URL = `http://127.0.0.1:8000/api/update_list/${storeItem.id}`;
        let Fetch_Options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ "Name": ToDoList })
        };

        fetch(API_URL, Fetch_Options)
            .then(response => {
                apiCall()
            });

        storeItem = null;

    } else {
        let Fetch_Options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ "Name": ToDoList })
        };

        fetch(API_URL, Fetch_Options)
            .then(response => {
                apiCall()
            });

    }

    clearinput(ToDoList);
});



// Edit the list
function editItem(item) {
    document.getElementById('ToDoList').value = item.Name;
    storeItem = item;
};


// Delete the List Item
function deleteItem(item) {

    API_URL = `http://127.0.0.1:8000/api/delete_list/${item.id}`;
    let Fetch_Options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
    };

    fetch(API_URL, Fetch_Options)
        .then(response => {
            apiCall()
        });
};



// Function For Strik Through the text
function textStrik(item, i) {

    item.Complete = !item.Complete

    let API_URL = `http://127.0.0.1:8000/api/update_list/${item.id}`;
    let Fetch_Options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ "Name": item.Name, "Complete": item.Complete })
    };

    fetch(API_URL, Fetch_Options)
        .then(response => {
            apiCall()
        })

}





// Call API Render Data For Frontend
apiCall()
