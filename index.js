const buttonEl = document.getElementById("input-btn")
let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-el")
const tabEl = document.getElementById("tab-el")

let leadsfromlocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsfromlocalStorage){
    myLeads = leadsfromlocalStorage;
    render(myLeads)
}
function render(leads){
    let listItems = ""
    for(let count = 0; count< leads.length; count++)
    {   
        listItems += `<li>
         <a href = '${leads[count]}' target = '_blank'> 
         ${leads[count]} 
          </a>
         </li>`
    }
    ulEl.innerHTML = listItems

}

buttonEl.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

deleteEl.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = []
    render(myLeads)
})

tabEl.addEventListener("click", function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
      })
})



