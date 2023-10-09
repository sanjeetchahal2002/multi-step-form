let page = 1;
let planname = ""
let planCost = "";
let addOns = []
let isYearlyAdds = false
let selectedPlan

const mainHeading = document.getElementById('mainHeading')
const mainspan = document.getElementById('mainspan')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const step4 = document.getElementById('step4')
const nextButton = document.getElementById('next')
const prevButton = document.getElementById('prev')
const mainButtons = document.getElementsByClassName('main-buttons')[0]
const form = document.getElementsByTagName('form')[0]
const Name = document.getElementById('Name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')

// Step 1

function checkName() {
    let patternN = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/; 

    let errorTxt = document.querySelector(".NameError");
    if (!Name.value.match(patternN)) { 
        Name.style.border = '1px solid red';
        (Name.value != "") ? errorTxt.innerText = "Not valid" : errorTxt.innerText = "This field is required";
    }else{
        Name.style.border = '1px solid hsl(229, 24%, 87%)';
        errorTxt.innerText =""
        return true;
    }    
}

function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; 
    let errorTxt = document.querySelector(".Emailerror");
    if (!email.value.match(pattern)) {
        email.style.border = '1px solid red'; 
        (email.value != "") ? errorTxt.innerText = "Not valid" : errorTxt.innerText = "This field is required";
    }else{
        email.style.border = '1px solid hsl(229, 24%, 87%)';
        errorTxt.innerText =""
        return true;
    }    
}

function checkPhone() {
    let pattern = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    let errorTxt = document.querySelector(".PhoneError");
    if (!phone.value.match(pattern)) { 
        phone.style.border = '1px solid red'; 
        (phone.value != "") ? errorTxt.innerText = "Not valid" : errorTxt.innerText = "This field is required";
    }else{
        phone.style.border = '1px solid hsl(229, 24%, 87%)';
        errorTxt.innerText =""
        return true;
    }    
}

function validate(){
    checkName(); 
    checkEmail(); 
    checkPhone();
    return checkName() && checkEmail() && checkPhone() ;
}


// Step 2

function createCard(imgSrc,h3Content,number,isYearly){
    const div = document.createElement('div')
    const img = document.createElement('img')
    const divRight = document.createElement('div')
    const h3 = document.createElement('h3')
    const span = document.createElement('span')
    div.classList.add('main2-card')
    img.src = `${imgSrc}`;
    h3.textContent = `${h3Content}`
    span.innerText = `$${number}`
    span.classList.add('card-price')
    div.appendChild(img);
    divRight.appendChild(h3)
    divRight.appendChild(span)
    div.append(divRight)
    if(isYearly){
        isYearlyAdds = true;
        const spanY = document.createElement('span')
        spanY.classList.add('monthFree')
        spanY.innerText = '2 months free'
        divRight.appendChild(spanY)
    }
    isYearlyAdds = isYearly
    return div;
}

function changeHTML2(){
    
    step1.classList.remove('active')
    step2.classList.add('active')
    prevButton.classList.remove('visible')
    mainHeading.textContent = "Select your plan"
    mainspan.textContent = "You have the option of monthly or yearly billing"
    const div = document.createElement('div')
    div.innerHTML = ""
    div.appendChild(createCard('./assets/images/icon-arcade.svg','Arcade','9/mo',false))
    div.appendChild(createCard('./assets/images/icon-advanced.svg','Advanced','12/mo',false))
    div.appendChild(createCard('./assets/images/icon-pro.svg','Pro','15/mo',false))
    const div2 = document.createElement('div')
    div.classList.add('main2')

    const MonthSpan = document.createElement('span')
    const yearSpan = document.createElement('span')
    MonthSpan.textContent='Monthly'
    yearSpan.textContent='Yearly'
    div2.appendChild(MonthSpan)
    div2.innerHTML += " <label class='switch'><input type='checkbox'><span class='sliderButton'></span></label>"
    div2.appendChild(yearSpan)
    div2.classList.add('planMonthorYear')
    mainButtons.append(div)
    mainButtons.append(div2)
    
    addOns = []
    
    if(planname === ""){
        planname = "Arcade"
        planCost = 9
        selectedPlan = div.childNodes[0]; 
        div.childNodes[0].classList.add('active')  
    }
    
    div.addEventListener('click',(e)=>{
        div.childNodes.forEach((element)=>{
            element.classList.remove('active')
        })
        planname = ""
        planCost = ""
        selectedPlan = e.target
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
    document.getElementsByClassName('switch')[0].children[0].addEventListener('click',(e) =>{
        if(e.target.checked){
            div.innerHTML = ""
            div.appendChild(createCard('./assets/images/icon-arcade.svg','Arcade','90/yr',true))
            div.appendChild(createCard('./assets/images/icon-advanced.svg','Advanced','120/yr',true))
            div.appendChild(createCard('./assets/images/icon-pro.svg','Pro','150/yr',true))
        }else{
            div.appendChild(createCard('./assets/images/icon-arcade.svg','Arcade','9/mo',false))
            div.appendChild(createCard('./assets/images/icon-advanced.svg','Advanced','12/mo',false))
            div.appendChild(createCard('./assets/images/icon-pro.svg','Pro','15/mo',false))
        }
    })
}

// Step 3

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
    span.classList.add('AddOnsMessage')
    span2.innerText = `$${price}`
    span2.classList.add('AddOnsPrice')
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
    
    if(isYearlyAdds){
        div.innerHTML = ""
        div.appendChild(createAddOns('Online Service','Access to multiplayer games','10/yr'))
        div.appendChild(createAddOns('Larger storage','Extra 1 TB of cloud save','20/yr'))
        div.appendChild(createAddOns('Customizable Profile','Custom theme on your profile','20/yr'))
    }else{
        div.innerHTML = ""
        div.appendChild(createAddOns('Online Service','Access to multiplayer games','1/mo'))
        div.appendChild(createAddOns('Larger storage','Extra 1 TB of cloud save','2/mo'))
        div.appendChild(createAddOns('Customizable Profile','Custom theme on your profile','2/mo'))
    }
    
    div.addEventListener('click',(adds)=>{
        if(adds.target.checked){
            let addOnsName = adds.target.parentNode.childNodes[1].innerText
            let addOnsPrice = adds.target.parentNode.childNodes[2].innerText
            let yearChecker = addOnsPrice.split('/')[1]
            addOnsName = addOnsName.split('\n')[0]
            addOnsPrice = addOnsPrice.split('/')[0]
            const newAddOn = { addOnsName, addOnsPrice,yearChecker };
            if (!addOns.find(item => item.addOnsName === newAddOn.addOnsName && item.addOnsPrice === newAddOn.addOnsPrice && item.yearChecker === newAddOn.yearChecker)) {
                adds.target.parentNode.classList.add('Pickonsactive')
                addOns.push(newAddOn);
            }
        }else{
            adds.target.parentNode.classList.remove('Pickonsactive')
            addOns = addOns.filter((item) => {
                return item.addOnsName !== adds.target.parentNode.childNodes[1].innerText.split('\n')[0];
              });
        }
    })

    mainButtons.append(div)

}

// Step 4

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
    
    if(isYearlyAdds){
        if(planCost<90){
            planCost *=10;
        }
        h3.textContent = `${planname}(Yearly)`
    }else{
        h3.textContent = `${planname}(Monthly)`
    }
    
    totalCost +=planCost;
    if(isYearlyAdds){
        costh3.innerText = `$${planCost}/yr`
    }else{
        costh3.innerText = `$${planCost}/mo`
    }
    
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
        const main4 = document.getElementsByClassName('main4')[0]
        mainButtons.removeChild(main4)
        nextButton.textContent = "Next Step";
    })
    
    addOns.forEach((items) =>{
        if((items.yearChecker === 'yr' && isYearlyAdds) || (items.yearChecker === 'mo' && !isYearlyAdds)){
        const div = document.createElement('div')
        div.classList.add('summary-addons')
        const span = document.createElement('span')
        const spanP = document.createElement('span')
        spanP.classList = 'summary-addons-price'
        span.textContent = `${items.addOnsName}`
        let cost = Number(items.addOnsPrice.substring(1))
        if(cost > 10 && !isYearlyAdds){
            cost = cost/10
            console.log(cost)
        }
        totalCost += cost
        if(isYearlyAdds){
            spanP.textContent = `+${cost}/yr`
        }else{
            spanP.textContent = `+${cost}/mo`
        }
        div.appendChild(span)
        div.appendChild(spanP)
        card.appendChild(div)
    }
    })             
    
    const divTotal = document.createElement('div')
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    if(isYearlyAdds){
        span.textContent = 'Total(per year)'
        span2.textContent = `+$${totalCost}/yr`
    }else{
        span.textContent = 'Total(per month)'
        span2.textContent = `+$${totalCost}/mo`
    }
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
    
    nextButton.classList.add("ConfirmButtonHover")
    nextButton.textContent = "Confirm";
    
    div.appendChild(FinishingUp());
    mainButtons.append(div)
}

// Step 5

function changeHTML5(){
   
    const div = document.createElement('div')
    div.classList.add('thankuPage')
    const img = document.createElement('img')
    const h1 = document.createElement('h1')
    const span = document.createElement('span')
    const buttonsDiv = document.getElementsByClassName('main-next-button')[0]
    
    img.src = `./assets/images/icon-thank-you.svg`
    h1.textContent = 'Thank you!'
    span.textContent = 'Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.'
    
    mainButtons.innerHTML = ""
    mainspan.innerHTML = ""
    mainHeading.innerHTML = ""
    buttonsDiv.classList.add('hidden')
    
    div.appendChild(img)
    div.appendChild(h1)
    div.appendChild(span)
    mainButtons.appendChild(div)
}


nextButton.addEventListener('click',()=>{
    if(page === 1){
        if(validate()){
            page++;
            form.classList.add('hidden')
            changeHTML2() 
        }
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
        page++;
        changeHTML5()
    }
})

prevButton.addEventListener('click',() =>{
    if(page === 4){
        page--;
        changeHTML3()
        step4.classList.remove('active')
        step3.classList.add('active')
        nextButton.textContent = "Next Step"
        nextButton.classList.remove("ConfirmButtonHover")
    }else if(page === 3){
        page--;
        changeHTML2()
        const main3 =  document.getElementsByClassName('main3')[0]
        mainButtons.removeChild(main3)
        step3.classList.remove('active')
        step2.classList.add('active')
        nextButton.textContent = "Next Step"
    }else if(page === 2){
        step2.classList.remove('active')
        step1.classList.add('active')
        page--;
        mainHeading.textContent = "Personal info"
        mainspan.textContent = "Please provide your name,email address, and phone number"
        const main2 =  document.getElementsByClassName('main2')[0]
        const main2Buttons = document.getElementsByClassName('planMonthorYear')[0]
        mainButtons.removeChild(main2)
        mainButtons.removeChild(main2Buttons)
        prevButton.classList.add('visible')
        mainButtons.appendChild(form)
        form.classList.remove('hidden')
        nextButton.textContent = "Next Step"
    }
})