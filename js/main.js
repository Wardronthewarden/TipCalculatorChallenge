let bill;
let tip;
let people;

const billInput = document.querySelector("#bill")
const peopleInput = document.querySelector("#people")
const selectButtons = document.querySelectorAll(".tipSelectionButton")
const customTip = document.querySelector(".tipSelectionInput")
const tipAmount = document.querySelector("#totals_tip")
const tipTotal = document.querySelector("#totals_tot")
const reset = document.querySelector(".resetBTN")



customTip.addEventListener('change', changeTip)
billInput.addEventListener('change',(event)=> updateBill(event))
peopleInput.addEventListener('change', (event)=> updatePeople(event))
selectButtons.forEach(element=> element.addEventListener('click', changeTip))
reset.addEventListener('click', resetForm)



function updateForm(event){
    targetValue=event.target.value;
    msg=document.querySelector(`#${event.target.id}Error`)
    if(targetValue <= 0){
     console.log(msg)
        event.target.setCustomValidity("error")
     msg.classList.remove('hidden')   
    }else{
        msg.classList.add('hidden')
        event.target.setCustomValidity("")
    }
  return targetValue;
}

function updateBill(event){
    bill = updateForm(event)
    billInput.value = displayAsDecimal(bill)
    console.log(bill)
    updateStates()
}

function updatePeople(event){
    people = updateForm(event)
    console.log(people)
    updateStates()
}

function changeTip(event){
    
    selectButtons.forEach(button => button.classList.remove('selected'))
    if(event.target.classList.contains('tipSelectionButton')){
    event.target.classList.add('selected')
    tip = event.target.innerHTML.replace('%','')
    console.log(tip)
    }else{
        tip = parseFloat(event.target.value)
        if(isNaN(tip)){
            tip = 0
        }
        event.target.value=tip
        console.log(tip)
    }
    updateStates()
}

function updateStates(){
    tipTot = (bill/people)*(tip/100)
    total = bill/people + tipTot
    if(!(isFinite(tipTot))){
        tipAmount.innerHTML = `0.00`
        tipTotal.innerHTML = `0.00`
    } else {
        tipAmount.innerHTML = `${displayAsDecimal(tipTot)}`
        tipTotal.innerHTML = `${displayAsDecimal(total)}`
    }

}

function displayAsDecimal(input){
    return (Math.round(input*100)/100).toFixed(2);
}

function resetForm(){
    billInput.value = "";
    customTip.value = "";
    peopleInput.value = "";
    document.querySelector(`#peopleError`).classList.add('hidden')
    document.querySelector(`#people`).setCustomValidity('')
    document.querySelector(`#billError`).classList.add('hidden')
    document.querySelector(`#bill`).setCustomValidity('')
    updateStates()
}