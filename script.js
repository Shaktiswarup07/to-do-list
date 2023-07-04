const lists=document.getElementById('list');
const create_btn=document.getElementById('create');
const img=document.querySelector('img');

let todos=[];

create_btn.addEventListener('click', function (e) {
    
    // img.classList.add('displayNone');
    const item={
        id:new Date().getTime(),
        text:"",
        completed:false
    }
    todos.unshift(item);
    const {item_el, input_el}= createTodoElement(item);
    lists.prepend(item_el);
    input_el.removeAttribute("disabled");
    input_el.focus();

    Save();
});

 /* <div class="item">
            <input type="checkbox" >
            <input type="text" value="Todo content goes here" disabled>
        <div class="actions">
            <button class="icons edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="icons delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div> */

function createTodoElement(item){
    const item_el=document.createElement("div");
    item_el.classList.add('item');

    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked = item.completed;

    if(item.completed){
        item_el.classList.add('complete');
    }
    const input_el=document.createElement('input');
    input_el.type='text';
    input_el.value=item.text;
    input_el.setAttribute('disabled','');
    const actions_el=document.createElement('div');
    actions_el.classList.add('actions');

    const edit_btn=document.createElement('button');
    edit_btn.classList.add('icons','edit');
    const iedit=document.createElement('i');
    iedit.classList.add('fa-regular', 'fa-pen-to-square');
    edit_btn.appendChild(iedit);
    const del_btn=document.createElement('button');
    del_btn.classList.add('icons','delete');
    const idel=document.createElement('i');
    idel.classList.add('fa-solid', 'fa-trash');
    del_btn.appendChild(idel);
    actions_el.appendChild(edit_btn);
    actions_el.appendChild(del_btn);
    item_el.appendChild(checkbox)
    item_el.appendChild(input_el)
    item_el.appendChild(actions_el)
    // item_el.appendChild(checkbox)
    // console.log(item_el);
    //Events
    checkbox.addEventListener('change',function(){
        // console.log(item);
        item.completed=checkbox.checked;
        if(item.completed){
            item_el.classList.add('complete')
        }
        else{
            item_el.classList.remove('complete')
        }

        Save();
    })
    input_el.addEventListener('blur',function(){
        input_el.setAttribute('disabled','')
        Save();
    })
    input_el.addEventListener('input',()=>item.text=input_el.value);
    edit_btn.addEventListener('click', function (e) {
        input_el.removeAttribute('disabled');
        input_el.focus();
        item_el.classList.remove('complete')
    });
    del_btn.addEventListener('click', function (e) {
        todos=todos.filter(t=>t.id!==item.id)
        // console.log(item)
        item_el.remove();
        // if(todos.length===0) img.classList.remove('displayNone');
        Save();
    });
    return {item_el,input_el,edit_btn,del_btn};
}

function DisplayTodos(){
    Load();
    // console.log(todos);
    for(let i = 0 ; i< todos.length ; i++){
        const {item_el, input_el}= createTodoElement(todos[i]);
        lists.append(item_el);
    }
}
DisplayTodos();

function Save(){
    //SAVE TODOS 
    const save=JSON.stringify(todos);

    localStorage.setItem('my-todos',save)
}

function Load(){
    const data=localStorage.getItem('my-todos');
    if(data){
        todos=JSON.parse(data);
    }
}