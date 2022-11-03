'use strict';

  /* let banco = [
   /* {'tarefa': 'Estudar JS', 'status': ''},
    {'tarefa': 'netflix', 'status': 'checked'}, 
    {'tarefa': 'teste1', 'status': ''}
    
]; */

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));
 
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice =${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice =${indice}>
    `
    document.getElementById('todoList').appendChild(item);

}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach ( ( item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (event) => {
    const tecla = event.key;
    const text = event.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa': text, 'status': ''})
        setBanco(banco);
        atualizarTela();
        event.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status =  banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();

}

const clickItem = (event) => {
    const element = event.target;
    if (element.type ==='button') {
        const indice = element.dataset.indice;
        removerItem(indice);
    }else if (element.type === 'checkbox') {
        const indice = element.dataset.indice;
        atualizarItem (indice);
    }
}    

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();

