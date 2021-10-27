class slider{
    slidIndex = 1;
    autoIntervalID;
    sliderList;
    dots;
    auto;
    data;


    constructor(data){
        this.data = data;
        this.intialVerify()
        
        this.nextAndPrevBtns()
        this.createdDots()

        this.showSlides(1);
        this.setAutoInterval();
    }

    intialVerify(){
        let{element , classNameSlider , auto} = this.data;
        if(!element)throw Error("slider element is not exists");
        Number.isInteger(auto)? this.auto = auto : this.auto = 0;

        this.sliderList = [...element.children].filter(slid => slid.classList.contains(classNameSlider));
    }

    nextAndPrevBtns(){
        let{element} = this.data;

        element.insertAdjacentHTML("beforeend" , `
            <a class="next">&#10095;</a>
            <a class="prev">&#10094;</a>
        `);

        element.querySelector(".next").addEventListener("click" , () => this.nextAndPrevSlide(this.slidIndex += 1))
        element.querySelector(".prev").addEventListener("click" , () => this.nextAndPrevSlide(this.slidIndex -= 1))
    }

    createdDots(){
        let{element} = this.data;

        let listDots = [...this.sliderList].map((slid , index) => `<span class="dot" data-slider="${index+1}"></span>`);
        let dotContainer = document.createElement("div")

        dotContainer.classList.add("dots");
        dotContainer.innerHTML = `${listDots.join("")}`
        element.after(dotContainer);

        this.dots = document.querySelectorAll(".dot");
        this.dots.forEach(dot => dot.addEventListener("click" , (e)=> this.currentSlide(parseInt(e.target.dataset.slider))))
    }

    showSlides(n){
        let{element , classNameSlider} = this.data
        if( n > this.sliderList.length ) this.slidIndex = 1;
        if( n < 1 ) this.slidIndex = this.sliderList.length;

        element.querySelector(`.${classNameSlider}.active`).classList.remove("active");
        this.dots.forEach(dot => dot.classList.remove("active"));

        this.sliderList[this.slidIndex - 1].classList.add("active");
        this.dots[this.slidIndex - 1].classList.add("active");
    }

    setAutoInterval(){
        if(this.auto != 0){
            this.autoIntervalID = setInterval( ()=> this.showSlides(this.slidIndex +=1) , this.auto)
        }
    }

    resetAutoInterval(){
        clearInterval(this.autoIntervalID);
        this.setAutoInterval();
    }













    currentSlide = function(n){
        this.resetAutoInterval();
        this.showSlides(this.slidIndex = n)
    }

    nextAndPrevSlide = function(n){
        this.resetAutoInterval();
        this.showSlides(n)
    }

}