
function searchItem(){
    let searchText=document.getElementById("searchInput").value;
    if(searchtext===""){
        document.getElementById("result").innerHTML="please enter something.";
    }else{
        document.getElementById("result").innerHTML="you search for:" + searchText;
    }
}
const search=document.getElementById('search');
const items=document.querySelectorAll('#item-list li');
search.addEventListener('keyup',()=>{
const term=search.value.toLowerCase();
items.forEach(item=>{
    if(item.textContent.toLowerCase().includes(term)){
        item.classList.remove('hidden');
    }else{
        item.classList.add('hidden')
    }
});
});





