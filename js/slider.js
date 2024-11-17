let review=document.getElementsByClassName('review');

review[0].classList.add('active');
let slide=()=>{

    let button=document.getElementsByClassName('arrow');
    let count=0;


        button[0].addEventListener('click',()=>{
            if(count>0){
                review[count].classList.remove('active');
                review[count-1].classList.add('active');
                count--;
            }
            else if(count==0){
                review[count].classList.remove('active');
                review[review.length-1].classList.add('active');
                count=review.length-1;
            }
        });

    
        button[1].addEventListener('click',()=>{
            if(count<(review.length-1)){
                review[count].classList.remove('active');
                review[count+1].classList.add('active');
                count++;
            }
            else if(count==(review.length-1)){
                review[count].classList.remove('active');
                count=0;
                review[count].classList.add('active');
            }
        });
    
    
};

slide();
