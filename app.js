let page = 1;
let planname = ""
let planCost = "";
let addOns = []
console.log(page)
const mainHeading = document.getElementById('mainHeading')
const mainspan = document.getElementById('mainspan')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const step4 = document.getElementById('step4')
const nextButton = document.getElementById('next')
const mainButtons = document.getElementsByClassName('main-buttons')[0]

function createCard(imgSrc,h3Content,number){
    const div = document.createElement('div')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const span = document.createElement('span')
    div.classList.add('main2-card')
    img.src = `${imgSrc}`;
    h3.textContent = `${h3Content}`
    span.innerText = `$${number}/mo`
    div.appendChild(img);
    div.appendChild(h3)
    div.appendChild(span)
    return div;
}

function changeHTML2(){
    step1.classList.remove('active')
    step2.classList.add('active')
    mainHeading.textContent = "Select your plan"
    mainspan.textContent = "Select your plan You have the option of monthly or yearly billing"
    mainButtons.innerHTML = ""
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    div.classList.add('main2')

    div.appendChild(createCard('./assets/images/icon-arcade.svg','Arcade','9'))
    div.appendChild(createCard('./assets/images/icon-advanced.svg','Advanced','12'))
    div.appendChild(createCard('./assets/images/icon-pro.svg','Pro','15'))
    div2.innerHTML = "Monthly <button type='radio'>B</button>yearly"
    mainButtons.append(div)
    mainButtons.append(div2)
    div.addEventListener('click',(e)=>{
        div.childNodes.forEach((element)=>{
            element.classList.remove('active')
        })
        planname = ""
        planCost = ""
        e.target.classList.add('active')
        let content = e.target.textContent;
        let dollarTrue = false;
        for(let i=0;i<content.length;i++){
            if(content[i] === '/'){
                break;
            }else if(content[i] === '$'){
                dollarTrue = true
            }else if(!dollarTrue){
                planname+=content[i]
            }else{
                planCost +=content[i]
            }
        }
        planCost = Number(planCost)
    })
}


function createAddOns(service,message,price){
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    const input = document.createElement('input');
    const h3 = document.createElement('h3')
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    div.classList.add('main3-card')
    input.type = 'checkbox'
    h3.textContent = `${service}`
    span.innerText = `${message}`
    span2.innerText = `$${price}/mo`
    div2.append(h3)
    div2.append(span)
    div.appendChild(input);
    div.appendChild(div2)
    div.appendChild(span2)
    return div;
}


function changeHTML3(){
    step2.classList.remove('active')
    step3.classList.add('active')
    mainHeading.textContent = "Pick Add-ons"
    mainspan.textContent = "Add-ons help enhance your gaming experience."
    mainButtons.innerHTML = ""
    const div = document.createElement('div')
    div.classList.add('main3')
    div.appendChild(createAddOns('Online Service','Access to multiplayer games','1'))
    div.appendChild(createAddOns('Larger storage','Extra 1 TB of cloud save','2'))
    div.appendChild(createAddOns('Customizable Profile','Custom theme on your profile','2'))

    div.addEventListener('click',(adds)=>{
        if(adds.target.checked){
            let addOnsName = adds.target.parentNode.childNodes[1].innerText
            let addOnsPrice = adds.target.parentNode.childNodes[2].innerText
            addOnsName = addOnsName.split('\n')[0]
            addOnsPrice = addOnsPrice.split('/')[0]
            adds.target.parentNode.classList.add('active')
            addOns.push({addOnsName,addOnsPrice})
        }else{
            adds.target.parentNode.classList.remove('active')
            addOns = addOns.filter((item) => {
                return item.addOnsName !== adds.target.parentNode.childNodes[1].innerText.split('\n')[0];
              });
        }
        console.log(addOns)
    })

    mainButtons.append(div)

}

function FinishingUp(){
    let totalCost = 0;
    const card = document.createElement('div') 
    const div = document.createElement('div')
    const divPlan = document.createElement('div')
    const button = document.createElement('button')
    const h3 = document.createElement('h3')
    const costh3 = document.createElement('h3')
    card.classList.add('main4-card')
    button.innerText = 'Change'
    button.classList.add('change-button')
    button.id = 'change'
    h3.textContent = `${planname}(Monthly)`
    totalCost +=planCost;
    costh3.innerText = `$${planCost}/mo`
    divPlan.classList.add('finishingUp-Plan')
    div.appendChild(h3)
    div.appendChild(button)
    divPlan.appendChild(div)
    divPlan.appendChild(costh3)
    card.appendChild(divPlan)
    button.addEventListener('click',()=>{
        step4.classList.remove('active')
        page = 2
        changeHTML2()
        nextButton.textContent = "Next Step";
    })
    addOns.forEach((items) =>{
        const div = document.createElement('div')
        div.classList.add('summary-addons')
        const span = document.createElement('span')
        const spanP = document.createElement('span')
        span.textContent = `${items.addOnsName}`
        totalCost += Number(items.addOnsPrice.substring(1))
        spanP.textContent = `+${items.addOnsPrice}/mo`
        div.appendChild(span)
        div.appendChild(spanP)
        card.appendChild(div)
    })
    const divTotal = document.createElement('div')
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    span.textContent = 'Total(per month)'
    span2.textContent = `+$${totalCost}/mo`
    span2.classList.add('totalCost')
    divTotal.classList.add('finishingUpTotal')
    divTotal.appendChild(span)
    divTotal.appendChild(span2)
    card.appendChild(divTotal)
    return card;
}


function changeHTML4(){
    step3.classList.remove('active')
    step4.classList.add('active')
    mainHeading.textContent = "Finishing up"
    mainspan.textContent = "Double-check everthing looks OK before confirming."
    mainButtons.innerHTML = ""
    const div = document.createElement('div')
    div.classList.add('main4')
    div.appendChild(FinishingUp());
    nextButton.textContent = "Confirm";
    mainButtons.append(div)
}

function changeHTML5(){
    const div = document.createElement('div')
    div.classList.add('thankuPage')
    const img = document.createElement('img')
    const h1 = document.createElement('h1')
    const span = document.createElement('span')
    img.src = `./assets/images/icon-thank-you.svg`
    h1.textContent = 'Thank you!'
    span.textContent = 'Thank you! Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.'
    document.getElementsByClassName('main-container')[0].innerHTML = ""
    div.appendChild(img)
    div.appendChild(h1)
    div.appendChild(span)
    document.getElementsByClassName('main-container')[0].appendChild(div)
}


nextButton.addEventListener('click',()=>{
    if(page === 1){
        page++;
       changeHTML2() 
    }
    else if(page === 2){
        page++;
        changeHTML3()
    }
    else if(page === 3){
        page++;
        changeHTML4()
    }
    else if(page === 4){
        changeHTML5()
    }
})

